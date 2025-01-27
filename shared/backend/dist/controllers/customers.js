import prisma from "../prisma.js";
import { uploadImageToS3 } from "../utils/uploadPfp.js";
import path from "path";
import { customerProfilePicKey, AWSBucket } from "../utils/uploadPfp.js";
export const getCustomers = async (req, res, next) => {
    const customers = await prisma.customer.findMany();
    res.status(200).json({ customers });
};
export const getCustomerById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!id || Number(isNaN(id))) {
        res.status(400).json({ error: "request params missing ID" });
        return;
    }
    const customer = await prisma.customer.findUnique({
        where: { id },
        include: { address: true, pfp: true },
    });
    if (!customer) {
        res.status(404).json({ error: "customer not found" });
        return;
    }
    res.status(200).json({ customer });
};
export const getLoggedInCustomer = async (req, res, next) => {
    if (req.user.role !== "CUSTOMER") {
        res.status(401).json({ error: "you must be a CUSTOMER to do this" });
        return;
    }
    const id = req.user.id;
    const customer = await prisma.customer.findUnique({
        where: { id },
        include: {
            address: { omit: { customerId: true, id: true, createdAt: true } },
            pfp: { omit: { customerId: true, id: true, createdAt: true } },
        },
    });
    if (!customer) {
        res.status(404).json({ error: `customer with ID ${id} not found` });
        return;
    }
    res.status(200).json({ customer });
};
export const updateLoggedInCustomer = async (req, res, next) => {
    if (req.user.role !== "CUSTOMER") {
        res.status(401).json({ error: "you must be a CUSTOMER to do this" });
        return;
    }
    const { address, ...data } = req.body;
    const id = req.user.id;
    const updatedCustomer = await prisma.customer.update({
        where: { id },
        data: {
            address: {
                connectOrCreate: {
                    where: { customerId: id },
                    create: { ...address },
                },
            },
            ...data,
        },
        include: { address: true },
    });
    if (!updatedCustomer) {
        res.status(400).json({ error: "ID does not exist" });
        return;
    }
    res.status(200).json({ updatedCustomer });
};
export const createLoggedInCustomerPfp = async (req, res, next) => {
    if (req.user.role !== "CUSTOMER") {
        res.status(401).json({ error: "you must be a CUSTOMER to do this" });
        return;
    }
    const pfp = req.body.pfp;
    if (!pfp) {
        res.status(400).json({ error: "file URI is required" });
        return;
    }
    const id = req.user.id;
    const extension = path.extname(pfp);
    const imagePath = `${customerProfilePicKey}/customerpfp${id}${extension}`;
    const S3Response = await uploadImageToS3(pfp, AWSBucket, imagePath);
    if (typeof S3Response !== "string") {
        res.status(400).json({ error: "failed to upload pfp to S3" });
        return;
    }
    const customer = await prisma.customer.update({
        where: { id },
        data: {
            pfp: {
                connectOrCreate: {
                    where: { customerId: id },
                    create: { url: S3Response },
                },
            },
        },
        include: {
            pfp: {
                omit: { id: true, customerId: true, createdAt: true, updatedAt: true },
            },
        },
    });
    if (!customer) {
        res.status(404).json({ error: "customer not found" });
        return;
    }
    res.status(200).json({ customer });
};
export const deleteLoggedInCustomer = async (req, res, next) => {
    if (req.user.role !== "CUSTOMER") {
        res.status(401).json({ error: "you must be a CUSTOMER to do this" });
        return;
    }
    const id = req.user.id;
    const response = await prisma.customer.delete({ where: { id } });
    res.status(200).json({ message: "customer deleted succesfully" });
};

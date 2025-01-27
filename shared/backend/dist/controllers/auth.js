import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "dotenv";
import prisma from "../prisma.js";
env.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const customerRegister = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const customer = await prisma.customer.create({
        data: {
            ...req.body,
            password: { create: { hash: hash } },
        },
    });
    const token = jwt.sign({
        role: "CUSTOMER",
        id: customer.id,
        email: customer.email,
    }, JWT_SECRET, {
        expiresIn: "12h",
    });
    res.status(200).json({ token });
};
export const businessRegister = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const business = await prisma.business.create({
        data: {
            ...req.body,
            password: { create: { hash: hash } },
        },
    });
    const token = jwt.sign({
        role: "BUSINESS",
        id: business.id,
        email: business.email,
    }, JWT_SECRET, {
        expiresIn: "12h",
    });
    res.status(200).json({ token });
};
export const customerLogin = async (req, res) => {
    const customerDb = await prisma.customer.findUnique({
        where: { email: req.body.email },
        include: { password: true },
    });
    if (!customerDb || !customerDb.password) {
        res.status(404).json({ error: "Email is not registered" });
        return;
    }
    const passwordDb = customerDb.password.hash;
    const validPassword = await bcrypt.compare(req.body.password, passwordDb);
    if (!validPassword) {
        res.status(401).json({ error: "Invalid password" });
        return;
    }
    const token = jwt.sign({
        role: "CUSTOMER",
        id: customerDb.id,
        email: customerDb.email,
    }, JWT_SECRET, {
        expiresIn: "12h",
    });
    res.status(200).json({ token });
};
export const businessLogin = async (req, res) => {
    const businessDb = await prisma.business.findUnique({
        where: { email: req.body.email },
        include: { password: true },
    });
    if (!businessDb || !businessDb.password) {
        res.status(404).json({ error: "Email is not registered" });
        return;
    }
    const passwordDb = businessDb.password.hash;
    const validPassword = await bcrypt.compare(req.body.password, passwordDb);
    if (!validPassword) {
        res.status(401).json({ error: "Invalid password" });
        return;
    }
    const token = jwt.sign({
        role: "BUSINESS",
        id: businessDb.id,
        email: businessDb.email,
    }, JWT_SECRET, {
        expiresIn: "12h",
    });
    res.status(200).json({ token });
};
export const validateCustomerJWT = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "You need to provide a JWT" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const decodedJwt = jwt.verify(token, JWT_SECRET);
    const jwtData = JSON.parse(JSON.stringify(decodedJwt));
    if (jwtData.role === "CUSTOMER") {
        res.status(200).json({ error: "authorized" });
        return;
    }
    if (jwtData.role === "BUSINESS") {
        res.status(401).json({ error: "not a customer" });
        return;
    }
    res.status(401).json({ error: "unauthorized" });
};
export const validateBusinessJWT = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "You need to provide a JWT" });
        return;
    }
    const token = authHeader.split(" ")[1];
    const decodedJwt = jwt.verify(token, JWT_SECRET);
    const jwtData = JSON.parse(JSON.stringify(decodedJwt));
    if (jwtData.role === "BUSINESS") {
        res.status(200).json({ error: "authorized" });
        return;
    }
    if (jwtData.role === "CUSTOMER") {
        res.status(401).json({ error: "not a business" });
        return;
    }
    res.status(401).json({ error: "unauthorized" });
};

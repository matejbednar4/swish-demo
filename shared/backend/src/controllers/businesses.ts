import { RequestHandler } from "express";
import prisma from "../prisma.js";
import { Business, BusinessType } from "@prisma/client";

export const getBusinesses: RequestHandler = async (req, res, next) => {
  const businesses = await prisma.business.findMany();

  res.status(200).json({ businesses });
};

export const getBusinessTypes: RequestHandler = async (req, res, next) => {
  const businessTypesArr = Object.values(BusinessType);

  res.status(200).json({ businessTypes: businessTypesArr });
};

export const getBusinessById: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (!id || Number(isNaN(id))) {
    res.status(400).json({ error: "request params missing ID" });
    return;
  }

  const business = await prisma.business.findUnique({
    where: { id },
    include: { address: true, pfp: true, headerPic: true },
  });

  if (!business) {
    res.status(404).json({ error: "business not found" });
    return;
  }

  res.status(200).json({ business });
};

export const getRandomBusinesses: RequestHandler = async (req, res, next) => {
  const { amount, type } = req.query;

  if (!amount || !type) {
    res.status(400).json({ error: "missing query values" });
    return;
  }

  if (typeof amount !== "string") {
    return;
  }

  const amountInt = Number(parseInt(amount));

  let randomBusinesses: Business[];
  if (type === "ANY") {
    randomBusinesses = await prisma.$queryRaw`
        SELECT * FROM businesses
        ORDER BY RANDOM()
        LIMIT ${amountInt}`;
  } else {
    randomBusinesses = await prisma.$queryRaw`
    SELECT * FROM businesses
    WHERE type = ${type}::"BusinessType"
    ORDER BY RANDOM()
    LIMIT ${amountInt}`;
  }

  if (randomBusinesses.length === 0) {
    res.status(404).json({ error: "No business found with given type" });
    return;
  }

  res.status(200).json({ randomBusinesses });
};

export const getLoggedInBusiness: RequestHandler = async (req, res, next) => {
  if (req.user.role !== "BUSINESS") {
    res.status(401).json({ error: "you must be a BUSINESS to do this" });
    return;
  }

  const id = req.user.id;
  const business = await prisma.business.findUnique({
    where: { id },
    include: {
      address: { omit: { businessId: true, id: true, createdAt: true } },
      pfp: { omit: { businessId: true, id: true, createdAt: true } },
      headerPic: { omit: { businessId: true, id: true, createdAt: true } },
    },
  });

  if (!business) {
    res.status(404).json({ error: `business with ID ${id} not found` });
    return;
  }

  res.status(200).json({ business });
};

export const updateLoggedInBusiness: RequestHandler = async (
  req,
  res,
  next
) => {
  if (req.user.role !== "BUSINESS") {
    res.status(401).json({ error: "you must be a BUSINESS to do this" });
    return;
  }

  const { address, ...data } = req.body;

  const id = req.user.id;
  const updatedBusiness = await prisma.business.update({
    where: { id },
    data: { address: { update: { ...address } }, ...data },
    include: { address: true },
  });

  if (!updatedBusiness) {
    res.status(400).json({ error: `business with ID ${id} not found` });
    return;
  }

  res.status(200).json({ updatedBusiness });
};

export const deleteLoggedInBusiness: RequestHandler = async (
  req,
  res,
  next
) => {
  if (req.user.role !== "BUSINESS") {
    res.status(401).json({ error: "you must be a BUSINESS to do this" });
    return;
  }

  const id = req.user.id;
  const response = await prisma.business.delete({ where: { id } });

  res.status(200).json({ error: "business deleted succesfully" });
};

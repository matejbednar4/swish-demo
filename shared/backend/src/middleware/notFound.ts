import { RequestHandler } from "express";

const notFound: RequestHandler = async (req, res, next) => {
  res.status(404).json({ error: "Route not found, check your request URL" });
};

export default notFound;

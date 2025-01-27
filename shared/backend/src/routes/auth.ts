import { Router } from "express";
import * as authController from "../controllers/auth.js";
import * as validation from "../middleware/validation.js";

const router = Router();

router.post(
  "/register/customer",
  validation.registerCustomer,
  authController.customerRegister
);
router.post(
  "/register/business",
  validation.registerBusiness,
  authController.businessRegister
);
router.post(
  "/login/customer",
  validation.loginCustomer,
  authController.customerLogin
);
router.post(
  "/login/business",
  validation.loginBusiness,
  authController.businessLogin
);
router.post("/validation/customer", authController.validateCustomerJWT);
router.post("/validation/business", authController.validateBusinessJWT);

export default router;

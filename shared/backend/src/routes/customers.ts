import { Router } from "express";
import * as customersController from "../controllers/customers.js";
import * as validation from "../middleware/validation.js";

const router = Router();

router.get("/", customersController.getCustomers);

router.get("/self", customersController.getLoggedInCustomer);
router.put(
  "/self",
  validation.updateLoggedInCustomer,
  customersController.updateLoggedInCustomer
);
router.put("/self/pfp", customersController.createLoggedInCustomerPfp);
router.delete("/self", customersController.deleteLoggedInCustomer);

router.get("/:id", customersController.getCustomerById);

export default router;

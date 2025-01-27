import { Router } from "express";
import * as businessesController from "../controllers/businesses.js";
import * as validation from "../middleware/validation.js";

const router = Router();

router.get("/", businessesController.getBusinesses);
router.get('/types', businessesController.getBusinessTypes)
router.get(
  "/random",
  validation.getRandomBusinesses,
  businessesController.getRandomBusinesses
);

router.get("/self", businessesController.getLoggedInBusiness);
router.put(
  "/self",
  validation.updateLoggedInBusiness,
  businessesController.updateLoggedInBusiness
);
router.delete("/self", businessesController.deleteLoggedInBusiness);

router.get("/:id", businessesController.getBusinessById);

export default router;

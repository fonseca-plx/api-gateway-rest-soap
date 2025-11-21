import { Router } from "express";
import { AccountController } from "../controllers/accountController";

const router = Router();

router.post("/", AccountController.create);
router.get("/", AccountController.getAll);
router.get("/:id", AccountController.getById);
router.put("/:id", AccountController.update);
router.delete("/:id", AccountController.delete);
router.post("/:id/deposit", AccountController.deposit);

export default router;

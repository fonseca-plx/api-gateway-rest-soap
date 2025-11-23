import { Router } from "express";
import GatewayController from "../controllers/gatewayController";

const router = Router();

/**
 * Accounts (proxied to rest-api)
 */
router.post("/accounts", GatewayController.createAccount);
router.get("/accounts", GatewayController.getAccounts);
router.get("/accounts/:id", GatewayController.getAccountById);
router.put("/accounts/:id", GatewayController.updateAccount);
router.delete("/accounts/:id", GatewayController.deleteAccount);
router.post("/accounts/:id/deposit", GatewayController.deposit);

/**
 * Files (SOAP)
 */
router.post("/files", GatewayController.uploadFile);
router.get("/files/:id", GatewayController.getFileInfo);

export default router;

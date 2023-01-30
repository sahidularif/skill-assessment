const express = require("express");
const authHandler = require("../handler/auth.handler");
const serviceHandler = require("../handler/service.handler");
const router = express.Router();
// Auth Routes
router.get("/", authHandler.defaultRoot)
router.post("/registration", authHandler.register)
router.post("/login", authHandler.login)
router.post("/add-billing", serviceHandler.addBill)
router.get("/billing-list", serviceHandler.getAllBill)
router.put("/update-billing/:id", serviceHandler.updateBilling)
router.delete("/delete-billing/:id", serviceHandler.deleteBilling)


module.exports = {
    routes: router,
}
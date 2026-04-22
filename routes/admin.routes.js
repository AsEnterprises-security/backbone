import express from "express";
import { adminlogin, getAllImageAdmin, getDashboard } from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";


const adminRouter= express.Router();

adminRouter.post("/login",adminlogin)
adminRouter.get("/images", auth , getAllImageAdmin)
adminRouter.get("/dashboard", auth , getDashboard)


export default adminRouter;
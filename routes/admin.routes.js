import express from "express";
import { adminlogin } from "../controllers/admin.controller.js";


const adminRouter= express.Router();

adminRouter.post("/login",adminlogin)


export default adminRouter;
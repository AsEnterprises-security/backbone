import express from "express";
import { addImage, deleteImageById, getAllImages, getImageById, togglePublish } from "../controllers/gallary.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";


const imageRouter = express.Router();

imageRouter.post("/add", upload.single("image"),auth, addImage)
imageRouter.get("/all",getAllImages)
imageRouter.get("/:id",getImageById)
imageRouter.post("/delete",auth,deleteImageById)
imageRouter.post("/toggle-publish",auth,togglePublish)

export default imageRouter;
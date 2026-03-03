import fs from "fs";
import imagekit from "../config/imageKit.js";
import Gallary from "../models/gallary.model.js";
import { tracingChannel } from "diagnostics_channel";

export const addImage = async (req, res) => {
  try {
    const { title, description, category, isPublished } = JSON.parse(
      req.body.gallary,
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/images",
    });

  // optimize image using ImageKit transformations
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { height:'300',width:'400' },
      ],
    });

    const image = optimizedImageUrl;

    await Gallary.create({
      title,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Image added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getAllImages = async (req, res) => {
  try {
    const images = await Gallary.find({ isPublished: true });

    res.json({ success: true, images });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getImageById =  async (req,res)=>{
  try {
    const {id} = req.params
    const image = await Gallary.findById(id)
    if(!image){
      return res.json({success:false,message:"Image Not Found"})
    }
    res.json({success:true,image})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
};

export const deleteImageById =  async (req,res)=>{
  try {
    const {id} = req.body
    await Gallary.findByIdAndDelete(id)

    res.json({success:true,message:"Image Deleted Successfully"})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
};

export const togglePublish = async(req,res)=>{
    try {
        const {id}  = req.body
        const image = await Gallary.findById(id)

        image.isPublished = !image.isPublished
        await image.save()
        res.json({ success: true, message:"Image status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

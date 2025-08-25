import { ServiceModel } from "../models/service.model.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/response-Handling.js";
// ➕ إضافة خدمة جديدة POST ✅
export const creatSrvice =
  asyncHandling(async (req, res) => {
    const {title , description} = req.body;
    const existitle = await ServiceModel.findOne({title})
    if (existitle){  res.status(409).json({ message:"This a Service title already exists" }); } else{

      const service = await ServiceModel.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json(service);
    }

  })
;

// 📃 Get Srvices List
export const getAllServices = asyncHandling(async (req, res) => {
  const { limit } = req.query;

  const services = await ServiceModel.find()
    .select("title image")
    .sort({ date: -1 })
    .limit(Number(limit) || 0);

  if (services.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Services found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Services list fetched",
    data: services,
  });
});

// 📖 Get Service Details
export const getServiceDetails = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const service = await ServiceModel.findById(id);
  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Service details fetched",
    data: service,
  });
});


// ✏️ تعديل خدمة PUT ✅
export const updateService=
  asyncHandling(async (req, res) => {
    const updated = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    
    if (!updated) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(updated);
  })
;


// ❌ حذف خدمة ✅
export const deleteSrvice=
  asyncHandling(async (req, res) => {
    const deleted = await ServiceModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error("Service not found");
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: "Service deleted" });
  })
;
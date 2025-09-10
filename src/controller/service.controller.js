import { ServiceModel } from "../models/service.model.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/response-Handling.js";
import { translate } from "../utils/translate.js"; // 👈 لو عايزة ترجمة

// ➕ إضافة خدمة جديدة POST ✅
export const createService = asyncHandling(async (req, res) => {
  const { title, description } = req.body;

  // تحقق من العنوان
  const existTitle = await ServiceModel.findOne({ title });
  if (existTitle) {
    return res.status(409).json({
      success: false,
      message: "This service title already exists",
    });
  }

  // تحقق من الصورة
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  const service = await ServiceModel.create({
    title,
    description,
    image: imageUrl,
  });

  return sucssesResponse({
    res,
    message: "✅ Service created successfully",
    data: service,
    status: 201,
  });
});

// 📃 Get Services List
export const getAllServices = asyncHandling(async (req, res) => {
  const lang =
    req.headers["accept-language"]?.toLowerCase().startsWith("ar")
      ? "ar"
      : "en";

  const services = await ServiceModel.find()
    .sort({ date: -1 })
    .lean();

  if (!services || services.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No services found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅get all Services ",
    data: translate(services, lang), // 👈 الترجمة هنا
  });
});

// 📖 Get Service Details
export const getServiceDetails = asyncHandling(async (req, res) => {
  const { id } = req.params;
  const lang =
    req.headers["accept-language"]?.toLowerCase().startsWith("ar")
      ? "ar"
      : "en";

  const service = await ServiceModel.findById(id).lean();

  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Service details fetched",
    data: translate(service, lang), // 👈 الترجمة هنا
  });
});


// ✏️ تعديل خدمة PUT ✅
export const updateService = asyncHandling(async (req, res) => {
  const { title, description } = req.body;

  const updated = await ServiceModel.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true, lean: true }
  );

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Service updated successfully",
    data: updated,
  });
});



// ❌ حذف خدمة ✅
export const deleteService = asyncHandling(async (req, res) => {
  const deleted = await ServiceModel.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }

  return sucssesResponse({
    res,
    message: "✅ Service deleted successfully",
    data: deleted,
  });
});
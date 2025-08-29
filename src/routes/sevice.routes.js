import express from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js" ;
import{ createService , 
        updateService ,
        deleteService ,
        getAllServices,
        getServiceDetails} from "../controller/service.controller.js"
        import  {upload} from "./upload.routes.js"

const router = express.Router();

// ➕ إضافة خدمة جديدة
router.post("/",  upload.single("image") ,verifyTokenAdmin, createService );

// 📋 عرض كل الخدمات للكل
router.get("/", getAllServices   );

// 📋 عرض كل تفاصيل الخدمه
router.get("/:id", getServiceDetails   );
// ✏️ تعديل خدمة
router.put( "/:id",   upload.single("image") ,verifyTokenAdmin ,updateService );

// ❌ حذف خدمة
router.delete("/:id", verifyTokenAdmin, deleteService );

export default router;


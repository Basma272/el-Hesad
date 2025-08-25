import express from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js" ;
import{ creatSrvice , 
        updateService ,
        deleteSrvice ,
        getAllServices,
        getServiceDetails} from "../controller/service.controller.js"

const router = express.Router();

// ➕ إضافة خدمة جديدة
router.post("/", verifyTokenAdmin, creatSrvice );

// 📋 عرض كل الخدمات للكل
router.get("/", getAllServices   );

// 📋 عرض كل تفاصيل الخدمه
router.get("/:id ", getServiceDetails   );
// ✏️ تعديل خدمة
router.put( "/:id", verifyTokenAdmin ,updateService );

// ❌ حذف خدمة
router.delete("/:id", verifyTokenAdmin, deleteSrvice );

export default router;


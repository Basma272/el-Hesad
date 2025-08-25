import express from "express"
import { create , getallqustion , updatequstion , deletequstion} from "../controller/questions.controller.js"
import { verifyTokenAdmin } from "../middleware/authJwt.js"
const router = express.Router()

router.post("/" , verifyTokenAdmin , create)  
router.get("/" , getallqustion) 
router.post("/:id" , verifyTokenAdmin , updatequstion)
router.delete("/:id" , verifyTokenAdmin , deletequstion)

export default router
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";
import servicesRoutes from "./src/routes/sevice.routes.js"
import authRoutes from "./src/routes/auth.routes.js";
import roiRoutes from "./src/routes/roi.routes.js"
import articlesRoutes from "./src/routes/articles.routes.js"
import projecsRoutes from "./src/routes/procject.routes.js"
import questionsRoutes from "./src/routes/question.routes.js"
import teamRoutes from "./src/routes/team.routes.js" 
import  feedbackRoutes  from "./src/routes/feedback.routes.js"
import contactRoutes from "./src/routes/contact.routes.js"
import uploadRoutes from "./src/routes/upload.routes.js"
import { GlobalErrorHandler } from "./src/utils/error-Handling.js";

dotenv.config();
ConnectDB();

const app = express(); 
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000/",        // وقت التطوير
  "http://el-hasad.com/",          // دومين الفرونت
  "https://el-hasad.com/",         // لو عندك نسخة https
  "http://api.el-hasad.com/",      // دومين الباك إند
  "https://api.el-hasad.com/" ,     // نسخة https برضه
  "https://el-hesad-production.up.railway.app/",
  "http://el-hesad-production.up.railway.app/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"]
}));
app.use("/uploads",express.static("uploads"));

// //  API Routes 
app.use("/api/auth", authRoutes);
app.use("/api/roicalculator", roiRoutes); 
app.use("/api/services", servicesRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/projects", projecsRoutes );
app.use("/api/team", teamRoutes );
app.use("/api/questions", questionsRoutes );
app.use("/api/feedback", feedbackRoutes );
app.use("/api/contact", contactRoutes );
app.use("/api/uploads", uploadRoutes );



//  Test Route
app.get("/", (req, res) => {
  res.send(" Welcome to Rabbit website-elhasad");
});

//Global Error Handler
app.use(GlobalErrorHandler);

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
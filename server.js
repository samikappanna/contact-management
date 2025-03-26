import express from "express";
import dotenv from "dotenv";    
import router from "./routes/contactRoutes.js";
import userRouter from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectDB } from "./config/db..js";
dotenv.config();
const app = express();

const port= process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts",router);
app.use("/api/users",userRouter);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
})
import express from "express";
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("api is working");
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/profiles", userProfileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

export default app;
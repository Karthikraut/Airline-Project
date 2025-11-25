import express from "express"
import connectDB from "./utils/db.js";
import apiRoutes from "./routes/routes.js"
import dotenv from "dotenv"
dotenv.config();

const app  = express();

const PORT= process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server Running at Port: ", PORT); // Log a message when the server starts successfully
});
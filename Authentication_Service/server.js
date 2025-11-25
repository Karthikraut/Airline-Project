import express from "express"
import connectDB from "./utils/db";

const app  = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
    connectDB();
    console.log("Server Running at Port: ", PORT); // Log a message when the server starts successfully
});
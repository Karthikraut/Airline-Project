import express from "express"
import v1Routes from "./v1/index.js"
const router = express.Router();
router.use("/v1", v1Routes); // if u got /v1 after /api then u are going to redirect them to v1Routes. |  Link : http://localhost:3000/api/v1


export default router;
import express from "express";
import {
  handleGenerateNewShortURL,
  redirectUrlToActual,
  handleGetAnalytics,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", redirectUrlToActual);
router.get("/anylytics/:shortId", handleGetAnalytics);

export default router;

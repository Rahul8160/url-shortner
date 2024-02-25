import { nanoid } from "nanoid";
import urlModel from "../models/url.js";

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: `url is required` });
  const shortId = nanoid(7);
  await urlModel.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function redirectUrlToActual(req, res) {
  const shortId = req.params.shortId;
  const entry = await urlModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    // Handle the case when no entry is found with the given shortId
    res.status(404).send("Not Found");
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await urlModel.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

export { handleGenerateNewShortURL, redirectUrlToActual, handleGetAnalytics };

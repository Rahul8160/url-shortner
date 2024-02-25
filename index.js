import express from "express";
import connectToMongoDB from "./connect.js";
import urlRoute from "./routes/url.js";
import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const app = express();

connectToMongoDB(apiKey).then(() => console.log(`MongoDB Connected`));

app.use(express.json());
app.use("/url", urlRoute);

app.listen(port, () => console.log(`Server is Running on ${port}`));

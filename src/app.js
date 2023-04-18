import express from "express";
import morgan from "morgan";
import zencon from "./routes/zencon.js";
import hookRoutes from "./routes/webhook.js";
import cors from "cors";
import rateLimit from 'express-rate-limit'
import authentication from "./middlewares/authentication.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//rate limit 
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// middleware
app.use(morgan("dev"));
//routes
app.use(authentication)
app.use("/api/v1/webhook",hookRoutes);
app.use(limiter)
app.use("/api/v1/zencon",zencon);

export default app;
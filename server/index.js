import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectdb } from "./db.js";
import courseRoute from "./route.js/course_route.js";
import courseRouteRegister from "./route.js/user_route.js";
import cors from "cors";

dotenv.config({});

// call database connection here
connectdb();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Route Definitions
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", courseRouteRegister);

// Port Configuration

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

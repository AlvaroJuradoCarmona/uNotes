import express from "express";
import morgan from "morgan";
import helmet from "helmet";
const cors = require("cors");

//Routes
import userRoutes from "./routes/user.routes";
import languageRoutes from "./routes/language.routes";

const app = express();

//Settings
app.set("port",4000);

//Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/user", userRoutes);
app.use("/api/language", languageRoutes)

export default app;
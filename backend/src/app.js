import express from "express";
import morgan from "morgan";
import helmet from "helmet";
const cors = require("cors");

//Routes
import userRoutes from "./routes/user.routes";
import languageRoutes from "./routes/language.routes";
import subjectRoutes from "./routes/subject.routes";
import universityRoutes from "./routes/university.routes";
import facultyRoutes from "./routes/faculty.routes";
import authRoutes from "./routes/auth.routes";
import fileRoutes from "./routes/file.routes";
import categoryRoutes from "./routes/category.routes";

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
app.use("/api/language", languageRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/category", categoryRoutes);

export default app;
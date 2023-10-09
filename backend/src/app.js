import express from "express";
import morgan from "morgan";
import helmet from "helmet";
const cors = require("cors");

//Routes
import userRoutes from "./routes/user.routes";
import subjectRoutes from "./routes/subject.routes";
import universityRoutes from "./routes/university.routes";
import facultyRoutes from "./routes/faculty.routes";
import authRoutes from "./routes/auth.routes";
import fileRoutes from "./routes/file.routes";
import categoryRoutes from "./routes/category.routes";
import commentRoutes from "./routes/comment.routes";
import licenseRoutes from "./routes/license.routes";
import achievementRoutes from "./routes/achievement.routes"
import rankingRoutes from "./routes/ranking.routes"

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
app.use("/api/subject", subjectRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/license", licenseRoutes);
app.use("/api/achievement", achievementRoutes);
app.use("/api/ranking", rankingRoutes);

export default app;
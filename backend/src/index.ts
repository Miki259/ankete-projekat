import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes";
import anketaRoutes from "./routes/anketaRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", anketaRoutes);

const frontendPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(3000, () => {
  console.log("Server radi na http://localhost:3000");
});
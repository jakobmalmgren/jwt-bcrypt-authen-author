import express from "express";
import dotenv from "dotenv";
import secretRoute from "./routes/secretroute.js";
import userRoute from "./routes/userroute.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api", secretRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`servern körs på http://localhost:${PORT}`);
});

import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/uses", userRouter);
app.use("/api/v1/subsriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

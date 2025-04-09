import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send("GET all subsriptions"));
subscriptionRouter.get("/:id", (req, res) =>
  res.send("GET  subsription details")
);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id");
subscriptionRouter.delete("/", (req, res) => res.send("DELETE a subsription"));
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/:id/cancell", (req, res) =>
  res.send("CANCELL a subsription")
);
subscriptionRouter.get("/upcoming-renewels", (req, res) =>
  res.send("GET upcoming renewals")
);

export default subscriptionRouter;

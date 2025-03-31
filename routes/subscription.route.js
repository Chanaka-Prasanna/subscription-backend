import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send("GET all subsriptions"));
subscriptionRouter.get("/:id", (req, res) =>
  res.send("GET  subsription details")
);
subscriptionRouter.post("/", (req, res) => res.send("CREATE a subsription"));
subscriptionRouter.put("/:id", (req, res) => res.send("UPDATE a subsription"));
subscriptionRouter.delete("/", (req, res) => res.send("DELETE a subsription"));
subscriptionRouter.get("/user/:id", (req, res) =>
  res.send("GET  all user subsription")
);
subscriptionRouter.put("/:id/cancell", (req, res) =>
  res.send("CANCELL a subsription")
);
subscriptionRouter.get("/upcoming-renewels", (req, res) =>
  res.send("GET upcoming renewals")
);

export default subscriptionRouter;

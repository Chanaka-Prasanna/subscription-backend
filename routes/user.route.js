import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => res.send({ title: "GET  all users" }));
userRoutes.get("/:id", (req, res) => res.send({ title: "GET  a user" }));
userRoutes.post("/", (req, res) => res.send({ title: "Create a new user" }));
userRoutes.put("/:id", (req, res) => res.send({ title: "UPDATE  user" }));
userRoutes.delete("/:id", (req, res) => res.send({ title: "DELETE  a user" }));

export default userRoutes;

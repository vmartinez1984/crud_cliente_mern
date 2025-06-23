import express from "express";
import {
  create,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

const route = express.Router();

route.post("/users", create);
route.get("/users", getAllUser);
route.get("/users/:id", getUserById);
route.put("/users/:id", updateUser);
route.delete("/users/:id", deleteUser);

export default route;

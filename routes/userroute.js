import express from "express";
import checkRole from "../middleware/checkRole.js";
import { logInUser, createUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/onlyUser", checkRole("user"), (req, res) => {
  res.status(200).json({ message: "Välkommen user!" });
});

// router.get("/admin", checkRole("admin", "user"), (req, res) => { skulle kunna skriva så me för o få acces me flera..
router.get("/admin", checkRole("admin"), (req, res) => {
  res.status(200).json({ message: "Välkommen admin/user!" });
});

router.post("/createUser", createUser);

router.post("/login", logInUser);

export default router;

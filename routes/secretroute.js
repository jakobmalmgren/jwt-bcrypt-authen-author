import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

router.get("/secretroute", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({
      message:
        "ingen auth i headern, krävs for att komma åt data på denna sida !",
    });
  }
  //   console.log(authHeader);
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const payload = jwt.verify(token, process.env.MY_SECRET_KEY);
    console.log("data", payload);
    res
      .status(200)
      .json({ message: "rätt token du är inloggad", payload: payload });
  } catch (err) {
    res.status(401).json({ message: "invalid token", error: err });
  }
});

export default router;

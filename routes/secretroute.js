import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

router.get("/secretroute", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
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
    const currentTime = Math.floor(Date.now() / 1000); // Hämta aktuell tid i sekunder
    const timeLeft = payload.exp - currentTime;
    // detta gör ju de inte loggar ut hela tiden efter 600s som ja satt de till..så gör man ett anrop när de är 60 sek kvar så förskjuts de 1h
    if (timeLeft < 60) {
      const newToken = jwt.sign({ id: payload.id }, process.env.MY_SECRET_KEY, {
        expiresIn: "1h",
      });
      //   const currentTime = Math.floor(Date.now() / 1000); // Hämta aktuell tid i sekunder
      //   const timeLeft = newToken.exp - currentTime;
      return res.status(200).json({
        message: "ny uppdaterad token skickad tillbaka för den håller på gå ut",
        payload: payload,
        timeleft: timeLeft,
        token: newToken,
      });
    } else {
      return res.status(200).json({
        message: "token är giltig",
        payload: payload,
        timeleft: timeLeft,
      });
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: "ogiltlig eller utgången token", error: err });
  }
});

export default router;

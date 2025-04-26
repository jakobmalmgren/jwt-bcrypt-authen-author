import jwt from "jsonwebtoken";

const checkRole = (...roles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "u need a auth i headern" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.MY_SECRET_KEY);
      if (!roles.includes(payload.role)) {
        console.log("Du har inte rätt roll");
        return res.status(403).json({ message: "Du har inte rätt roll!" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: "fel mer servern eller nyckeln" });
    }
  };
};

export default checkRole;

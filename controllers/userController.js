import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../bcrypt.js";
import { saveUser, IfUsernameExists, findUser } from "../models/userModel.js";

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await IfUsernameExists(username);
  if (user.length > 0) {
    return res.status(401).json({ message: "användarnamnet upptaget" });
  }
  try {
    const hashedPassword = await hashPassword(password);
    await saveUser(username, hashedPassword);
    res.status(201).json({ message: "created user succesfully" });
  } catch (err) {
    res.status(400).json({ message: "couldnt create a user", error: err });
  }
};

const logInUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUser(username);
    if (!user) {
      res.status(400).json({ message: "fel lösenord el användarnamn" }); // är fel anv namn / el den finns inte,  men man ska inte avslöja för mycke för anvöndaren..
    }
    const matchedPassword = await comparePassword(password, user.password);
    const result = {
      success: false,
    };
    if (matchedPassword) {
      // visar att personen är inloggad så skickas token med
      const token = jwt.sign({ id: user.id }, process.env.MY_SECRET_KEY, {
        expiresIn: 600,
      });
      result.success = true;
      result.token = token;
      result.message = "inloggad";
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "fel lösenord el användarnamn" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverfel. Försök igen senare." });
  }
};
export { logInUser, createUser };

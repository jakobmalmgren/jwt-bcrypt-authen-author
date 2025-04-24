import Datastore from "nedb-promises";
import { v4 as uuidv4 } from "uuid";
const userDb = new Datastore({ filename: "./db/user.db", autoload: true });
export default userDb;

const saveUser = async (username, password) => {
  return await userDb.insert({
    username: username,
    password: password,
    id: uuidv4(),
  });
};

const IfUsernameExists = async (username) => {
  const users = await userDb.find({ username: username });
  console.log("users:", users);

  return users;
};

const findUser = async (username) => {
  return await userDb.findOne({ username: username });
};

export { saveUser, IfUsernameExists, findUser };

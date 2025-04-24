import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
const comparePassword = async (password, hashedPassword) => {
  const isTheSame = await bcrypt.compare(password, hashedPassword);
  return isTheSame;
};
export { hashPassword, comparePassword };

// import bcrypt from "bcrypt";

// const hashPassword = (password) => {
//   return bcrypt.hash(password, 10);
// };
// const comparePassword = (password, hashedPassword) => {
//   return bcrypt.compare(password, hashedPassword);
// };
// export { hashPassword, comparePassword };

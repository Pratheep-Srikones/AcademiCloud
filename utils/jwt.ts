import jwt from "jsonwebtoken";
export const generateJwtToken = (payload: {
  user_id: string;
  username: string;
}) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("No JWT secret found");
  }
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
};

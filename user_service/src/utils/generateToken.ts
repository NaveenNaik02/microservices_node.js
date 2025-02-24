import jwt from "jsonwebtoken";

export const generateToken = (payload: any) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign(payload, secretKey, {
    expiresIn: process.env.JWT_EXPIRY as jwt.SignOptions["expiresIn"],
  });

  return token;
};

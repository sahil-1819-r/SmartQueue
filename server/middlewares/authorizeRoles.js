import { CustomError } from "./CustomError.js";

export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      throw new CustomError(403, "Forbidden: Insufficient Permission");
    }
    next();
  };
};

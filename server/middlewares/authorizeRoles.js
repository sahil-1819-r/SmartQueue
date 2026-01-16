import { CustomError } from "./CustomError.js";

export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new CustomError(403, "Forbidden: Insufficient Permission");
    }
    next();
  };
};

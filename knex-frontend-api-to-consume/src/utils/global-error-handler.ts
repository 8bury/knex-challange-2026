import { isCelebrateError } from "celebrate";
import { NextFunction, Request, response, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { TypeORMError } from "typeorm";

const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (isCelebrateError(error)) {
    return response.status(400).json(error);
  }

  if (error instanceof TypeORMError) {
    return response.status(500).json({ message: "Database error" });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({ message: "Invalid token" });
  }

  return response.status(500).json({ message: "Internal server error" });
};

export default globalErrorHandler;

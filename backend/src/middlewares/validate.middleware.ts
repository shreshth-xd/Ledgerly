import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function validate(schema: ZodObject) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error.issues,
        });
        return;
      }

      next(error);
    }
  };
}
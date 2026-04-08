import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "Token missing" });
  }

  const [, token] = authToken.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    req.userId = decoded.id;
    req.userRole = decoded.role ?? "User";

    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

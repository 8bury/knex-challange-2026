import { Request, Response } from "express";

class HealthController {
  check(_req: Request, res: Response) {
    res.status(200).json({ ok: true });
  }
}

export { HealthController };

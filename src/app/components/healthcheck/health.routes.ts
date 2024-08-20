import { Express } from "express";
import { HealthController } from "./health.controller";

export function healthRoutes(app: Express, prefix: string): void {
  app.get(prefix + "/healthcheck", (req, res) =>
    new HealthController(req, res).check()
  );
}

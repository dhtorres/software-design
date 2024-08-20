import { Express } from "express";
import { healthRoutes } from "../app/components/healthcheck/health.routes";

const base = "/api/v1";

export function appRoutes(app: Express) {
  healthRoutes(app, base);
}

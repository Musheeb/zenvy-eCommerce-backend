import { Application, Request, Response, NextFunction } from "express";

module.exports = async (app: Application) => {
  app.get(
    "/sanityCheck",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.send("Yes. It is working.");
      } catch (e) {
        next(e);
      }
    },
  );
  app.get(
    "/get-statistics",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Get new arrivals.

        //Get low stock count.

        return res.send("Dashboard statistics API is working ✅");
      } catch (e) {
        next(e);
      }
    },
  );
};

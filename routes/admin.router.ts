import ProductModel from "../models/Product.model";

import auth from "../middlewares/auth.middleware";

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
    auth,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const currentTime = new Date();
        const before24Hours = currentTime.getTime() - 24 * 60 * 60 * 1000;
        const LOW_STOCK_LIMIT = Number(process.env.LOW_STOCK_LIMIT) || 5;
        // Get new arrivals.
        const newArrivalsCount = await ProductModel.countDocuments({
          createdAt: { $gte: before24Hours },
        });

        //Get low stock count.
        const lowStockCount: number = await ProductModel.countDocuments({
          quantity: { $lte: LOW_STOCK_LIMIT },
        });

        //Get inventory items count.
        const inventoryItemsRaw = await ProductModel.aggregate([
          {
            $group: {
              _id: "_id",
              inventoryCount: { $sum: "$quantity" },
            },
          },
        ]);

        return res.status(200).json({
          lowStockCount,
          newArrivalsCount,
          inventoryItemsCount: inventoryItemsRaw[0]?.inventoryCount ?? 0,
        });
      } catch (e) {
        next(e);
      }
    },
  );
};

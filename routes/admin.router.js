module.exports = async (app) => {
  app.get("/sanityCheck", async (req, res, next) => {
    try {
      return res.send("Yes. It is working.");
    } catch (e) {
      next(e);
    }
  });
  app.get("/get-statistics", async (req, res, next) => {
    try {
      // Get new arrivals.

      //Get low stock count.

      return res.send("Holaaa");
    } catch (e) {
      next(e);
    }
  });
};

module.exports = async (app) => {
  app.get("/sanityCheck", async (req, res, next) => {
    try {
      return res.send("Yes. It is working.");
    } catch (e) {
      next(e);
    }
  });
};

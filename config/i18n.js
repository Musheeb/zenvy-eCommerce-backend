const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const path = require("path");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",

    backend: {
      loadPath: path.join(process.cwd(), "locales/{{lng}}/common.json"),
    },

    detection: {
      order: ["header"],
      lookupHeader: "language",
    },
  });

module.exports = i18next;

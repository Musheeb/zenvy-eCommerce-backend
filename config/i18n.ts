import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";

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

export default i18next;

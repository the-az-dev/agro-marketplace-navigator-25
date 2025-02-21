import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Завантаження JSON-файлів
  .use(LanguageDetector) // Визначення мови браузера
  .use(initReactI18next) // Інтеграція з React
  .init({
    supportedLngs: ["uk", "en",], // Підтримувані мови
    fallbackLng: "uk", // Мова за замовчуванням
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      loadPath: "../assets/locales/{{lng}}.json", // Де знаходяться файли перекладу
    },
    interpolation: { escapeValue: false },
  });

export default i18n;

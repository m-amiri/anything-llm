import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { defaultNS, resources } from "./locales/resources";

i18next
  // https://github.com/i18next/i18next-browser-languageDetector/blob/9efebe6ca0271c3797bc09b84babf1ba2d9b4dbb/src/index.js#L11
  .use(initReactI18next) // Initialize i18n for React
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    debug: import.meta.env.DEV,
    defaultNS,
    resources,
    lowerCaseLng: true,
    interpolation: {
      escapeValue: false,
    },
  });

/**
 * Apply Farsi font when Persian/Farsi language is selected
 * This handles font switching automatically without modifying any components
 * Note: RTL direction is applied only to chat content, not the entire UI
 */
function applyLanguageSpecificStyles(language) {
  const isFarsi = language?.toLowerCase() === "fa";

  if (isFarsi) {
    document.body.classList.add("font-farsi");
    document.body.classList.add("lang-rtl"); // Add RTL indicator class for chat container
    document.documentElement.setAttribute("lang", "fa");
  } else {
    document.body.classList.remove("font-farsi");
    document.body.classList.remove("lang-rtl");
    document.documentElement.setAttribute("lang", language || "en");
  }
}

// Apply styles on initial load
applyLanguageSpecificStyles(i18next.language);

// Listen for language changes and apply styles accordingly
i18next.on("languageChanged", (language) => {
  applyLanguageSpecificStyles(language);
});

export default i18next;

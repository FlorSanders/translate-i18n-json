import translate from "./translate.js";

// Source translation file
const sourceTranslation = {
  file: "./translations/en.json", // Source file path
  language: "en", // Source file language
};

// Target translation files
const targetTranslations = [
  {
    file: "./translations/nl.json", // Target file path
    language: "nl", // Target file language
    oldFile: "./translations_old/nl.json", // Old target file (overwrites auto-generated translations)
  },
  {
    file: "./translations/fr.json", // Target file path
    language: "fr", // Target file language
    oldFile: "./translations_old/fr.json", // Old target file (overwrites auto-generated translations)
  },
];

// Generate translations
translate(sourceTranslation, targetTranslations);

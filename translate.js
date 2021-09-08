import translate from "@vitalets/google-translate-api";
import languages from "./languages.js";

async function generateTranslations(
  sourceTranslation,
  sourceLanguage,
  targetLanguages
) {
  const translations = {};
  for (const language of targetLanguages) {
    if (languages.find((lan) => lan === language)) {
      console.info(`Translating ${language}...`);
      const translation = await generateTranslation(
        sourceTranslation,
        sourceLanguage,
        language
      );
      translations[language] = translation;
    } else {
      console.error(`Language ${language} not supported.`);
    }
  }
  return translations;
}

async function generateTranslation(
  sourceTranslation,
  sourceLanguage,
  targetLanguage
) {
  if (typeof sourceTranslation === "object") {
    var translation = {};
    for (const [key, value] of Object.entries(sourceTranslation)) {
      translation[key] = await generateTranslation(
        value,
        sourceLanguage,
        targetLanguage
      );
    }
    return translation;
  } else if (typeof sourceTranslation === "string") {
    try {
      var translationResponse = await translate(sourceTranslation, {
        from: sourceLanguage,
        to: targetLanguage,
      });
      return translationResponse.text;
    } catch (error) {
      console.error(error);
    }
  }
}

export { generateTranslation, generateTranslations };

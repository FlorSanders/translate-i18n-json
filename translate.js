import gTranslate from "@vitalets/google-translate-api";
import fs from "fs";
import languages from "./languages.js";

/**
 * Generate translations
 * @param {object} sourceTranslation - Source translation
 * @param {array} targetTranslations - Target translations
 */
const translate = async (sourceTranslation, targetTranslations) => {
  try {
    // Translate all targets
    for (const targetTranslation of targetTranslations) {
      await translateTarget(sourceTranslation, targetTranslation);
    }
  } catch ({ message }) {
    console.error({ message });
  }
};

/**
 * Generate translations for a single target
 * @param {object} sourceTranslation - Source translation
 * @param {object} targetTranslation - Target translation
 */
const translateTarget = async (sourceTranslation, targetTranslation) => {
  try {
    // Destructure data
    const { language: sourceLanguage, file: sourceFile } = sourceTranslation;
    const {
      language: targetLanguage,
      file: targetFile,
      oldFile: oldTargetFile,
    } = targetTranslation;
    console.log(`Translating ${sourceLanguage} to ${targetLanguage}`);

    // Verify that languages are supported
    if (!languages.includes(sourceLanguage))
      throw new Error(`Language ${sourceLanguage} not supported`);
    if (!languages.includes(targetLanguage))
      throw new Error(`Language ${targetLanguage} not supported`);

    // Read source files
    const source = JSON.parse(fs.readFileSync(sourceFile));
    let old = oldTargetFile ? JSON.parse(fs.readFileSync(oldTargetFile)) : null;

    // Perform translation
    const target = await translateObject(
      source,
      old,
      sourceLanguage,
      targetLanguage
    );

    // Write translation to file
    fs.writeFileSync(targetFile, JSON.stringify(target, null, 2));
  } catch ({ message }) {
    throw new Error(message);
  }
};

/**
 * Translates all string in an object recursively
 * @param {object} sourceObject - Object containing source translations
 * @param {object} oldObject - Object containing old translations
 * @param {string} sourceLanguage - Source language
 * @param {string} targetLanguage - Target language
 * @returns {object} Object containing target translations
 */
const translateObject = async (
  sourceObject,
  oldObject,
  sourceLanguage,
  targetLanguage
) => {
  try {
    // Construct target translation
    const targetObject = {};
    for (const [key, value] of Object.entries(sourceObject)) {
      // Obtain old value if it exists
      const oldValue = oldObject ? oldObject[key] : null;
      // Perform translation
      if (typeof value === "object") {
        // Translate object recursively
        targetObject[key] = await translateObject(
          value,
          oldValue,
          sourceLanguage,
          targetLanguage
        );
      } else if (typeof value === "string") {
        // Translate string
        if (oldValue) {
          // Use existing translation
          targetObject[key] = oldValue;
          // console.log(`Translation*: ${value} - ${targetObject[key]}`);
        } else {
          // Generate translation using google translate
          const translation = await gTranslate(value, {
            from: sourceLanguage,
            to: targetLanguage,
          });
          targetObject[key] = translation.text;
          console.log(`Translation: ${value} - ${targetObject[key]}`);
        }
      } else {
        throw new Error(
          `Unsupported type (${typeof value}) of value (${value})`
        );
      }
    }
    return targetObject;
  } catch ({ message }) {
    throw new Error(message);
  }
};

export default translate;

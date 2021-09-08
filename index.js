import fs from "fs";
import path from "path";
import { generateTranslations } from "./translate.js";

const sourceLanguage = "en";
const sourceFile = "./en.json";
const targetLanguages = ["nl", "fr", "es", "de"];
const targetLocation = "./translations/";

const sourceTranslation = JSON.parse(fs.readFileSync(sourceFile));

async function translate() {
  console.log("Translating...");
  const translations = await generateTranslations(
    sourceTranslation,
    sourceLanguage,
    targetLanguages
  );
  for (const [language, translation] of Object.entries(translations)) {
    const targetFile = path.join(targetLocation, `${language}.json`);
    fs.mkdir(targetLocation, () => {
      fs.writeFileSync(targetFile, JSON.stringify(translation));
    });
  }
}

translate();

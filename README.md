# translate-i18n-json

Translate-i18n-json is a node.js script that helps quickly generate [i18next](https://www.i18next.com/) translations using google translate.

## How to use

1. Clone this [repository](https://github.com/FlorSanders/translate-i18n-json).
   `git clone git@github.com:FlorSanders/translate-i18n-json.git`

2. Add `json` file with base translations in `translations` folder.

3. Update [index.js](./index.js) to point to the correct source file and language.
   
   ```js
   // Source translation file
   const sourceTranslation = {
     file: "./translations/en.json", // Source file path
     language: "en",                 // Source file language
   };
   ```
   
   Note: A list of all supported languages is included in [languages.js](./languages.js).

4. (Optional) Add `json` files with old target translations in the `translations_old` folder.
   Note: The script will use the existing old translations if available, thus saving bandwidth.

5. Update [index.js](./index.js) to point to the correct target files and languages.
   
   ```js
   // Target translation files
   const targetTranslations = [
     {
       file: "./translations/nl.json", // Target file path
       language: "nl", // Target file language
       oldFile: "./translations_old/nl.json", // (Optional) Old target file (overwrites auto-generated translations)
     },
     {
       file: "./translations/fr.json", // Target file path
       language: "fr", // Target file language
       oldFile: "./translations_old/fr.json", // (Optional) Old target file (overwrites auto-generated translations)
     },
   ];
   ```

6. Run the script.
   `npm start`



## Dependencies

- [@vitalets/google-translate-api](https://github.com/vitalets/google-translate-api): A **free** and **unlimited** API for Google Translate for Node.js.

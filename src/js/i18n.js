// i18n https://www.christianengvall.se/electron-localization/
var loadedLanguage;
var i18n = {
  lang: function() {
    var lang = "en";

    try {
      var confObj = getConf();

      lang = confObj.locale.replace("-", "_");
    } catch (error) {}

    return lang;
  },
  __: function(phrase) {
    if (loadedLanguage == undefined) {
      var folder = "locale";

      if (fs.existsSync(path.join(__dirname, folder, i18n.lang() + ".json"))) {
        loadedLanguage = JSON.parse(
          fs.readFileSync(
            path.join(__dirname, folder, i18n.lang() + ".json"),
            "utf8"
          )
        );
      } else {
        loadedLanguage = JSON.parse(
          fs.readFileSync(path.join(__dirname, folder, "en.json"), "utf8")
        );
      }
    }

    var translation = loadedLanguage[phrase];
    if (translation === undefined) {
      translation = phrase;
    }
    return translation;
  }
};

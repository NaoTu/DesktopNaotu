import { DesktopConfig } from "./conf";
import { join } from "path";
import { readJson } from "./io";
import { sLocaleDir } from "../define";

/**
 * 国际化接口
 */
export namespace I18n {
  let config = new DesktopConfig();

  /**
   * 应该显示什么语言
   */
  export function getLang(): string {
    let locale = config.getModel().locale || "en";

    return locale.replace("-", "_");
  }

  /**
   * 已加载语言的资源
   */
  let loadedLanguage: any;

  /**
   * 对应语言的内容
   * @param phrase 编码
   */
  export function __(phrase: string): string {
    if (!loadedLanguage) {
      let path = join(__dirname, sLocaleDir, getLang() + ".json");

      loadedLanguage = readJson(path);
    }

    let translation = loadedLanguage[phrase];
    if (translation === undefined) {
      translation = phrase;
    }
    return translation;
  }
}

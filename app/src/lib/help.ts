import { sLicenseUrl, sAboutText } from "../define";
import { remote } from "electron";
import { I18n } from "../core/i18n";
import { logger } from "../core/logger";

export function exitApp() {
  logger.info("exit successfully!");

  remote.app.quit();
}

export function license() {
  remote.shell.openExternal(sLicenseUrl);
}

export function about() {
  bootbox.alert({ title: I18n.__("sAppName"), message: sAboutText });
}

export function checkVersion() {
  logger.info("检查是否有新版本发布");

  // TODO
  // $.get(
  //   "https://raw.githubusercontent.com/NaoTu/DesktopNaotu/master/version.js",
  //   function(data) {
  //     var newVer = data.substring(19, data.lastIndexOf(","));
  //     var oldVer = ver.version.slice(0, 3).join(", ");

  //     if (newVer != oldVer) {
  //       bootbox.alert(i18n.__("sUpdateMessage"));
  //       shell.openExternal("https://github.com/NaoTu/DesktopNaotu/releases");
  //     } else {
  //       bootbox.alert(i18n.__("sNoUpdatesAvailable"));
  //     }
  //   }
  // );
}

import { sLicenseUrl, sAboutText, sVersionUrl, sReleasesUrl } from "../define";
import { remote } from "electron";
import { I18n } from "../core/i18n";
import { logger } from "../core/logger";
import { version } from "../version";

/**
 * 退出
 *
 * Ctrl+Q
 * 行为：有未保存的数据，则提示，否则直接退出。
 */
export function exitApp() {
  remote.app.quit();
}

export function license() {
  remote.shell.openExternal(sLicenseUrl);
}

export function about() {
  bootbox.alert({ title: I18n.__("sAppName"), message: sAboutText });
}

export function checkVersion() {
  try {
    logger.info("检查是否有新版本发布");

    $.get(sVersionUrl, function(data: any) {
      let newVer = data.substring(19, data.lastIndexOf(","));
      let oldVer = version.slice(0, 3).join(", ");

      if (newVer != oldVer) {
        bootbox.alert(I18n.__("sUpdateMessage"));
        remote.shell.openExternal(sReleasesUrl);
      } else {
        bootbox.alert(I18n.__("sNoUpdatesAvailable"));
      }
    });
  } catch (ex) {
    logger.error(ex);
  }
}

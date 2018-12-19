import { ipcRenderer, remote } from "electron";
import { I18n } from "../core/i18n";
import { naotuBase } from "./base";

export function monitorExitRequest() {
  // 监听与主进程的通信
  ipcRenderer.on("action", (event: Event, arg: string) => {
    switch (arg) {
      case "exit":
        if (naotuBase.HasSaved()) {
          ipcRenderer.sendSync("reqaction", "exit");
        } else {
          // 退出提示
          bootbox.confirm(I18n.__("sExitTip"), (result: boolean) => {
            if (result) {
              ipcRenderer.sendSync("reqaction", "exit");
            }
          });
        }
        break;
    }
  });
}

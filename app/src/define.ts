/**
 * 定义项目中用到的字符串
 */

//#region 1. 不容易变化的部分
import { version } from "./version";
import { join } from "path";

/**
 * 文件备份的路径
 */
export let sBackupDir = "/backup";

/**
 * 多语言文件目录
 */
export let sLocaleDir = "../locale";

/**
 * 日志目录
 */
export let sLogsDir = "/logs";

/**
 * 配置文件名称
 */
export let sConfigFile = "/naotu.config.json";

/**
 * 首页的路径
 */
export let sIndexUrl = join(`file://${__dirname}`, "/index.html");

/**
 * 许可证的地址
 */
export let sLicenseUrl =
  "https://github.com/NaoTu/DesktopNaotu/blob/master/doc/Help.md";

/**
 * 检查更新的地址
 */
export let sVersionUrl =
  "https://raw.githubusercontent.com/NaoTu/DesktopNaotu/master/app/src/version.ts";

/**
 * 项目 release 地址
 */
export let sReleasesUrl = "https://github.com/NaoTu/DesktopNaotu/releases";

/**
 * 导出窗口的标题
 */
export let sExportTitle = "KityMinder";

/**
 * 操作状态
 */
export type StatusList = "none" | "opening" | "closing" | "saving";
//#endregion

//#region 2. 可能变化的部分

/**
 * 关于的内容
 */
export let sAboutText = `
Copyright (c) 2019 Jack <br><br>
Version: v${version.join(".")}<br><br>
Thanks: 
<a href='javascript:void(0);' onclick='openUrl("https://inaotu.org/");'>爱脑图(iNaotu)</a> |
<a href='javascript:void(0);' onclick='openUrl("https://github.com/NaoTu/DesktopNaotu");'>iNaotu Team.</a>`;

/**
 * 当前配置文件的版本
 */
export let sConfigVersion = "v0.1";

/**
 * 支持的语言
 */
export type Languages = "en" | "zh-CN" | "zh-TW" | "de";

/**
 * 支持的扩展名
 */
export let arrExtensions: string[] = ["km"];

//#endregion

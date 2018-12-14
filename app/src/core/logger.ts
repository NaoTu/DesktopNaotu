import { configure, getLogger, Logger } from "log4js";
import { getLogDirectoryPath } from "./path";

/**
 * 定义日志类的接口
 */
declare interface INaotuLogger {
  error(message: string, error?: Error): void;
  warn(message: string, error?: Error): void;
  info(message: string, error?: Error): void;
  debug(message: string, error?: Error): void;
}

/**
 * 桌面版脑图的日志类
 */
export class NaotuLogger implements INaotuLogger {
  //#region 日志的方法
  // 日志对象
  private logger: Logger;

  public error(message: string, error?: Error) {
    this.logger.error(message, error);
  }
  public warn(message: string, error?: Error) {
    this.logger.warn(message, error);
  }
  public info(message: string, error?: Error) {
    this.logger.info(message, error);
  }
  public debug(message: string, error?: Error) {
    this.logger.debug(message, error);
  }
  //#endregion

  //#region 单例化
  // 单例对象
  private static instance: NaotuLogger;

  /**
   * 私有的构造方法
   */
  private constructor() {
    // 初始化日志对象
    configure({
      appenders: {
        NaoTuApp: {
          type: "dateFile",
          filename: getLogDirectoryPath(),
          pattern: ".yyyy-MM-dd-hh.log",
          compress: true,
          alwaysIncludePattern: true
        }
      },
      categories: {
        default: { appenders: ["NaoTuApp"], level: "debug" }
      }
    });

    // 初始化日志对象
    this.logger = getLogger("NaoTuApp");
  }

  /**
   * 获取日志对象
   */
  public static getInstance(): NaotuLogger {
    if (!this.instance) {
      this.instance = new NaotuLogger();
    }
    return this.instance;
  }
  //#endregion
}

/**
 * 日志对象
 */
export let logger: NaotuLogger = NaotuLogger.getInstance();

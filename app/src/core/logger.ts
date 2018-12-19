import { Logger, createLogger, format, transports } from "winston";
import { getLogDirectoryPath } from "./path";
import { join } from "path";

interface LeveledLogMethod {
  (message: string): void;
  (message: string, error?: Error): void;
}

/**
 * 定义日志类的接口
 */
declare interface INaotuLogger {
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  info: LeveledLogMethod;
  debug: LeveledLogMethod;
}

/**
 * 桌面版脑图的日志类
 */
class NaotuLogger implements INaotuLogger {
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
    this.logger.info(
      `[${process.platform},${process.pid}] ${message}`,
      error || ``
    );
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
    let dir = getLogDirectoryPath();

    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      transports: [
        new transports.File({
          filename: join(dir, "naotu.err.log"),
          level: "error"
        }),
        new transports.File({
          filename: join(dir, "naotu.log"),
          maxsize: 104857600, // 100M
          maxFiles: 50,
          tailable: true
        })
      ]
    });

    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new transports.Console({
          format: format.simple()
        })
      );
    }
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

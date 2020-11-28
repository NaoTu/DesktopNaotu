// 配置文件辅助类
import { getConfigFilePath, getBackupDirectoryPath } from "./path";
import { existsSync } from "fs";
import { app } from "electron";
import { writeText, readText } from "./io";
import { Languages, sConfigVersion } from "../define";
import { logger } from "./logger";

/**
 * 文件打开记录的格式
 */
export declare interface IRecentlyItem {
  time: string;
  path: string;
}

/**
 * 配置文件的模板
 */
class NaotuConfig {
  //#region properties

  /**
   * 默认保存的目录
   */
  defSavePath?: string;

  /**
   * 最近使用文件列表
   */
  recently?: IRecentlyItem[];

  /**
   * 语言
   */
  locale?: Languages;

  /**
   * 是否自动保存
   */
  isAutoSave?: boolean;

  /**
   * 最近文件的数量
   */
  recentMaxNum?: number;

  /**
   * 是否保存日志到磁盘上
   */
  ifSaveLogToDisk?: boolean;

  /**
   * 编辑器窗口的大小
   * 每次退出自动记录，下次启动后按此大小打开窗口
   */
  editorWindowWidth?: number;   // 窗口宽度
  editorWindowHeight?: number;  // 窗口高度

  /**
   * 配置文件的版本
   */
  version?: string;
  //#endregion

  //#region methods
  constructor(
    locale: Languages,
    defSavePath: string,
    isAutoSave: boolean,
    recentMaxNum: number,
    recently: IRecentlyItem[],
    ifSaveLogToDisk: boolean,
    editorWindowWidth: number,
    editorWindowHeight: number,
    version: string
  ) {
    this.locale = locale;
    this.defSavePath = defSavePath;
    this.isAutoSave = isAutoSave;
    this.recentMaxNum = recentMaxNum;
    this.recently = recently;
    this.ifSaveLogToDisk = ifSaveLogToDisk;
    this.editorWindowWidth = editorWindowWidth;
    this.editorWindowHeight = editorWindowHeight;
    this.version = version;
  }

  /**
   * 序列化成字符串
   * @param confModel 配置文件对象
   */
  public static Serialization(confModel: NaotuConfig): string {
    let confJson = JSON.stringify(confModel);

    return confJson;
  }

  /**
   * 反序列化成对象
   * @param confText 配置文件字符串
   */
  public static Deserialization(confText: string): NaotuConfig {
    const confJson = JSON.parse(confText);

    let lang = confJson.locale as Languages;
    let defSavePath = confJson.defSavePath as string;
    let isAutoSave = confJson.isAutoSave as boolean;
    let recentMaxNum = confJson.recentMaxNum as number;
    let recently = confJson.recently as IRecentlyItem[];
    let ifSaveLogToDisk = confJson.ifSaveLogToDisk as boolean;
    let editorWindowWidth = confJson.editorWindowWidth as number;
    let editorWindowHeight = confJson.editorWindowHeight as number;
    let version = confJson.version as string;

    return new NaotuConfig(
      lang,
      defSavePath,
      isAutoSave,
      recentMaxNum,
      recently,
      ifSaveLogToDisk,
      editorWindowWidth,
      editorWindowHeight,
      version
    );
  }
  //#endregion
}

/**
 * 配置文件接口清单
 */
interface IDesktopConfig {
  /**
   * 升级配置文件
   */
  upgrade(): void;

  /**
   * 获取配置文件模板
   */
  getTemplate(): NaotuConfig;

  /**
   * 获取配置文件
   */
  getModel(): NaotuConfig;

  /**
   * 保存配置文件
   * @param config 配置文件
   */
  save(config: NaotuConfig): void;

  /**
   * 创建配置文件
   */
  create(): void;
}

/**
 * 配置文件实现类
 */
class DesktopConfig implements IDesktopConfig {
  /**
   * 配置文件的路径
   */
  configPath: string;

  constructor() {
    console.log(">>> Config initialize!");

    this.configPath = getConfigFilePath();

    console.log(`init DesktopConfig. path is "${this.configPath}"`);
  }

  create(): void {
    console.log(`create DesktopConfig. path is "${this.configPath}"`);

    let config = this.getTemplate();
    this.save(config);
  }

  upgrade(): void {
    console.log(`upgrade DesktopConfig. path is "${this.configPath}"`);

    this.checkFile();

    let oldModel = this.getModel();
    let newModel = this.getTemplate();

    // 升级配置
    if (oldModel.version !== newModel.version) {
      if (oldModel.isAutoSave) newModel.isAutoSave = oldModel.isAutoSave;
      if (oldModel.locale) newModel.locale = oldModel.locale;
      if (oldModel.defSavePath) newModel.defSavePath = oldModel.defSavePath;
      if (oldModel.recentMaxNum) newModel.recentMaxNum = oldModel.recentMaxNum;
      if (oldModel.ifSaveLogToDisk) newModel.ifSaveLogToDisk = oldModel.ifSaveLogToDisk;
      if (oldModel.editorWindowWidth) newModel.editorWindowWidth = oldModel.editorWindowWidth;
      if (oldModel.editorWindowHeight) newModel.editorWindowHeight = oldModel.editorWindowHeight;
      if (oldModel.recently) newModel.recently = oldModel.recently;

      this.save(newModel);
    }
  }

  getTemplate(): NaotuConfig {
    let locale = app.getLocale();
    const lang = (locale as Languages) || "en";

    return new NaotuConfig(
      lang,
      getBackupDirectoryPath(),
      true,
      5,
      [],
      false,
      1000,     // 默认窗口宽度
      800,      // 默认窗口高度
      sConfigVersion
    );
  }

  getModel(): NaotuConfig {
    this.checkFile();

    let data = readText(this.configPath);
    let model = NaotuConfig.Deserialization(data);

    return model;
  }

  checkFile(): void {
    if (!existsSync(this.configPath)) {
      this.create();
    }
  }

  save(config: NaotuConfig): void {
    let data = NaotuConfig.Serialization(config);

    writeText(this.configPath, data);

    console.log(
      `save DesktopConfig. path is "${this.configPath}`
    );
  }
}

export let naotuConf = new DesktopConfig();

class NaotuBase {
  /**
   * 当前打开文件的路径
   */
  private _currentFilePath: string | null;
  public getCurrentFilePath(): string | null {
    return this._currentFilePath;
  }
  public setCurrentFilePath(value: string | null) {
    this._currentFilePath = value;
  }

  //#region 单例化
  // 单例对象
  private static instance: NaotuBase;

  /**
   * 私有的构造方法
   */
  private constructor() {
    this._currentFilePath = null;
  }
  /**
   * 获取日志对象
   */
  public static getInstance(): NaotuBase {
    if (!this.instance) {
      this.instance = new NaotuBase();
    }
    return this.instance;
  }
  //#endregion
}

export let naotuBase: NaotuBase = NaotuBase.getInstance();

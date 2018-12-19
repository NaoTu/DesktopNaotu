/**
 * 当做状态机类用
 */
class NaotuBase {
  /**
   * 当前打开文件的路径
   */
  private _kmPath: string | null;
  public getCurrentKm(): string | null {
    return this._kmPath;
  }
  public setCurrentKm(value: string | null) {
    this._kmPath = value;
  }

  // 保存序号
  private _savedNum: number;
  // 修改序号
  private _changedNum: number;

  /**
   * 打开时调用
   */
  public OnOpened() {
    // 打开时，会出发2次修改，需豁免
    this._changedNum -= 2;
  }

  /**
   * 保存时调用
   */
  public OnSaved() {
    this._savedNum = this._changedNum;
  }

  /**
   * 修改时调用
   */
  public OnEdited() {
    this._changedNum++;
  }

  /**
   * 是否保存了
   */
  public HasSaved() {
    // 修改的序号 与 保存的序号一致
    return this._changedNum === this._savedNum;
  }

  //#region 单例化
  // 单例对象
  private static instance: NaotuBase;

  /**
   * 私有的构造方法
   */
  private constructor() {
    this._kmPath = null;
    this._changedNum = 0;
    this._savedNum = 0;
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

/**
 * 插件登记需用的参数
 */
declare interface IPlugeItem {
  name: string;
  path: string;
  source: "id" | "url" | "file";
  description?: string;
  version: string;
}

/**
 * 定义插件管理
 */
declare interface IPluginManager {
  /**
   * 加载插件
   * @param plugin 插件对象
   */
  loadPlugin(plugin: IPlugeItem): void;

  /**
   * 卸载插件
   * @param name 插件名称
   */
  unloadPlugin(name: string): void;

  /**
   * 卸载所有插件
   */
  unloadAllPlugins(): void;

  /**
   * 启动插件
   */
  runPlugins(): void;
}

/**
 * 插件管理器
 */
export class PluginManager implements IPluginManager {
  private _plugins: { [key: string]: IPlugeItem };

  constructor() {
    this._plugins = {};
  }
  // new Dictionary

  loadPlugin(plugin: IPlugeItem): void {
    let key = plugin.name;

    // ContainsKey
    if (this._plugins.hasOwnProperty(key)) {
      return;
    }

    // load
    this._plugins[key] = plugin;
  }

  unloadPlugin(name: string): void {
    // ContainsKey
    if (this._plugins.hasOwnProperty(name)) {
      delete this._plugins[name];
    }
  }

  unloadAllPlugins(): void {
    for (let prop in this._plugins) {
      if (this._plugins.hasOwnProperty(prop)) {
        delete this._plugins[prop];
      }
    }
  }

  runPlugins(): void {
    for (let prop in this._plugins) {
      if (this._plugins.hasOwnProperty(prop)) {
        let item = this._plugins[prop];

        switch (item.source) {
          case "id":
            // TODO: 应用市场
            break;
          case "url":
            // TODO: url
            break;
          case "file":
            // TODO: 本地文件
            require(item.path);
            break;
        }
      }
    }
  }
}

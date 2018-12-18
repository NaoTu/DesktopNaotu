/**
 * 路径辅助类
 */
import { app, remote } from "electron";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { sConfigFile, sLogsDir, sBackupDir } from "../define";

/**
 * 获取用户目录
 */
export function getUserDataDir() {
  // 默认为当前目录
  let userData: string = __dirname;

  try {
    // 获取用户目录
    userData = (app || remote.app).getPath("userData");

    // 若没有用户目录，则创建
    if (!existsSync(userData)) mkdirSync(userData);
  } catch (error) {}

  return userData;
}

function getPath(dir: string) {
  const userData = getUserDataDir();
  let path = join(userData, dir);

  if (!existsSync(path)) mkdirSync(path);
  return path;
}

/**
 * 获取配置文件的路径
 */
export function getConfigFilePath(): string {
  return getPath(sConfigFile);
}

/**
 * 获取日志目录的路径
 */
export function getLogDirectoryPath(): string {
  return getPath(sLogsDir);
}

/**
 * 获取备份目录
 */
export function getBackupDirectoryPath(): string {
  return getPath(sBackupDir);
}

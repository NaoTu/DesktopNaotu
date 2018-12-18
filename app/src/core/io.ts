import {
  existsSync,
  writeFileSync,
  readFileSync,
  createReadStream,
  createWriteStream
} from "fs";

//#region 1. read file
export function readJson(path: string): JSON {
  return JSON.parse(readText(path));
}

export function readText(path: string): string {
  if (!existsSync(path)) throw `the file "${path}" is not found.`;

  return readFileSync(path, "utf8");
}
//#endregion

//#region 2. write file
export function writeJson(path: string, json: JSON) {
  writeText(path, JSON.stringify(json));
}

export function writeText(path: string, text: string) {
  writeFileSync(path, text, { encoding: "utf8" });
}

export function writeBuffer(path: string, data: Buffer) {
  writeFileSync(path, data);
}
//#endregion

/**
 * 复制文件
 * @param src 源文件
 * @param dst 目标文件
 */
export function copy(src: string, dst: string) {
  writeFileSync(dst, readFileSync(src));
}

export function copyByStream(src: string, dst: string) {
  createReadStream(src).pipe(createWriteStream(dst));
}

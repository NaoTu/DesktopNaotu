import { existsSync, writeFileSync, readFileSync } from "fs";

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

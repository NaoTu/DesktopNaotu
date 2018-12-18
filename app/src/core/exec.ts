import { exec } from "child_process";
import { logger } from "./logger";

/**
 * 执行命令
 * @param command 命令
 * @param args 参数
 */
export default async function execAsync(
  command: string,
  ...args: string[]
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    logger.info(`${command} ${args}`);

    var options = { encoding: "utf8" };

    exec(`${command} ${args}`, options, (error, stdout, stderr) => {
      /* istanbul ignore if */
      if (error) {
        reject(error);
        return;
      }

      if (stderr !== "") {
        reject(new Error(stderr as string));
        return;
      }

      // Remove new line etc.
      const normalisedResult = stdout.toString().trim();

      resolve(normalisedResult);
    });
  });
}

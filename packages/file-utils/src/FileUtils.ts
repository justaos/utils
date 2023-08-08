import {
  copy,
  copySync,
  existsSync,
  expandGlobSync,
  writeAll
} from "../deps.ts";

import MkdirOptions from "./MkdirOptions.ts";
import RemoveOptions from "./RemoveOptions.ts";
import { path } from "../../../deps.ts";

export default class FileUtils {
  static existsSync(filePath: string): boolean {
    try {
      Deno.statSync(filePath);
      // successful, file or directory must exist
      return true;
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        // file or directory does not exist
        return false;
      } else {
        // unexpected error, maybe permissions, pass it along
        throw error;
      }
    }
  }

  static async exists(filePath: string): Promise<boolean> {
    try {
      await Deno.stat(filePath);
      // successful, file or directory must exist
      return true;
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        // file or directory does not exist
        return false;
      } else {
        // unexpected error, maybe permissions, pass it along
        throw error;
      }
    }
  }

  static mkdirSync(filePath: string, options?: MkdirOptions): void {
    return Deno.mkdirSync(filePath, options);
  }

  static remove(path: string, options?: RemoveOptions) {
    return Deno.remove(path, options);
  }

  static removeSync(path: string, options?: RemoveOptions) {
    return Deno.removeSync(path, options);
  }

  static readFile(filePath: string): Uint8Array {
    return Deno.readFileSync(filePath);
  }

  static readFileSync(filePath: string) {
    return Deno.readFileSync(filePath);
  }

  static readTextFile(filePath: string): Promise<string> {
    return Deno.readTextFile(filePath);
  }

  static readTextFileSync(filePath: string) {
    return Deno.readTextFileSync(filePath);
  }

  static readJsonFileSync(filePath: string): any {
    return JSON.parse(this.readTextFileSync(filePath));
  }

  static readJsonFilesFromPathSync(filePath: string, options?: any): any[] {
    const result: any[] = [];
    for (const file of expandGlobSync(filePath)) {
      const data = this.readJsonFileSync(file.path);
      result.push(data);
    }
    return result;
  }

  static writeJsonFileSync(filePath: string, object: any) {
    return this.writeTextFileSync(filePath, JSON.stringify(object));
  }

  static writeTextFileSync(filePath: string, content: string) {
    Deno.writeTextFileSync(filePath, content);
  }

  static async copy(sourcePath: string, destinationPath: string) {
    await copy(sourcePath, destinationPath);
  }

  static async unZip(zipSourcePath: string, destinationPath: string) {
    const unzipCommandProcess = Deno.run({
      cmd:
        Deno.build.os === "windows"
          ? [
              "PowerShell",
              "Expand-Archive",
              "-Path",
              zipSourcePath,
              "-DestinationPath",
              destinationPath
            ]
          : ["unzip", zipSourcePath, "-d", destinationPath],
      stdout: "piped",
      stderr: "piped"
    });

    return (await unzipCommandProcess.status()).success;
  }

  static async unZipFromURL(downloadUrl: URL, destinationPath: string) {
    if (!await FileUtils.exists(destinationPath)) {
      FileUtils.mkdirSync(destinationPath, { recursive: true });
    }

    const tempFilePath = await FileUtils.#downloadFileToTemp(
      downloadUrl,
      destinationPath
    );

    await this.unZip(tempFilePath, destinationPath);

    // remove the temp file
    await Deno.remove(tempFilePath);
  }

  static copySync(sourcePath: string, destinationPath: string, options?: any) {
    copySync(sourcePath, destinationPath, options);
  }

  static async #downloadFileToTemp(downloadUrl: URL, destinationPath: string) {
    const response = await fetch(downloadUrl.href);
    const blob = await response.blob();

    // We convert the blob into a typed array
    // so we can use it to write the data into the file
    const arrayBufferFromBlobResponse = await blob.arrayBuffer();
    const uint8ArrayEncodeFileData = new Uint8Array(
      arrayBufferFromBlobResponse
    );

    const tempFilePath = path.join(destinationPath, "_temp_.zip");

    // We then create a new file and write into it
    const file = await Deno.create(tempFilePath);
    await writeAll(file, uint8ArrayEncodeFileData);

    // We can finally close the file
    Deno.close(file.rid);

    return tempFilePath;
  }
}

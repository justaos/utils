import { existsSync, expandGlobSync } from 'https://deno.land/std/fs/mod.ts';
import MkdirOptions from './MkdirOptions.ts';
import RemoveOptions from './RemoveOptions.ts';


export default class FileUtils {

  static existsSync(filePath: string): boolean {
    return existsSync(filePath);
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

  /*
    static delete(patterns: any): Promise<any> {
      return del(patterns);
    }
  */

  static copySync(sourcePath: string, destinationPath: string) {
    // fs.copySync(sourcePath, destinationPath);
  }
}

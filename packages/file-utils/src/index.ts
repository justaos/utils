import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as jsonfile from 'jsonfile';
import del from 'del';

export default class FileUtils {
  static readJsonFileSync(filePath: string, options?: any): any {
    return jsonfile.readFileSync(filePath, options);
  }

  static readJsonFilesFromPathSync(filePath: string, options?: any): any[] {
    const result: any[] = [];
    glob.sync(filePath).forEach((file: any) => {
      const data = this.readJsonFileSync(file, options);
      result.push(data);
    });
    return result;
  }

  static writeJsonFileSync(filePath: string, object: any) {
    jsonfile.writeFileSync(filePath, object, { spaces: 2 });
  }

  static writeFileSync(filePath: string, content: string) {
    fs.writeFileSync(filePath, content);
  }

  static readFileSync(filePath: string, options?: any): Buffer {
    return fs.readFileSync(filePath, options);
  }

  static delete(patterns: any): Promise<any> {
    return del(patterns);
  }

  static copySync(sourcePath: string, destinationPath: string) {
    fs.copySync(sourcePath, destinationPath);
  }
}

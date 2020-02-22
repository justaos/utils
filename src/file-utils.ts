import * as fs from "fs-extra";
import * as glob from "glob";
import * as jsonfile from "jsonfile";


export function readJsonFileSync(file: any, options?: any) {
    return jsonfile.readFileSync(file, options);
}

export function readJsonFilesFromPathSync(path: any, options?: any) {
    let result: any[] = [];
    glob.sync(path).forEach((file: any) => {
        let data = readJsonFileSync(file, options);
        result.push(data);
    });
    return result;
}

export function writeJsonFileSync(file: any, obj: any) {
    return jsonfile.writeFileSync(file, obj, {spaces: 2});
}

export function writeFileSync(file: any, str: string) {
    return fs.writeFileSync(file, str);
}

export function readFileSync(file: any, options?: any) {
    return fs.readFileSync(file, options);
}

export function copySync(src: string, dest: string) {
    return fs.copySync(src, dest);
}

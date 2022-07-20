import { bcrypt } from "../deps.ts";

export default class HashUtils {
  static generateHash(data: string): string {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(8));
  }

  static validateHash(data: string, dataHash: string): boolean {
    return bcrypt.compareSync(data, dataHash);
  }
}
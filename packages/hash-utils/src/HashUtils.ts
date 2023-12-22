import { bcrypt, uuid } from "../deps.ts";

export default class HashUtils {
  static generateHash(data: string): string {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(8));
  }

  static validateHash(data: string, dataHash: string): boolean {
    return bcrypt.compareSync(data, dataHash);
  }

  static generateUUID(): string {
    return crypto.randomUUID();
  }

  static validateUUID(id: string): boolean {
    return uuid.validate(id);
  }
}

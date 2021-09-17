import { hash, verify } from "../deps.ts";

export default class HashUtils {
  static generateHash(data: string): string {
    return hash(data);
  }

  static validateHash(data: string, dataHash: string): boolean {
    return verify(data, dataHash);
  }
}
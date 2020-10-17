import * as bcrypt from 'bcryptjs';

// generating a hash
export function generateHash(data: string): string {
  return bcrypt.hashSync(data, bcrypt.genSaltSync(8));
}

// checking if hash is valid
export function validateHash(data: string, dataHash: string): boolean {
  return bcrypt.compareSync(data, dataHash);
}

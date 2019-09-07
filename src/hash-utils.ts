import * as bcrypt from "bcrypt";

// generating a hash
export function generateHash(data: string) {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(8));
}

// checking if hash is valid
export function validateHash(data: string, dataHash: string) {
    return bcrypt.compareSync(data, dataHash);
}

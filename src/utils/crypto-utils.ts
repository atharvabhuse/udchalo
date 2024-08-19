import * as CryptoJS from 'crypto-js';

// TODO: AshishG - This key should be read from process.env or next.config
const key = '6LdPnaUUAAAAAOGKCahXrh2qOaSlVC2n8M-ofXfV';

export function encryptWithCryptoJS(value: string): string {
  return CryptoJS.AES.encrypt(value, key).toString();
}

export function decryptWithCryptoJS(cipherText: string): string {
  const ucToken = CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
  return ucToken;
}

export default {
  encryptWithCryptoJS,
  decryptWithCryptoJS,
};

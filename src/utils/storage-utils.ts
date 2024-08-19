import { decryptWithCryptoJS, encryptWithCryptoJS } from './crypto-utils';

export function storeToLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function encryptAndStoreToLocalStorage(key: string, value: string): void {
  const cipherText = encryptWithCryptoJS(value);
  localStorage.setItem(key, cipherText);
}

export function retrieveFromLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

export function retrieveAndDecryptFromLocalStorage(key: string): string | null {
  const item = localStorage.getItem(key);
  return item ? decryptWithCryptoJS(item) : null;
}

export default {
  storeToLocalStorage,
  encryptAndStoreToLocalStorage,
  retrieveFromLocalStorage,
  retrieveAndDecryptFromLocalStorage,
};

import { decryptWithCryptoJS, encryptWithCryptoJS } from './crypto-utils';

export enum STORAGE {
  local,
  session,
}

const CUSTOM_LIB_KEY = 'udchalo-webstorage';
const CUSTOM_LIB_KEY_SEPARATOR = '|';
const CUSTOM_LIB_KEY_CASE_SENSITIVE: boolean = false;

export function getWebStorage(sType: STORAGE): Storage {
  let storage: Storage;
  switch (sType) {
    case STORAGE.local:
      storage = localStorage;
      break;
    case STORAGE.session:
      storage = sessionStorage;
      break;
    default:
      throw Error('invalid storage type');
  }
  return storage;
}

export function retrieveFromStorage(sType: STORAGE, sKey: string): unknown {
  let data: unknown;
  try {
    data = JSON.parse(getWebStorage(sType)?.getItem(sKey));
  } catch (err) {
    console.warn(`invalid value for ${sKey}`);
  }
  return data;
}

function formatKey(raw: string): string {
  const key = raw.toString();
  return CUSTOM_LIB_KEY_CASE_SENSITIVE ? key : key.toLowerCase();
}

function genKey(raw: string): string {
  if (typeof raw !== 'string') {
    throw Error('attempt to generate a storage key with a non string value');
  }
  return `${CUSTOM_LIB_KEY}${CUSTOM_LIB_KEY_SEPARATOR}${formatKey(raw)}`;
}

export function setToLocalStorage(key: string, value: any): void {
  const sKey = genKey(key);
  if (typeof window !== 'undefined') {
    getWebStorage(STORAGE.local)?.setItem(sKey, JSON.stringify(value));
  }
}

export function setToSessionStorage(key: string, value: string): void {
  const sKey = genKey(key);
  if (typeof window !== 'undefined') {
    getWebStorage(STORAGE.session)?.setItem(sKey, JSON.stringify(value));
  }
}

export function retriveValueFromLocalStorage(sKey: string, sType: STORAGE = STORAGE.local) {
  const data = retrieveFromStorage(sType, sKey);
  return data;
}

export function retriveValueFromSessionStorage(sKey: string, sType: STORAGE = STORAGE.session) {
  const data = retrieveFromStorage(sType, sKey);
  return data;
}

export function encryptAndSetToLocalStorage(key: string, value: string) {
  const cipherText = encryptWithCryptoJS(value);
  setToLocalStorage(cipherText, value);
}

export function getAndDecryptFromLocalStorage(key: string): string {
  const item: any = retriveValueFromLocalStorage(key);
  return item ? decryptWithCryptoJS(item) : null;
}

export function clearFromLocalStorage(sKey: string, sType: STORAGE = STORAGE.local): void {
  getWebStorage(sType)?.removeItem(sKey);
}

export function clearAll(): void {}

export default {
  getAndDecryptFromLocalStorage,
  encryptAndSetToLocalStorage,
  retriveValueFromSessionStorage,
  retriveValueFromLocalStorage,
  storeToLocalStorage: setToLocalStorage,
  storeToSessionStorage: setToSessionStorage,
  STORAGE,
};

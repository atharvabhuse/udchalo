import { UDCHALO_TOKEN } from './constants';
import { retrieveFromLocalStorage } from './storage-utils';

const getAccessToken = () => retrieveFromLocalStorage(UDCHALO_TOKEN) || '';

export { getAccessToken };

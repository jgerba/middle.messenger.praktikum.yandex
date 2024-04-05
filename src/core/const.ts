/* eslint no-shadow:0 */

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export enum POP_MSG {
  USER_ADD = 'User has been added to chat',
  USER_REMOVE = 'User has been removed from chat',
  CHAT_CREATE = 'Chat has been created',
  CHAT_DELETE = 'Chat has been deleted',
  IMG_UPDATE = 'Image has been updated',
  PSW_CHANGE = 'Password has been changed',
  USER_UPDATE = 'User data has been updated',
  USER_CREATE = 'User has been successfully created',
  USER_LOGIN = 'Successfully logged in',
  USER_LOGOUT = 'Successfully logged out',
  USER_REDIRECT = 'Redirected to messenger',
  GEO_FAIL = 'Unable to get geolocation',
}

export enum MSG {
  GEO = 'My coordinates are: ',
}

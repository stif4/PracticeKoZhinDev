export const URL_BASE = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const URL_REGISTER = '/auth/register';
export const URL_LOGIN = '/auth/login';
export const URL_REFRESH = '/auth/refresh';

export const URL_USER = '/user';
export const URL_AVATAR = '/user/avatar';

export const URL_FILE = '/file';

export const URL_MYPOST = '/post/my-feed';
export const URL_LIKEPOST = (id: number) => `/post/${id}/likes`;
//export const URL_IMGPOST = '/post/image';

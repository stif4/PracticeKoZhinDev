export const URL_BASE = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const URL_REGISTER = '/auth/register';
export const URL_LOGIN = '/auth/login';
export const URL_REFRESH = '/auth/refresh';

// export const URL_USER = '/user';
export const URL_USER_PIN_POST = '/user/pin-post';
export const URL_USER_UNPIN_POST = '/user/unpn-post';
export const URL_AVATAR = '/user/avatar';

const PATH_USER = '/user';
export const URL_USER = {
    DEFUALT: PATH_USER,
    PIN_POST: PATH_USER + '/pin-post',
    UNPIN_POST: PATH_USER + '/unpin-post',
    AVATAR: PATH_USER + '/avatar',
    SUBSCRIBE: (userId: number) => PATH_USER + `/${userId}/subscribe`,
};

export const URL_FILE = '/file';

const PATH_POST = '/post';
export const URL_POST = {
    DEFUALT: PATH_POST,
    MY_POSTS: PATH_POST + '/my-feed',
    POST_IMGT: PATH_POST + '/image',
    LIKEPOST: (postId: number) => PATH_POST + `/${postId}/likes`,
    COMMENT_CREATE: (postId: number) => PATH_POST + `/${postId}/comments`,
    COMMENT_DELITE: (postId: number, commentId: number) => PATH_POST + `/${postId}/comments/${commentId}`,
};

// export const URL_POST = '/post';
// export const URL_MYPOST = '/post/my-feed';
// export const URL_POST_IMG = '/post/image';
// export const URL_LIKEPOST = (id: number) => `/post/${id}/likes`;

export const URL_TAGS = '/tag/search';
//export const URL_IMGPOST = '/post/image';

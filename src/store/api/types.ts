//----// User //----//
export interface ISubscriptions {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    updateTime: string;
    createTime: string;
    avatarId: number | null;
    pinnedPostId: number | null;
    description: string | null;
}

export interface IUser {
    avatarId: number | null;
    createTime: Date;
    description: string | null;
    firstName: string;
    id: number;
    lastName: string;
    nickname: string;
    pinnedPostId: number | null;
    updateTime: Date;
}

export interface IUserById extends IUser {
    phone: string | null;
    email: string;
    subscriptions: ISubscriptions[];
}

export interface IUsersFetchQuery {
    page: number;
    lastName?: string;
    firstName?: string;
    nickname?: string;
}

//----// Auth //----//
export interface IGenericResponse {
    status: string;
    message: string;
}

export interface IResponceLogin {
    accessToken: string;
    refreshToken: string;
}

export interface IErrorResponse {
    message: string;
    statusCode: number;
    error: string;
}

export interface IJWTDecode {
    email: string;
    id: number;
    iat: number;
    exp: number;
}

//----// Post //----//
export interface ITag {
    id: string;
    title: string;
}
export interface ITagNormolaized {
    value: string;
    label: string;
    id: string;
}

export interface ICreator {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    phone: string | null;
    email: string;
    updateTime: Date;
    createTime: Date;
    avatarId: number | null;
    pinnedPostId: number | null;
    description: string | null;
}

export interface IPost {
    id: number;
    title: string;
    text: string;
    creatorId: number;
    likesCount: number;
    isLiked: boolean;
    creator: ICreator;
    tags: ITag[];
    imageId: number | null;
    createTime: Date;
    updateTime: Date;
}

export interface IPostById extends IPost {
    comments: IComment[];
}

export interface IPostTransform {
    id: number;
    title: string;
    text: string;
    creatorId: number;
    likesCount: number;
    isLiked: boolean;
    creator: ICreator;
    tags: ITag[];
    imageUrl: string | undefined;
    createTime: string;
    updateTime: string;
}

export interface IPostTransformById extends IPostTransform {
    comments: IComment[];
}

//----// Comment //----//

interface ICommentUser {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    updateTime: Date;
    createTime: Date;
    avatarId: number;
    pinnedPostId: number;
    description: string;
}

export interface IComment {
    id: number;
    text: string;
    userId: number;
    postId: number;
    createTime: Date;
    updateTime: Date;
    user?: ICommentUser[];
}

///// enums /////
export const enum EPositionLoading {
    UP = 'up',
    DOWN = 'down',
}

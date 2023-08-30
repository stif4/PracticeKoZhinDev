export interface ISubscriptions {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    updateTime: string;
    createTime: string;
    avatarId: number;
    pinnedPostId: number;
    description: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    phone: string;
    email: string;
    updateTime: string;
    createTime: string;
    avatarId: number;
    pinnedPostId: number;
    description: string;
    subscriptions: ISubscriptions[];
}

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
    status: string;
    error: string;
}

export interface IJWTDecode {
    email: string;
    id: number;
    iat: number;
    exp: number;
}

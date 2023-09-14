import {Omit} from '@reduxjs/toolkit/dist/tsHelpers';
import {TRegisterInput} from '../../shared/Forms/RegisterForm/RegisterForm';

//----// User //----//
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
    updateTime: Date;
    createTime: Date;
    avatarId: number;
    pinnedPostId: number;
    description: string;
    subscriptions: ISubscriptions[];
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
    status: string;
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
    title: string;
}
export interface ICreator {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    phone: string;
    email: string;
    updateTime: Date;
    createTime: Date;
    avatarId: number;
    pinnedPostId: number;
    description: string;
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

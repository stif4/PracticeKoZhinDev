import React from 'react';
import fetchService from './fetch.service';
import {IPost} from '../store/api/types';

export default function transformDataPosts() {
    const transformDate = (date: Date): string => new Date(date).toLocaleDateString();

    const getUrlImg = async (id: number): Promise<string> => {
        const url = await fetchService().fetchFile(id);
        return url;
    };

    const getTransformDataPosts = async (posts: IPost[]) => {
        const postsTransformed = await Promise.all(
            posts.map(async (post) => {
                const urlimg = post.imageId ? await getUrlImg(post.imageId) : undefined;
                return {
                    id: post.id,
                    title: post.title,
                    text: post.text,
                    creatorId: post.creatorId,
                    likesCount: post.likesCount,
                    isLiked: post.isLiked,
                    creator: JSON.parse(JSON.stringify(post.creator)),
                    tags: [...post.tags],
                    imageUrl: urlimg,
                    createTime: transformDate(post.createTime),
                    updateTime: transformDate(post.updateTime),
                };
            }),
        );
        return postsTransformed;
    };
    return {getTransformDataPosts};
}

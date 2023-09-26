import React from 'react';
import fetchService from '../service/fetch.service';
import {IPost, IPostTransform} from '../store/api/types';

export default function useTransformDataPosts(posts: IPost[] | undefined) {
    const [postsTransformed, setPostsTransformed] = React.useState<IPostTransform[] | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const transformDate = (date: Date): string => new Date(date).toLocaleDateString();

    const getUrlImg = async (id: number): Promise<string> => {
        const url = await fetchService().fetchFile(id);
        return url;
    };

    const getTransformDataPosts = async () => {
        try {
            if (posts) {
                const dataTransfrom = await Promise.all(
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
                setPostsTransformed(dataTransfrom);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (posts && posts.length) {
            setIsLoading(true);
            getTransformDataPosts();
        }
    }, [posts]);

    return {postsTransformed, isLoading, setPostsTransformed};
}

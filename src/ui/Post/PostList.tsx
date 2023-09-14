import React from 'react';
import {IPostTransform} from '../../store/api/types';
import Post from './Post';
import './PostList.scss';

interface IPostList {
    posts: IPostTransform[];
    withInformationBlock?: boolean;
}

export default function PostList({posts, withInformationBlock}: IPostList) {
    const getInformationBlock = (post: IPostTransform) => {
        if (withInformationBlock) {
            const {firstName, lastName, nickname} = post.creator;
            return {firstName, lastName, nickname};
        }
        return undefined;
    };

    return (
        <div className="PostList">
            <div className="PostList__container">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        postId={post.id}
                        informationBlock={getInformationBlock(post)}
                        urlImg={post.imageUrl}
                        title={post.title}
                        text={post.text}
                        tags={post.tags}
                        countLikes={post.likesCount}
                        isLiked={post.isLiked}
                        date={post.createTime}
                    />
                ))}
            </div>
        </div>
    );
}

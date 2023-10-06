import React from 'react';
import {IPostTransform} from '../../store/api/types';
import Post from './Post';
import './PostList.scss';

interface IPostListProps {
    posts: IPostTransform[] | null;
    withInformationBlock?: boolean;
    onEditPost?: (post: IPostTransform) => void;
    onPostIdShow?: (postId: number) => void;
}

export default function PostList({posts, withInformationBlock, onEditPost, onPostIdShow}: IPostListProps) {
    const getInformationBlock = (post: IPostTransform) => {
        if (withInformationBlock) {
            const {firstName, lastName, nickname} = post.creator;
            return {firstName, lastName, nickname};
        }
        return undefined;
    };

    if (posts === null) {
        return <></>;
    }

    return (
        <div className="PostList">
            <div className="PostList__container">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        informationBlock={getInformationBlock(post)}
                        postTransformed={post}
                        onEditPost={onEditPost}
                        onPostIdShow={onPostIdShow}
                    />
                ))}
            </div>
        </div>
    );
}

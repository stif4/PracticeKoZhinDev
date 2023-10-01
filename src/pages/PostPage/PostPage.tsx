import React from 'react';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import {useParams} from 'react-router-dom';
import {useGetPostByIdQuery} from '../../store/api/postApi';
import CommentBlock from '../../ui/Comment/CommentBlock';
import Post from '../../ui/Post/Post';
import SubscribeUser from '../../ui/SubscribeUser/SubscribeUser';
import ErrorPage from '../ErrorPage';
import {IErrorResponse} from '../../store/api/types';
import PostPageSkeleton from './PostPageSkeleton';
import './PostPage.scss';

interface IPostPageProps {
    postIdFromModal?: number;
}

const CLASS_NAME_CONTAINER_DEFUALT = 'postPage__container';
const CLASS_NAME_CONTAINER_M_TOP = 'postPage__container postPage__container_mTop';

export default function PostPage({postIdFromModal}: IPostPageProps) {
    const {id: postIdFromUrl} = useParams();

    const getQuery = () => {
        if (postIdFromModal) {
            return postIdFromModal;
        }
        if (postIdFromUrl) {
            return Number(postIdFromUrl);
        }
        return skipToken;
    };

    const {
        data: dataPost,
        isLoading: isLoadingPost,
        isFetching: isFetchingPost,
        isError: isErrorPost,
        error: errorPost,
        isSuccess: isSuccessPost,
    } = useGetPostByIdQuery(getQuery());

    if (isFetchingPost) {
        return <PostPageSkeleton />;
    }

    if (isErrorPost) {
        const error = errorPost as IErrorResponse;
        if (error.statusCode === 400) {
            return <ErrorPage />;
        }
    }

    const classNameContainer = postIdFromModal ? CLASS_NAME_CONTAINER_DEFUALT : CLASS_NAME_CONTAINER_M_TOP;

    return (
        <section className="postPage">
            <div className={classNameContainer}>
                <div className="postPage__post">
                    {dataPost && (
                        <Post
                            postTransformed={dataPost}
                            prefixClass="postPage__"
                            isPostPage
                            imgPostSqueeze
                            withoutCard
                        />
                    )}
                </div>
                <div className="postPage__creator">{dataPost && <SubscribeUser userId={dataPost.creatorId} />}</div>
                <div className="postPage__commentBlock">{dataPost && <CommentBlock post={dataPost} />}</div>
            </div>
        </section>
    );
}

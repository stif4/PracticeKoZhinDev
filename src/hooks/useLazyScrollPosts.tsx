import React from 'react';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {useGetPostsQuery} from '../store/api/postApi';
import {IPostTransform} from '../store/api/types';
import {getLastLikedPost} from '../store/features/userSuncks';

const INITIAL_CURRENT_PAGE = 1;

export default function useLazyScrollPosts(userId?: number, tags?: string) {
    const [posts, setPosts] = React.useState<IPostTransform[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(INITIAL_CURRENT_PAGE);
    const [isAll, setIsAll] = React.useState<boolean>(false);

    const {id: idPostLiked, isLiked} = useSelector(getLastLikedPost());

    const {
        isLoading: isLoadingPostsSlice,
        data: postsSlice,
        isSuccess: isSuccessPostsSlice,
        isError: isErrorPostsSlice,
        isFetching: isFetchingPostsSlice,
    } = useGetPostsQuery({userId, tags, page: currentPage});

    const resetPosts = () => {
        setPosts(null);
        setCurrentPage(INITIAL_CURRENT_PAGE);
        setIsAll(false);
    };

    React.useEffect(() => {
        resetPosts();
    }, [tags]);

    React.useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (scrolledToBottom && !isFetchingPostsSlice && !isAll) {
                setCurrentPage(currentPage + 1);
            }
        };
        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [currentPage, isFetchingPostsSlice]);

    React.useEffect(() => {
        if (posts) {
            const newPosts = posts.map((post) => {
                if (post.id === idPostLiked) {
                    if (isLiked) {
                        return {...JSON.parse(JSON.stringify(post)), likesCount: post.likesCount + 1, isLiked: true};
                    }
                    return {...JSON.parse(JSON.stringify(post)), likesCount: post.likesCount - 1, isLiked: false};
                }
                return {...JSON.parse(JSON.stringify(post))};
            });
            setPosts(newPosts);
        }
    }, [idPostLiked, isLiked]);

    React.useEffect(() => {
        if (postsSlice && postsSlice.length) {
            setPosts((prev) => {
                if (prev) {
                    return [...prev, ...postsSlice];
                }
                return postsSlice;
            });
        }
        if (postsSlice && !postsSlice.length) {
            setIsAll(true);
        }
    }, [postsSlice]);

    React.useEffect(() => {
        if (isErrorPostsSlice) {
            toast('Что то не так', {type: 'error'});
        }
    }, [isErrorPostsSlice]);

    return {posts, isLoading: isFetchingPostsSlice, resetPosts};
}

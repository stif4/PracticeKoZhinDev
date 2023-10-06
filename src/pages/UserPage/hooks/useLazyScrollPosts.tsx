import React from 'react';
import {toast} from 'react-toastify';
import {useGetPostsQuery} from '../../../store/api/postApi';
import {IPostTransform} from '../../../store/api/types';

const INITIAL_CURRENT_PAGE = 1;

export default function useLazyScrollPosts(userId: number) {
    const [posts, setPosts] = React.useState<IPostTransform[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(INITIAL_CURRENT_PAGE);
    const [isAll, setIsAll] = React.useState<boolean>(false);

    const {
        isLoading: isLoadingPostsSlice,
        data: postsSlice,
        isSuccess: isSuccessPostsSlice,
        isError: isErrorPostsSlice,
        isFetching: isFetchingPostsSlice,
    } = useGetPostsQuery({userId, page: currentPage});

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

    return {posts, isLoading: isFetchingPostsSlice};
}

import React from 'react';
import {useGetMyPostsQuery} from '../store/api/postApi';
import {EPositionLoading} from '../store/api/types';
import {getMyPosts} from '../store/features/userSuncks';
import {useAppSelector} from '../store/store';
import PostSkeleton from '../ui/Post/PostSkeleton';
import PostList from '../ui/Post';

const INITIAL_CURRENT_PAGE = 1;

export default function useScrollFetchngPost() {
    const [currentPage, setCurrentPage] = React.useState<number>(INITIAL_CURRENT_PAGE);
    const dataPosts = useAppSelector(getMyPosts());
    const {lodaing, userPosts, isAll} = dataPosts;

    const {isFetching: isFetchingPost} = useGetMyPostsQuery(currentPage, {skip: isAll});

    React.useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (scrolledToBottom && !isFetchingPost && !isAll) {
                setCurrentPage(currentPage + 1);
            }
        };
        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [currentPage, isFetchingPost]);

    const getPosts = () => (
        <>
            {lodaing.postion === EPositionLoading.UP && lodaing.isLoading && <PostSkeleton />}
            <PostList posts={userPosts} />
            {lodaing.postion === EPositionLoading.DOWN && (isFetchingPost || lodaing.isLoading) && <PostSkeleton marginTop="16px" />}
        </>
    );
    return {getPosts, userPosts};
}

import React from 'react';
import {useGetMyPostsQuery, useLazyGetPostByIdQuery} from '../../../store/api/postApi';
import {EPositionLoading, IPostTransform, IUser} from '../../../store/api/types';
import {getMyPosts} from '../../../store/features/userSuncks';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import PostSkeleton from '../../../ui/Post/PostSkeleton';
import PostList from '../../../ui/Post';
import {resetMyPosts, setPinPost} from '../../../store/features/userSlice';

const INITIAL_CURRENT_PAGE = 1;

export default function useLazyScrollPostsProfile(
    me: IUser | null,
    toggleEditPost: (post: IPostTransform) => any,
    handlePostIdShow: (postId: number) => void,
) {
    const [currentPage, setCurrentPage] = React.useState<number>(INITIAL_CURRENT_PAGE);

    const dataPosts = useAppSelector(getMyPosts());
    const {lodaing, userPosts, isAll} = dataPosts;

    const {isFetching: isFetchingPostList} = useGetMyPostsQuery(
        {page: currentPage, postPinId: me?.pinnedPostId},
        {skip: isAll, refetchOnMountOrArgChange: true},
    );
    const [getPostById, data] = useLazyGetPostByIdQuery();
    const {data: postPin, isFetching: isFetchingPostById} = data;
    const [withPin, setWithPin] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (scrolledToBottom && !lodaing.isLoading && !isFetchingPostList && !isAll) {
                setCurrentPage(currentPage + 1);
            }
        };
        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [currentPage, isFetchingPostList, lodaing]);

    React.useEffect(() => {
        if (me && me.pinnedPostId && me.pinnedPostId > 0 && !userPosts) {
            getPostById(me.pinnedPostId, true);
        }
    }, []);

    React.useEffect(() => {
        if (postPin && !lodaing.isLoading && !withPin && me) {
            if (postPin.creatorId === me.id) {
                dispatch(setPinPost(postPin));
                setWithPin(true);
            }
        }
    }, [postPin, lodaing, me]);

    const resetPosts = async () => {
        await dispatch(resetMyPosts());
    };

    React.useEffect(
        () => () => {
            resetPosts();
        },
        [],
    );

    const getPosts = () => (
        <>
            {lodaing.postion === EPositionLoading.UP && lodaing.isLoading && <PostSkeleton marginBottom="16px" />}
            {userPosts && (
                <PostList
                    posts={userPosts}
                    onEditPost={toggleEditPost}
                    onPostIdShow={handlePostIdShow}
                    withInformationBlock
                />
            )}
            {lodaing.postion === EPositionLoading.DOWN && (isFetchingPostById || isFetchingPostList || lodaing.isLoading) && (
                <PostSkeleton marginTop="16px" />
            )}
        </>
    );
    return {getPosts, userPosts};
}

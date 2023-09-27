import React from 'react';
import {IPostTransform} from '../../../store/api/types';
import ProfilePaperSlideEditPost from '../modal/ProfilePaperSlideEditPost';

export default function useEditPost() {
    const [isActivePaperSlideEditPost, setIsActivePaperSlideEditPost] = React.useState<boolean>(false);
    const [postEdit, setPostEdit] = React.useState<IPostTransform>();

    const toggleEditPost = () => {
        setIsActivePaperSlideEditPost((prev) => !prev);
    };

    const handleEditPost = (post: IPostTransform) => {
        setPostEdit(post);
        toggleEditPost();
    };

    const getEditPostModal = () => (
        <ProfilePaperSlideEditPost
            isActive={isActivePaperSlideEditPost}
            toggleEditPost={toggleEditPost}
            post={postEdit}
        />
    );

    return {handleEditPost, getEditPostModal, postEdit};
}

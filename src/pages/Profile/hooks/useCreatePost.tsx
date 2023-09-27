import React from 'react';
import ProfilePaperSlideCreatePost from '../modal/ProfilePaperSlideCreatePost';

export default function useCreatePost() {
    const [isActivePaperSlideCreatePost, setIsActivePaperSlideCreatePost] = React.useState<boolean>(false);

    const toggleCreatePost = () => {
        setIsActivePaperSlideCreatePost((prev) => !prev);
    };
    const getCreatePostModal = () => (
        <ProfilePaperSlideCreatePost
            isActive={isActivePaperSlideCreatePost}
            toggleCreatePost={toggleCreatePost}
        />
    );

    return {toggleCreatePost, getCreatePostModal};
}

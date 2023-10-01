import React from 'react';
import ProfilePaperSlideCreatePost from '../modal/ProfilePaperSlideCreatePost';

export default function useCreatePost() {
    const [isActive, setIsActive] = React.useState<boolean>(false);

    const toggleCreatePost = () => {
        setIsActive((prev) => !prev);
    };
    const getCreatePostModal = () => (
        <ProfilePaperSlideCreatePost
            isActive={isActive}
            toggleCreatePost={toggleCreatePost}
        />
    );

    return {toggleCreatePost, getCreatePostModal};
}

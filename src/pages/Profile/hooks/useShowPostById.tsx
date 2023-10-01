import React from 'react';
import PaperSlidePostByIdShow from '../modal/PaperSlidePostByIdShow';

export default function useShowPostById() {
    const [postId, setPostId] = React.useState<number | null>(null);
    const [isActive, setIsActive] = React.useState<boolean>(false);

    const toggleActive = () => {
        setIsActive((prev) => {
            if (prev) {
                setTimeout(() => {
                    setPostId(null);
                }, 1000);
            }
            return !prev;
        });
    };

    const handlePostIdShow = (id: number) => {
        setPostId(id);
        toggleActive();
    };

    const getPostByIdModal = () => (
        <PaperSlidePostByIdShow
            togglePostByIdShow={toggleActive}
            postId={postId}
            isActive={isActive}
        />
    );

    return {getPostByIdModal, handlePostIdShow};
}

import React from 'react';
import SlidePaper from '../SlidePaper';
import BackButton from '../../../ui/Button/BackButton/BackButton';
import PostPage from '../../../pages/PostPage';
import './PaperSlidePostByIdShow.scss';

interface IPaperSlidePostByIdShowProps {
    isActive: boolean;
    postId: number | null;
    togglePostByIdShow: () => void;
}

export default function PaperSlidePostByIdShow({isActive, togglePostByIdShow, postId}: IPaperSlidePostByIdShowProps) {
    return (
        <SlidePaper isActive={isActive}>
            <div className="PaperSlidePostByIdShow">
                <div className="PaperSlidePostByIdShow__container">
                    <div className="PaperSlidePostByIdShow__button">
                        <BackButton onClick={togglePostByIdShow} />
                    </div>
                    {postId && <PostPage postIdFromModal={postId} />}
                </div>
            </div>
        </SlidePaper>
    );
}

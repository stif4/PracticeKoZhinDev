import React from 'react';
import CreatePostForm from '../../../shared/Forms/CreatePostForm';
import SlidePaper from '../../../shared/Modal/SlidePaper';
import BackButton from '../../../ui/Button/BackButton/BackButton';
import PostPage from '../../PostPage';
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

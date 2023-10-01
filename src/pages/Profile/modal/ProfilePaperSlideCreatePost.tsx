import React from 'react';
import CreatePostForm from '../../../shared/Forms/CreatePostForm';
import SlidePaper from '../../../shared/Modal/SlidePaper';
import BackButton from '../../../ui/Button/BackButton/BackButton';
import './ProfilePaperSlideCreatePost.scss';

interface IProfilePaperSlideCreatePostProps {
    isActive: boolean;
    toggleCreatePost: () => void;
}

export default function ProfilePaperSlideCreatePost({isActive, toggleCreatePost}: IProfilePaperSlideCreatePostProps) {
    return (
        <SlidePaper isActive={isActive}>
            <div className="ProfilePaperSlideCreatePost">
                <div className="ProfilePaperSlideCreatePost__container">
                    <div className="ProfilePaperSlideCreatePost__button">
                        <BackButton onClick={toggleCreatePost} />
                    </div>
                    <div className="ProfilePaperSlideCreatePost__title">Добавить пост</div>
                    <CreatePostForm closeForm={toggleCreatePost} />
                </div>
            </div>
        </SlidePaper>
    );
}

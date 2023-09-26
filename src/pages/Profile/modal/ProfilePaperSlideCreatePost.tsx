import React from 'react';
import CreatePostForm from '../../../shared/Forms/CreatePostForm';
import SlidePaper from '../../../shared/Modal/SlidePaper';
import Button from '../../../ui/Button';
import './ProfilePaperSlideCreatePost.scss';

interface IProfilePaperSlideCreatePostProps {
    isActive: boolean;
    toggleCreatePost: () => void;
}

const CLASS_BUTTON = 'Button__main_empty Button__main_empty_colorGray Button__main_medium Button__main_empty_colorGray_medium_withoutBorder';

export default function ProfilePaperSlideCreatePost({isActive, toggleCreatePost}: IProfilePaperSlideCreatePostProps) {
    return (
        <SlidePaper isActive={isActive}>
            <div className="ProfilePaperSlideCreatePost">
                <div className="ProfilePaperSlideCreatePost__container">
                    <div className="ProfilePaperSlideCreatePost__button">
                        <Button
                            label="Назад"
                            className={CLASS_BUTTON}
                            icon="./icons/expandleft.svg"
                            labelColor="#00000099"
                            onClick={toggleCreatePost}
                        />
                    </div>
                    <div className="ProfilePaperSlideCreatePost__title">Добавить пост</div>
                    <CreatePostForm closeForm={toggleCreatePost} />
                </div>
            </div>
        </SlidePaper>
    );
}

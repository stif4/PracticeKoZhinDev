import React from 'react';
import EditPostForm from '../../../shared/Forms/EditPostForm';
import SlidePaper from '../../../shared/Modal/SlidePaper';
import {IPostTransform} from '../../../store/api/types';
import Button from '../../../ui/Button';
import './ProfilePaperSlideEditPost.scss';

interface IProfilePaperSlideCreatePostProps {
    isActive: boolean;
    toggleEditPost: () => void;
    post: IPostTransform | undefined;
}

const CLASS_BUTTON = 'Button__main_empty Button__main_empty_colorGray Button__main_medium Button__main_empty_colorGray_medium_withoutBorder';

export default function ProfilePaperSlideEditPost({isActive, toggleEditPost, post}: IProfilePaperSlideCreatePostProps) {
    return (
        <SlidePaper isActive={isActive}>
            <div className="ProfilePaperSlideEditPost">
                <div className="ProfilePaperSlideEditPost__container">
                    <div className="ProfilePaperSlideEditPost__button">
                        <Button
                            label="Назад"
                            className={CLASS_BUTTON}
                            icon="./icons/expandleft.svg"
                            labelColor="#00000099"
                            onClick={toggleEditPost}
                        />
                    </div>
                    <div className="ProfilePaperSlideEditPost__title">Редактировать пост</div>
                    {post && (
                        <EditPostForm
                            closeForm={toggleEditPost}
                            post={post}
                        />
                    )}
                </div>
            </div>
        </SlidePaper>
    );
}

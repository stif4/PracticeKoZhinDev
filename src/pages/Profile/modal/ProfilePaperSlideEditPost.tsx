import React from 'react';
import EditPostForm from '../../../shared/Forms/EditPostForm';
import SlidePaper from '../../../shared/Modal/SlidePaper';
import {IPostTransform} from '../../../store/api/types';
import BackButton from '../../../ui/Button/BackButton/BackButton';
import './ProfilePaperSlideEditPost.scss';

interface IProfilePaperSlideCreatePostProps {
    isActive: boolean;
    toggleEditPost: () => void;
    post: IPostTransform | undefined;
}

export default function ProfilePaperSlideEditPost({isActive, toggleEditPost, post}: IProfilePaperSlideCreatePostProps) {
    return (
        <SlidePaper isActive={isActive}>
            <div className="ProfilePaperSlideEditPost">
                <div className="ProfilePaperSlideEditPost__container">
                    <div className="ProfilePaperSlideEditPost__button">
                        <BackButton onClick={toggleEditPost} />
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

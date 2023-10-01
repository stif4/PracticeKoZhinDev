import React from 'react';
import UpdateUserForm from '../../../shared/Forms/UpdateUserForm';
import SlidePaper from '../../../shared/Modal/SlidePaper';
import BackButton from '../../../ui/Button/BackButton/BackButton';
import './ProfilePaperSlideEdit.scss';

interface IProfilePaperSlideProps {
    isActive: boolean;
    toggleEditProffile: () => void;
}

export default function ProfilePaperSlideEdit({isActive, toggleEditProffile}: IProfilePaperSlideProps) {
    return (
        <SlidePaper isActive={isActive}>
            <div className="ProfilePaperSlideEdit">
                <div className="ProfilePaperSlideEdit__container">
                    <div className="ProfilePaperSlideEdit__button">
                        <BackButton onClick={toggleEditProffile} />
                    </div>
                    <UpdateUserForm closeForm={toggleEditProffile} />
                </div>
            </div>
        </SlidePaper>
    );
}

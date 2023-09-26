import React from 'react';
import UpdateUserForm from '../../../shared/Forms/UpdateUserForm';
import SlidePaper from '../../../shared/Modal/SlidePaper';
import Button from '../../../ui/Button';
import './ProfilePaperSlideEdit.scss';

interface IProfilePaperSlideProps {
    isActive: boolean;
    toggleEditProffile: () => void;
}

const CLASS_BUTTON = 'Button__main_empty Button__main_empty_colorGray Button__main_medium Button__main_empty_colorGray_medium_withoutBorder';

export default function ProfilePaperSlideEdit({isActive, toggleEditProffile}: IProfilePaperSlideProps) {
    return (
        <SlidePaper isActive={isActive}>
            <div className="ProfilePaperSlideEdit">
                <div className="ProfilePaperSlideEdit__container">
                    <div className="ProfilePaperSlideEdit__button">
                        <Button
                            label="Назад"
                            className={CLASS_BUTTON}
                            icon="./icons/expandleft.svg"
                            labelColor="#00000099"
                            onClick={toggleEditProffile}
                        />
                    </div>
                    <UpdateUserForm closeForm={toggleEditProffile} />
                </div>
            </div>
        </SlidePaper>
    );
}

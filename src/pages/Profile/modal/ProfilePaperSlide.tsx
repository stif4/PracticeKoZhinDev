import React from 'react';
import UpdateUserForm from '../../../shared/Forms/UpdateUserForm';
import SlidePaper from '../../../shared/Modal/SlidePaper';
import Button from '../../../ui/Button';
import './ProfilePaperSlide.scss';

interface IProfilePaperSlide {
    isActive: boolean;
    toggleEditProffile: () => void;
}

const CLASS_BUTTON = 'Button__main_empty Button__main_empty_colorGray Button__main_medium Button__main_empty_colorGray_medium_withoutBorder';

export default function ProfilePaperSlide({isActive, toggleEditProffile}: IProfilePaperSlide) {
    return (
        <SlidePaper isActive={isActive}>
            <div className="ProfilePaperSlide">
                <div className="ProfilePaperSlide__container">
                    <div className="ProfilePaperSlide__Button">
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

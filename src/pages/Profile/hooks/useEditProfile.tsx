import React from 'react';
import {toast} from 'react-toastify';
import ProfilePaperSlideEdit from '../modal/ProfilePaperSlideEdit';

export default function useEditProfile() {
    const [isActive, setIsActive] = React.useState<boolean>(false);

    const toggleEditProffile = () => {
        setIsActive((prev) => !prev);
    };

    const getProfileEditModal = () => (
        <ProfilePaperSlideEdit
            isActive={isActive}
            toggleEditProffile={toggleEditProffile}
        />
    );

    return {toggleEditProffile, getProfileEditModal};
}

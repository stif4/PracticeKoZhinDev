import React from 'react';
import {toast} from 'react-toastify';
import ProfilePaperSlideEdit from '../modal/ProfilePaperSlideEdit';

export default function useEditProfile() {
    const [isActivePaperSlideEdit, setIsActivePaperSlideEdit] = React.useState<boolean>(false);

    const toggleEditProffile = () => {
        setIsActivePaperSlideEdit((prev) => !prev);
    };

    const getProfileEditModal = () => (
        <ProfilePaperSlideEdit
            isActive={isActivePaperSlideEdit}
            toggleEditProffile={toggleEditProffile}
        />
    );

    return {toggleEditProffile, getProfileEditModal};
}

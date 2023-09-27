import React from 'react';
import {toast} from 'react-toastify';
import {useDeleteUserMutation} from '../../../store/api/userApi';
import ProfileModal from '../modal/ProfileModal';

export default function useDeliteProfile() {
    const [isActiveModalDelite, setActiveModalDelite] = React.useState<boolean>(false);

    const [deleteUser] = useDeleteUserMutation();

    const handelDelete = async () => {
        try {
            await deleteUser(null);
            toast('Акаунт успешно удален', {type: 'success'});
        } catch (error) {
            toast('Что то пошло ни так', {type: 'error'});
            console.log(error);
        }
    };

    const toggleModalDelite = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setActiveModalDelite((prev) => !prev);
    };

    const getProfileDeliteModal = () => (
        <ProfileModal
            onActive={toggleModalDelite}
            isActive={isActiveModalDelite}
            onDelite={handelDelete}
        />
    );

    return {getProfileDeliteModal, toggleModalDelite};
}

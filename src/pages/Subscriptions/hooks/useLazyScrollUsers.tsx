import React from 'react';
import {toast} from 'react-toastify';
import useDebounce from '../../../hooks/useDebounce';
import {IUser} from '../../../store/api/types';
import {useLazyGetUsersQuery} from '../../../store/api/userApi';
import InputSeartch from '../../../ui/Input/InputSeartch/InputSeartch';

const INITIAL_CURRENT_PAGE = 1;

export default function useLazyScrollUsers() {
    const [users, setUsers] = React.useState<IUser[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(INITIAL_CURRENT_PAGE);
    const [isAll, setIsAll] = React.useState<boolean>(false);

    const [getUsers, dataUsers] = useLazyGetUsersQuery();
    const {isFetching: isFetchingUserList, data: userList, isError: isErrorUserList, error: errorUserList, isSuccess: isSuccessUserList} = dataUsers;

    const [querySeartch, setQyerySeartch] = React.useState<string>('');
    const queryDebounced = useDebounce(querySeartch, 800);

    const handleChangeQuerySeartch = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        setQyerySeartch(value);
        setUsers(null);
    };

    const handleResetQuerySeartch = () => {
        setQyerySeartch('');
    };

    const handleResetUser = () => {
        setUsers(null);
        setIsAll(false);
        setCurrentPage(INITIAL_CURRENT_PAGE);
    };

    React.useEffect(() => {
        getUsers({querySeartch, page: currentPage});
    }, [queryDebounced, currentPage]);

    React.useEffect(() => {
        handleResetUser();
    }, [queryDebounced]);

    React.useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (scrolledToBottom && !isFetchingUserList && !isAll) {
                setCurrentPage(currentPage + 1);
            }
        };
        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [currentPage, isFetchingUserList]);

    React.useEffect(() => {
        if (userList && userList.length) {
            setUsers((prev) => {
                if (prev) {
                    return [...prev, ...userList];
                }
                return userList;
            });
        }
        if (userList && !userList.length) {
            setIsAll(true);
        }
    }, [userList]);

    React.useEffect(() => {
        if (isErrorUserList) {
            toast('Что то не так', {type: 'error'});
        }
    }, [isErrorUserList]);

    const getInputSeartch = () => (
        <InputSeartch
            onChange={handleChangeQuerySeartch}
            onReset={handleResetQuerySeartch}
            value={querySeartch}
        />
    );

    return {users, isLoading: isFetchingUserList, getInputSeartch};
}

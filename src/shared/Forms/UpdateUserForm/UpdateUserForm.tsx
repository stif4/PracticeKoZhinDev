import React from 'react';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useValidate} from '../../../hooks/useValidate';
import {IErrorResponse} from '../../../store/api/types';
import {useUpdateUserMutation} from '../../../store/api/userApi';
import {getMe, getUrlAvatar, logOut} from '../../../store/features/userSuncks';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import Button from '../../../ui/Button';
import Error from '../../../ui/Error';
import FileLoder from '../../../ui/FileLoader/FileLoader';
import Input from '../../../ui/Input';
import TextArea from '../../../ui/TextArea';
import {validateEmail, validatelastName, validateStringIsEmpty} from '../../../utils/schimsValidate';
import {IError} from '../types';
import './UpdateUserForm.scss';

interface IUserUpdate {
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
    description: string | null;
}

export interface IUserUpdateSent {
    email?: string;
    firstName?: string;
    lastName?: string;
    nickname?: string;
    description?: string;
    avatar?: FormData;
}

const UPDATE_DATA_INITAIL = {
    email: '',
    firstName: '',
    lastName: '',
    nickname: '',
    description: '',
};

const SCHEMA_REGISTER = yup.object().shape({
    email: validateEmail,
    nickname: validateStringIsEmpty,
    firstName: validateStringIsEmpty,
    lastName: validatelastName,
});

interface IUpdateUserFormProps {
    closeForm: () => void;
}

export default function UpdateUserForm({closeForm}: IUpdateUserFormProps) {
    const [dataUpdate, setDataUpdate] = React.useState<IUserUpdate>(UPDATE_DATA_INITAIL);
    const me = useAppSelector(getMe());
    const avatarURL = useAppSelector(getUrlAvatar());
    const [isValid, errorsValidate, checkValid, isCheckValid] = useValidate<IUserUpdate>(dataUpdate, SCHEMA_REGISTER);
    const [uploadedFile, setUploadedFile] = React.useState<FormData | null>(null);
    const [updateUser, {isLoading, isError: isErrorUpdate, error: errorServer, isSuccess: isSuccessUpdate}] = useUpdateUserMutation();
    const [isEmailChanged, setIsEmailChanged] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setDataUpdate((prev) => ({...prev, [name]: value}));
    };

    const handleResetDataUpdateValue = (name: string) => {
        setDataUpdate((prev) => ({...prev, [name]: ''}));
    };

    const getDataToSent = (): IUserUpdateSent => {
        const dataSent: IUserUpdateSent = {};
        for (const property in dataUpdate) {
            if (Object.hasOwn(dataUpdate, property) && me) {
                const valueUpdate = dataUpdate[property as keyof IUserUpdate];
                const valueCurrent = me[property as keyof IUserUpdate];
                if (valueUpdate !== valueCurrent) {
                    if (valueUpdate) {
                        dataSent[property as keyof IUserUpdate] = valueUpdate;
                    }
                }
            }
        }
        if (uploadedFile) {
            dataSent.avatar = uploadedFile;
        }
        return dataSent;
    };

    const handleSubbmit = async (e: React.MouseEvent<HTMLElement>) => {
        if (e) {
            e.preventDefault();
            const isValidated = await checkValid();
            if (isValidated) {
                const dataSent = getDataToSent();
                await updateUser(dataSent);
                if (dataSent.email) {
                    setIsEmailChanged(true);
                }
            }
        }
    };

    const logout = async () => {
        try {
            if (isEmailChanged) {
                await dispatch(logOut());
                toast('Email обновлен. Войдите в систему', {type: 'success'});
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (isSuccessUpdate) {
            if (isEmailChanged) {
                logout();
                toast('Email обновлен. Войдите в систему', {type: 'success'});
            }
            toast('Данные успешно обновленны', {type: 'success'});
            closeForm();
        }
    }, [isSuccessUpdate]);

    React.useEffect(() => {
        if (isErrorUpdate) {
            toast('Произошла ошибка', {type: 'error'});
        }
    }, [isErrorUpdate]);

    const handleUploadFile = (file: FormData | null) => {
        setUploadedFile(file);
    };

    const getErrorMessage = () => {
        if (errorsValidate) {
            const keysListError = Object.keys(errorsValidate);
            const lastKey = keysListError[keysListError.length - 1];
            const lastError = (errorsValidate as IError)[lastKey];
            return lastError !== undefined ? lastError : '';
        }
        if (errorServer) {
            const errServe = errorServer as IErrorResponse;
            return errServe.message;
        }
        return '';
    };

    React.useEffect(() => {
        if (isCheckValid) {
            checkValid();
        }
    }, [dataUpdate]);

    React.useEffect(() => {
        if (me) {
            const initialData = {
                email: me?.email,
                firstName: me?.firstName,
                lastName: me?.lastName,
                nickname: me?.nickname,
                description: me?.description,
            };
            setDataUpdate(initialData);
        }
    }, [me]);

    if (isLoading && !me && !avatarURL) {
        return <div>Loading...</div>;
    }

    return (
        <form className="UpdateUserForm">
            <div className="UpdateUserForm__container">
                <div className="UpdateUserForm__input">
                    <Input
                        label="Имя"
                        onChange={handleChange}
                        onReset={handleResetDataUpdateValue}
                        name="firstName"
                        error={Boolean(errorsValidate?.firstName)}
                        id="firstName-UpdateUserForm-id"
                        value={dataUpdate.firstName}
                        placeholder="Введите имя"
                    />
                </div>
                <div className="UpdateUserForm__input">
                    <Input
                        label="Фамилия"
                        onChange={handleChange}
                        onReset={handleResetDataUpdateValue}
                        name="lastName"
                        error={Boolean(errorsValidate?.lastName)}
                        id="lastName-UpdateUserForm-id"
                        value={dataUpdate.lastName}
                        placeholder="Введите фамилию"
                    />
                </div>
                <div className="UpdateUserForm__input">
                    <Input
                        label="Nickname"
                        onChange={handleChange}
                        onReset={handleResetDataUpdateValue}
                        name="nickname"
                        error={Boolean(errorsValidate?.nickname)}
                        id="nickname-UpdateUserForm-id"
                        value={dataUpdate.nickname}
                        placeholder="Введите Nickname"
                    />
                </div>
                <div className="UpdateUserForm__input">
                    <Input
                        label="Email"
                        onChange={handleChange}
                        onReset={handleResetDataUpdateValue}
                        name="email"
                        error={Boolean(errorsValidate?.email)}
                        id="email-UpdateUserForm-id"
                        value={dataUpdate.email}
                        placeholder="Введите Email"
                    />
                </div>
                <div className="UpdateUserForm__fileLoader">
                    <FileLoder
                        onUploadFile={handleUploadFile}
                        fileURLDefualt={avatarURL.urlAvatar}
                        label="Фото профиля"
                        isClear={!avatarURL.urlAvatar}
                    />
                </div>
                <div className="UpdateUserForm__textArea">
                    <TextArea
                        onChange={handleChange}
                        value={dataUpdate?.description ? dataUpdate?.description : ''}
                        name="description"
                        id="description-UpdateUserForm-id"
                        placeholder="Расскажи о себе"
                        label="Описание профиля"
                        onReset={handleResetDataUpdateValue}
                    />
                </div>
                <div className="UpdateUserForm__button">
                    <Button
                        label="Сохранить"
                        onClick={handleSubbmit}
                    />
                </div>
                {(!isValid || isErrorUpdate) && (
                    <div className="UpdateUserForm__error">
                        <Error message={getErrorMessage()} />
                    </div>
                )}
            </div>
        </form>
    );
}

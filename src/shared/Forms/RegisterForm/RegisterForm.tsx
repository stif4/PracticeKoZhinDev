import React from 'react';
import * as yup from 'yup';
import Button from '../../../ui/Button/Button';
import Error from '../../../ui/Error';
import FileLoder from '../../../ui/FileLoader/FileLoader';
import Input from '../../../ui/Input';
import TextArea from '../../../ui/TextArea';
import {validateEmail, validatelastName, validatePassword, validateStringIsEmpty} from '../../../utils/schimsValidate';
import {useValidate} from '../../../hooks/useValidate';
import './RegisterForm.scss';
import {useRegisterMutation} from '../../../store/api/authApi';
import {IErrorResponse} from '../../../store/api/types';
import {IError, IImg} from '../types';

const REGISTER_DATA_INITAIL = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    nickname: '',
    description: '',
};

const SCHEMA_REGISTER = yup.object().shape({
    password: validatePassword,
    email: validateEmail,
    nickname: validateStringIsEmpty,
    firstName: validateStringIsEmpty,
    lastName: validatelastName,
});

interface IDataRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nickname: string;
    description: string;
}

export type TRegisterInput = IDataRegister & IImg;

export default function RegisterForm() {
    const [dataRegister, setDataRegister] = React.useState<IDataRegister>(REGISTER_DATA_INITAIL);
    const [isValid, errorsValidate, checkValid, isCheckValid] = useValidate<IDataRegister>(dataRegister, SCHEMA_REGISTER);
    const [uploadedFile, setUploadedFile] = React.useState<FormData | null>(null);
    const [register, {isLoading, isError, error: errorServer, isSuccess}] = useRegisterMutation();

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setDataRegister((prev) => ({...prev, [name]: value}));
    };

    const handleResetDataRegisterValue = (name: string) => {
        setDataRegister((prev) => ({...prev, [name]: ''}));
    };

    const handleSubbmit = async (e: React.MouseEvent<HTMLElement>) => {
        if (e) {
            e.preventDefault();
            const isValidated = await checkValid();
            if (isValidated) {
                try {
                    await register({...dataRegister, img: uploadedFile});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

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
    }, [dataRegister]);

    return (
        <form className="RegisterForm">
            <div className="RegisterForm__container">
                <div className="RegisterForm__input">
                    <Input
                        label="Имя"
                        onChange={handleChange}
                        onReset={handleResetDataRegisterValue}
                        name="firstName"
                        error={Boolean(errorsValidate?.firstName)}
                        id="firstName-Registerform-id"
                        value={dataRegister.firstName}
                        placeholder="Введите имя"
                    />
                </div>
                <div className="RegisterForm__input">
                    <Input
                        label="Фамилия"
                        onChange={handleChange}
                        onReset={handleResetDataRegisterValue}
                        name="lastName"
                        error={Boolean(errorsValidate?.lastName)}
                        id="lastName-Registerform-id"
                        value={dataRegister.lastName}
                        placeholder="Введите фамилию"
                    />
                </div>
                <div className="RegisterForm__input">
                    <Input
                        label="Nickname"
                        onChange={handleChange}
                        onReset={handleResetDataRegisterValue}
                        name="nickname"
                        error={Boolean(errorsValidate?.nickname)}
                        id="nickname-Registerform-id"
                        value={dataRegister.nickname}
                        placeholder="Введите Nickname"
                    />
                </div>
                <div className="RegisterForm__input">
                    <Input
                        label="Email"
                        onChange={handleChange}
                        onReset={handleResetDataRegisterValue}
                        name="email"
                        error={Boolean(errorsValidate?.email)}
                        id="email-Registerform-id"
                        value={dataRegister.email}
                        placeholder="Введите Email"
                    />
                </div>
                <div className="RegisterForm__input">
                    <Input
                        label="Пароль"
                        onChange={handleChange}
                        onReset={handleResetDataRegisterValue}
                        name="password"
                        error={Boolean(errorsValidate?.password)}
                        id="password-Registerform-id"
                        type="password"
                        value={dataRegister.password}
                        withProgress
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="RegisterForm__fileLoader">
                    <FileLoder
                        onUploadFile={handleUploadFile}
                        label="Фото профиля"
                    />
                </div>
                <div className="RegisterForm__textArea">
                    <TextArea
                        onChange={handleChange}
                        value={dataRegister.description}
                        name="description"
                        id="description-Registerform-id"
                        placeholder="Расскажи о себе"
                        label="Описание профиля"
                        onReset={handleResetDataRegisterValue}
                    />
                </div>
                <div className="RegisterForm__button">
                    <Button
                        label="Войти"
                        onClick={handleSubbmit}
                    />
                </div>
                {(!isValid || isError) && (
                    <div className="RegisterForm__error">
                        <Error
                            place="register"
                            message={getErrorMessage()}
                        />
                    </div>
                )}
            </div>
        </form>
    );
}

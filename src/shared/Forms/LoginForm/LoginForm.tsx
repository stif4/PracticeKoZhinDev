import React from 'react';
import * as yup from 'yup';
import Button from '../../../ui/Button/Button';
import CheckBox from '../../../ui/CheckBox/CheckBox';
import Error from '../../../ui/Error';
import Input from '../../../ui/Input';
import {validateEmail, validatePassword} from '../../../utils/schimsValidate';
import {useValidate} from '../../../hooks/useValidate';
import './LoginForm.scss';
import {useLoginMutation} from '../../../store/api/authApi';
import {IErrorResponse} from '../../../store/api/types';
import {IError} from '../types';

const PATH_ICON_FILL = '/icons/checkbox.svg';
const PATH_ICON_EMPTY = '/icons/checkboxEmpty.svg';
const PATH_ICONS = [PATH_ICON_EMPTY, PATH_ICON_FILL];

const LOGIN_DATA_INITIAL = {
    email: '',
    password: '',
};

const SCHEMA_LOGIN = yup.object().shape({
    email: validateEmail,
    password: validatePassword,
});
interface IDataLogin {
    email: string;
    password: string;
}

export type TCheck = 'checked' | 'unchecked';
export enum ECheck {
    checked = 'checked',
    unchecked = 'unchecked',
}

export type TLoginInput = {remember: TCheck} & IDataLogin;

export default function LoginForm() {
    const [dataLogin, setDataLogin] = React.useState<IDataLogin>(LOGIN_DATA_INITIAL);
    const [isValid, errorsValidate, checkValid, isCheckValid] = useValidate<IDataLogin>(dataLogin, SCHEMA_LOGIN);
    const [remember, setRemember] = React.useState<TCheck>(ECheck.checked);
    const [login, {isLoading, isError, error: errorServer, isSuccess}] = useLoginMutation();

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e.currentTarget.id as TCheck;
        setRemember(id === ECheck.checked ? ECheck.unchecked : ECheck.checked);
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setDataLogin((prev) => ({...prev, [name]: value}));
    };

    const handleResetDataRegisterValue = (name: string) => {
        setDataLogin((prev) => ({...prev, [name]: ''}));
    };

    const handleSubbmit = async (e: React.MouseEvent<HTMLElement>) => {
        if (e) {
            e.preventDefault();
            const isValidated = await checkValid();
            if (isValidated) {
                try {
                    await login({...dataLogin, remember});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    const getIsError = () => (isError ? true : Boolean(errorsValidate && Object.keys(errorsValidate)));

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
    }, [dataLogin]);

    return (
        <form className="LoginForm">
            <div className="LoginForm__container">
                <div className="LoginForm__input">
                    <Input
                        label="Email"
                        onChange={handleChange}
                        onReset={handleResetDataRegisterValue}
                        name="email"
                        id="email-loginForm-id"
                        value={dataLogin.email}
                        error={getIsError()}
                        placeholder="Введите Email"
                    />
                </div>
                <div className="LoginForm__input">
                    <Input
                        label="Пароль"
                        onChange={handleChange}
                        onReset={handleResetDataRegisterValue}
                        name="password"
                        id="password-loginForm-id"
                        type="password"
                        error={getIsError()}
                        value={dataLogin.password}
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="LoginForm__checkBox">
                    <CheckBox
                        onClick={onClick}
                        label="Запомни меня"
                        value={remember}
                        pathsIcons={PATH_ICONS}
                    />
                </div>
                <div className="LoginForm__button">
                    <Button
                        label="Войти"
                        className=""
                        onClick={handleSubbmit}
                    />
                </div>
                {(!isValid || isError) && (
                    <div className="LoginForm__error">
                        <Error
                            place="login"
                            message={getErrorMessage()}
                        />
                    </div>
                )}
            </div>
        </form>
    );
}

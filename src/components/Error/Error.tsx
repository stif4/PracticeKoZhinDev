import React from 'react';
import './Error.scss';

const USER_NOT_FOUND = 'User not found';
const INCORRECT_EMAIL = 'Email must be an email';
const PASSWORD_EMPTY = 'Password should not be empty';
const PASSWORD_LENGTH = 'Password must be longer than or equal to 4 characters';
const USER_EXISTS = 'This user already exists';
const FILE_NOT_FOUND = 'File not found';

const ERROR_OBJECT = {
    [USER_NOT_FOUND]: 'aвторизации/Пользователь не найден',
    [INCORRECT_EMAIL]: 'aвторизации/Не корректный Email',
    [PASSWORD_EMPTY]: 'aвторизации/Поле пароля не должено быть пустым',
    [PASSWORD_LENGTH]: 'aвторизации/Длина пароля 4 символа',
    [USER_EXISTS]: 'aвторизации/Пользователь уже зарегестрирован',
    [FILE_NOT_FOUND]: '/Файл не найден',
};

interface IError {
    message: string;
    place?: 'login';
}

type ErrorKeys =
    | 'User not found'
    | 'Email must be an email'
    | 'Password should not be empty'
    | 'Password must be longer than or equal to 4 characters'
    | 'This user already exists'
    | 'File not found';

type TypeTitleOrMessage = 'title' | 'message';

export default function Error({message, place}: IError) {
    const errorKeyTranslated = Object.keys(ERROR_OBJECT).find((errkey) => {
        if (message === errkey) {
            return errkey;
        }
        return message;
    });

    const getTitleOrMessage = (type: TypeTitleOrMessage) => {
        if (errorKeyTranslated) {
            const index = type === 'title' ? 0 : 1;
            const slices = ERROR_OBJECT[errorKeyTranslated as ErrorKeys].split('/');
            if (place === 'login' && type !== 'title') {
                return 'Не правильный email или пароль';
            }
            return slices[index];
        }
        return errorKeyTranslated;
    };

    return (
        <div className="Error">
            <div className="Error__container">
                <div className="Error__img">
                    <img
                        className="Error__imgError"
                        src="/icons/error.svg"
                        alt="error"
                    />
                </div>

                <div className="Error__text">
                    <div className="Error__title">
                        {`Ошибка ${getTitleOrMessage('title')}:`}
                    </div>
                    <div className="Error__message">
                        {getTitleOrMessage('message')}
                    </div>
                </div>
            </div>
        </div>
    );
}

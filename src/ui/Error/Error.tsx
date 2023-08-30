import React from 'react';
import {ERROR_OBJECT} from '../../constants/errors';
import './Error.scss';

interface IError {
    message: string;
    place?: 'login' | 'register';
}

interface IErrorObject {
    [key: string]: string;
}

const MESSAGE_AUTH_DEFFULT = 'Не правильный email или пароль';
const TITLE_AUTH = 'Авторизации';
const TITLE_REGISTER = 'Регистрации';

export default function Error({message, place}: IError) {
    const getMessage = () => {
        const errorTranslated = message in ERROR_OBJECT ? (ERROR_OBJECT as IErrorObject)[message] : message;
        if (errorTranslated) {
            if (place === 'login') {
                return MESSAGE_AUTH_DEFFULT;
            }
        }
        return errorTranslated;
    };

    const getTitle = () => {
        if (place === 'login') {
            return TITLE_AUTH;
        }
        if (place === 'register') {
            return TITLE_REGISTER;
        }
        return '';
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
                    <div className="Error__title">{`Ошибка ${getTitle()}:`}</div>
                    <div className="Error__message">{getMessage()}</div>
                </div>
            </div>
        </div>
    );
}

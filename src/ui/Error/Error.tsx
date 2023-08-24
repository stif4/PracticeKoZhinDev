import React from 'react';
import {ERROR_OBJECT} from '../../constants/errors';
import './Error.scss';

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

const MESSAGE_AUTH_DEFFULT = 'Не правильный email или пароль';
const INDEX_TITLE = 0;
const INDEX_MESSAGE = 1;

export default function Error({message, place}: IError) {
    const errorKeyTranslated = Object.keys(ERROR_OBJECT).find((errkey) => {
        if (message === errkey) {
            return errkey;
        }
        return message;
    });

    const getTitleOrMessage = (type: TypeTitleOrMessage) => {
        if (errorKeyTranslated) {
            const index = type === 'title' ? INDEX_TITLE : INDEX_MESSAGE;
            const slices = ERROR_OBJECT[errorKeyTranslated as ErrorKeys].split('/');
            if (place === 'login' && type !== 'title') {
                return MESSAGE_AUTH_DEFFULT;
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

import React from 'react';
import {toast} from 'react-toastify';
import * as yup from 'yup';
import {useValidate} from '../../../hooks/useValidate';
import {useCreateCommentMutation} from '../../../store/api/postApi';
import {IErrorResponse} from '../../../store/api/types';
import Button from '../../../ui/Button';
import Error from '../../../ui/Error';
import TextArea from '../../../ui/TextArea';
import {validateStringIsEmpty} from '../../../utils/schimsValidate';
import {IError} from '../types';
import './CommentForm.scss';

const CREATE_DATA_INITAIL = {
    text: '',
};

const SCHEMA_CREATE_COMMENT = yup.object().shape({
    text: validateStringIsEmpty,
});

export interface ICreateComment {
    text: string;
}

interface CommentFormProps {
    postId: number;
}

export default function CommentForm({postId}: CommentFormProps) {
    const [dataCreate, setDataCreate] = React.useState<ICreateComment>(CREATE_DATA_INITAIL);
    const [isValid, errorsValidate, checkValid, isCheckValid] = useValidate<ICreateComment>(dataCreate, SCHEMA_CREATE_COMMENT);
    const [
        createComment,
        {isLoading: isLoadingCreateComment, isError: isErrorCreateComment, error: errorCreateComment, isSuccess: isSuccessCreateComment},
    ] = useCreateCommentMutation();

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setDataCreate((prev) => ({...prev, [name]: value}));
    };

    const handleResetDataCreateValue = (name: string) => {
        setDataCreate((prev) => ({...prev, [name]: ''}));
    };

    const handleSubbmit = async (e: React.MouseEvent<HTMLElement>) => {
        if (e) {
            e.preventDefault();
            const isValidated = await checkValid();
            if (isValidated) {
                createComment({postId, data: dataCreate});
            }
        }
    };

    React.useEffect(() => {
        if (isSuccessCreateComment) {
            toast('Коментарий создан', {type: 'success'});
            setDataCreate(CREATE_DATA_INITAIL);
        }
    }, [isSuccessCreateComment]);

    React.useEffect(() => {
        if (isErrorCreateComment) {
            toast('Произошла ошибка', {type: 'error'});
        }
    }, [isErrorCreateComment]);

    const getErrorMessage = () => {
        if (errorsValidate) {
            const keysListError = Object.keys(errorsValidate);
            const lastKey = keysListError[keysListError.length - 1];
            const lastError = (errorsValidate as IError)[lastKey];
            return lastError !== undefined ? lastError : '';
        }
        if (errorCreateComment) {
            const errServe = errorCreateComment as IErrorResponse;
            return errServe.message;
        }
        return '';
    };

    React.useEffect(() => {
        if (isCheckValid) {
            checkValid();
        }
    }, [dataCreate]);

    return (
        <form className="CommentForm">
            <div className="CommentForm__container">
                <div className="CommentForm__textArea">
                    <TextArea
                        onChange={handleChange}
                        value={dataCreate.text}
                        name="text"
                        id="text-CommentForm-id"
                        placeholder="Напишите комментарий"
                        label="Ваш комментарий"
                        onReset={handleResetDataCreateValue}
                    />
                </div>
                <div className="CommentForm__button">
                    <Button
                        label="Отправить комментарий"
                        onClick={handleSubbmit}
                    />
                </div>
                {(!isValid || isErrorCreateComment) && (
                    <div className="CommentForm__error">
                        <Error message={getErrorMessage()} />
                    </div>
                )}
            </div>
        </form>
    );
}

import React from 'react';
import * as yup from 'yup';
import {MultiValue} from 'react-select';
import {toast} from 'react-toastify';
import {useCreatePostMutation} from '../../../store/api/postApi';
import {IErrorResponse, ITagNormolaized} from '../../../store/api/types';
import Button from '../../../ui/Button';
import FileLoder from '../../../ui/FileLoader/FileLoader';
import InputSelectMultiTags from '../../../ui/InputSelect/InputSelectMulti/Tags/InputSelectMultiTags';
import TextArea from '../../../ui/TextArea';
import {validateArray, validatePostText, validatePostTitle} from '../../../utils/schimsValidate';
import './CreatePostForm.scss';
import {useValidate} from '../../../hooks/useValidate';
import Error from '../../../ui/Error';
import {IError, IImg} from '../types';

// разобраться на потом, можноли использовать этот enum в handleResetDataCreateValue и в ui компанентах на месте props name.
// enum ECreatePost {
//     title = 'title',
//     text = 'text',
//     tags = 'tags',
// }

const CREATE_DATA_INITAIL = {
    title: '',
    text: '',
    tags: [],
};

const SCHEMA_CREATE_POST = yup.object().shape({
    title: validatePostTitle,
    text: validatePostText,
    tags: validateArray,
});

interface IPostCreate {
    title: string;
    text: string;
    tags: ITagNormolaized[];
}

interface IPostCreateTransformed {
    tags: string[];
    title: string;
    text: string;
}

export type TCreateInput = IPostCreateTransformed & IImg;

interface ICreatePostForm {
    closeForm: () => void;
}

export default function CreatePostForm({closeForm}: ICreatePostForm) {
    const [dataCreate, setDataCreate] = React.useState<IPostCreate>(CREATE_DATA_INITAIL);
    const [uploadedFile, setUploadedFile] = React.useState<FormData | null>(null);

    const [isValid, errorsValidate, checkValid, isCheckValid] = useValidate<IPostCreate>(dataCreate, SCHEMA_CREATE_POST);

    const [createPost, {isLoading, isError: isPostCreatedError, error: errorServer, isSuccess: isPostCreated}] = useCreatePostMutation();

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setDataCreate((prev) => ({...prev, [name]: value}));
    };

    const handleChangeSelect = (name: string, value: MultiValue<ITagNormolaized>) => {
        setDataCreate((prev) => ({...prev, [name]: value}));
    };

    const handleResetDataCreateValueStr = (name: string) => {
        setDataCreate((prev) => ({...prev, [name]: ''}));
    };

    const handleResetDataCreateValueArray = (name: string) => {
        setDataCreate((prev) => ({...prev, [name]: []}));
    };

    const handleUploadFile = (file: FormData | null) => {
        setUploadedFile(file);
    };

    const transformTags = () => dataCreate.tags.map((tag) => tag.value);

    const handleSubbmit = async (e: React.MouseEvent<HTMLElement>) => {
        if (e) {
            e.preventDefault();
            const isValidated = await checkValid();
            if (isValidated) {
                const tagsTransformed = transformTags();
                const dataTransformed = {...dataCreate, tags: tagsTransformed, img: uploadedFile};
                await createPost(dataTransformed);
            }
        }
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

    const isDiasbled = () => {
        const initialValue = false;
        return Object.keys(dataCreate).reduce((accumulator, currentKey) => {
            const currentValue = dataCreate[currentKey as keyof IPostCreate];
            if (typeof currentValue === 'string') {
                if (currentValue === '') {
                    return accumulator || true;
                }
            }
            if (currentValue.length === 0) {
                return accumulator || true;
            }
            return accumulator;
        }, initialValue);
    };

    React.useEffect(() => {
        if (isCheckValid) {
            checkValid();
        }
    }, [dataCreate]);

    React.useEffect(() => {
        if (isPostCreated) {
            toast('Пост создан', {type: 'success'});
            setDataCreate(CREATE_DATA_INITAIL);
            setUploadedFile(null);
            closeForm();
        }
    }, [isPostCreated]);

    React.useEffect(() => {
        if (isPostCreatedError) {
            toast('Произошла ошибка', {type: 'error'});
        }
    }, [isPostCreatedError]);

    return (
        <form className="CreatePostForm">
            <div className="CreatePostForm__container">
                <div className="CreatePostForm__textArea">
                    <TextArea
                        onChange={handleChange}
                        value={dataCreate.title}
                        name="title"
                        id="title-CpreatePostForm-id"
                        placeholder="Введите текс"
                        label="Заголовок"
                        onReset={handleResetDataCreateValueStr}
                        error={Boolean(errorsValidate?.title)}
                    />
                </div>

                <div className="CreatePostForm__textArea">
                    <TextArea
                        onChange={handleChange}
                        value={dataCreate.text}
                        name="text"
                        id="text-CreatePostForm-id"
                        placeholder="Введите текст"
                        label="Основной текст"
                        onReset={handleResetDataCreateValueStr}
                        error={Boolean(errorsValidate?.text)}
                    />
                </div>

                <div className="CreatePostForm__fileLoader">
                    <FileLoder
                        onUploadFile={handleUploadFile}
                        label="Изображение"
                    />
                </div>

                <div className="CreatePostForm__selet">
                    <InputSelectMultiTags
                        value={dataCreate.tags}
                        id="select-CreatePostForm-id"
                        onChange={handleChangeSelect}
                        onReset={handleResetDataCreateValueArray}
                        error={Boolean(errorsValidate?.tags)}
                    />
                </div>

                <div className="CreatePostForm__button">
                    <Button
                        onClick={handleSubbmit}
                        label="Опубликовать пост"
                        disabled={isDiasbled()}
                    />
                </div>

                {(!isValid || isPostCreatedError) && (
                    <div className="CreatePostForm__error">
                        <Error message={getErrorMessage()} />
                    </div>
                )}
            </div>
        </form>
    );
}

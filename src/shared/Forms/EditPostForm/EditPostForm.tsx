import React from 'react';
import * as yup from 'yup';
import {MultiValue} from 'react-select';
import {toast} from 'react-toastify';
import {useEditPostMutation} from '../../../store/api/postApi';
import {IErrorResponse, IPostTransform, ITagNormolaized} from '../../../store/api/types';
import Button from '../../../ui/Button';
import FileLoder from '../../../ui/FileLoader/FileLoader';
import InputSelectMultiTags from '../../../ui/InputSelect/InputSelectMulti/Tags/InputSelectMultiTags';
import TextArea from '../../../ui/TextArea';
import {validateArray, validatePostText, validatePostTitle} from '../../../utils/schimsValidate';
import {useValidate} from '../../../hooks/useValidate';
import Error from '../../../ui/Error';
import {IError, IImg} from '../types';
import {normalizationTags} from '../../../utils/tagsNormalization';
import {useAppDispatch} from '../../../store/store';
import {failedEditPost, pendingEditPost} from '../../../store/features/userSlice';
import './EditPostForm.scss';

const SCHEMA_EDIT_POST = yup.object().shape({
    title: validatePostTitle,
    text: validatePostText,
    tags: validateArray,
});

interface IPostEdit {
    title: string;
    text: string;
    tags: ITagNormolaized[];
}

interface IPostEditTransformed {
    tags: string[];
    title: string;
    text: string;
    id: number;
}

export type TEditInput = IPostEditTransformed & IImg;

interface IEditPostFormProps {
    closeForm: () => void;
    post: IPostTransform;
}

/// #Бэк не обновляет теги ///

export default function EditPostForm({closeForm, post}: IEditPostFormProps) {
    const dispatch = useAppDispatch();
    const dataEditInitial = {title: post.title, text: post.text, tags: normalizationTags(post.tags)};

    const [dataEdit, setDataEdit] = React.useState<IPostEdit>(dataEditInitial);
    const [uploadedFile, setUploadedFile] = React.useState<FormData | null>(null);

    const [isValid, errorsValidate, checkValid, isCheckValid] = useValidate<IPostEdit>(dataEditInitial, SCHEMA_EDIT_POST);
    const [editPost, {isLoading, isError: isPostEditedError, error: errorServer, isSuccess: isPostEdited}] = useEditPostMutation();

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setDataEdit((prev) => ({...prev, [name]: value}));
    };

    const handleChangeSelect = (name: string, value: MultiValue<ITagNormolaized>) => {
        setDataEdit((prev) => ({...prev, [name]: value}));
    };

    const handleResetDataEditValueStr = (name: string) => {
        setDataEdit((prev) => ({...prev, [name]: ''}));
    };

    const handleResetDataEditValueArray = (name: string) => {
        setDataEdit((prev) => ({...prev, [name]: []}));
    };

    const handleUploadFile = (file: FormData | null) => {
        setUploadedFile(file);
    };

    const transformTags = () => dataEdit.tags.map((tag) => tag.value);

    const handleSubbmit = async (e: React.MouseEvent<HTMLElement>) => {
        if (e) {
            e.preventDefault();
            const isValidated = await checkValid();
            if (isValidated) {
                const tagsTransformed = transformTags();
                const dataTransformed = {...dataEdit, tags: tagsTransformed, img: uploadedFile, id: post.id};
                await editPost(dataTransformed);
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
        return Object.keys(dataEdit).reduce((accumulator, currentKey) => {
            const currentValue = dataEdit[currentKey as keyof IPostEdit];
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
        setDataEdit(dataEditInitial);
    }, [post]);

    React.useEffect(() => {
        if (isCheckValid) {
            checkValid();
        }
    }, [dataEdit]);

    React.useEffect(() => {
        if (isPostEdited) {
            toast('Пост обновлен', {type: 'success'});
            setUploadedFile(null);
            closeForm();
        }
    }, [isPostEdited]);

    React.useEffect(() => {
        if (isPostEditedError) {
            toast('Произошла ошибка', {type: 'error'});
            dispatch(failedEditPost());
        }
    }, [isPostEditedError]);

    React.useEffect(() => {
        if (isLoading) {
            dispatch(pendingEditPost(post.id));
        }
    }, [isLoading]);

    return (
        <form className="EditPostForm">
            <div className="EditPostForm__container">
                <div className="EditPostForm__textArea">
                    <TextArea
                        onChange={handleChange}
                        value={dataEdit.title}
                        name="title"
                        id="title-CpreatePostForm-id"
                        placeholder="Введите текс"
                        label="Заголовок"
                        onReset={handleResetDataEditValueStr}
                        error={Boolean(errorsValidate?.title)}
                    />
                </div>

                <div className="EditPostForm__textArea">
                    <TextArea
                        onChange={handleChange}
                        value={dataEdit.text}
                        name="text"
                        id="text-EditPostForm-id"
                        placeholder="Введите текст"
                        label="Основной текст"
                        onReset={handleResetDataEditValueStr}
                        error={Boolean(errorsValidate?.text)}
                    />
                </div>

                <div className="EditPostForm__fileLoader">
                    <FileLoder
                        onUploadFile={handleUploadFile}
                        label="Изображение"
                        isClear={!post.imageUrl}
                        fileURLDefualt={post.imageUrl}
                    />
                </div>

                <div className="EditPostForm__selet">
                    <InputSelectMultiTags
                        value={dataEdit.tags}
                        id="select-EditPostForm-id"
                        onChange={handleChangeSelect}
                        onReset={handleResetDataEditValueArray}
                        error={Boolean(errorsValidate?.tags)}
                    />
                </div>

                <div className="EditPostForm__button">
                    <Button
                        onClick={handleSubbmit}
                        label="Опубликовать пост"
                        disabled={isDiasbled()}
                    />
                </div>

                {(!isValid || isPostEditedError) && (
                    <div className="EditPostForm__error">
                        <Error message={getErrorMessage()} />
                    </div>
                )}
            </div>
        </form>
    );
}

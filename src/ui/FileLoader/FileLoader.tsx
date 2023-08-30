import React from 'react';
import Button from '../Button';
import './FileLoader.scss';
import FileShow from './views/FileShow';

const BUTTON_CLASS_NAME = 'Button__main_empty Button__main_empty_colorGray Button__main_empty_colorGray_medium';
const ERROR_MESSAGE = 'Please select a file!';
const INDEX_UPLOADED_FILE = 0;

interface IFileLoder {
    onUploadFile: (file: FormData | null) => void;
}

export default function FileLoder({onUploadFile}: IFileLoder) {
    const filePicker = React.useRef<HTMLInputElement>(null);
    const [fileURL, setFileURL] = React.useState<string | ArrayBuffer | null>(null);
    const [selectFile, setSelectFile] = React.useState<File | null>(null);

    const clearUploadInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = '';
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files !== null) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setFileURL(fileReader.result);
            };
            const file: File = event.target.files[INDEX_UPLOADED_FILE];
            setSelectFile(file);
            fileReader.readAsDataURL(file);
            clearUploadInput(event);
        }
    };

    const handleReset = () => {
        setFileURL(null);
        setSelectFile(null);
        onUploadFile(null);
    };

    const handleUpload = async () => {
        if (!selectFile) {
            alert(ERROR_MESSAGE);
            return;
        }
        if (selectFile) {
            const formData = new FormData();
            formData.append('file', selectFile, selectFile.name);
            onUploadFile(formData);
        }
    };

    React.useEffect(() => {
        if (selectFile !== null) {
            handleUpload();
        }
    }, [selectFile]);

    const handlePick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (filePicker.current !== null) {
            filePicker.current.click();
        }
    };

    const visualComponent = () => selectFile ? (
        <FileShow
            uploadedFile={selectFile}
            fileURL={fileURL}
            onReset={handleReset}
            onChange={handlePick}
            label="Фото профиля"
        />
    ) : (
        <Button
            upLabel="Фото профиля"
            label="Нажмите для загрузки"
            className={BUTTON_CLASS_NAME}
            icon="/icons/import.svg"
            onClick={handlePick}
        />
    );

    return (
        <div className="FileLoader">
            <div className="FileLoader__container">
                <input
                    className="FileLoader__input"
                    ref={filePicker}
                    type="file"
                    onChange={handleChange}
                    accept="image/*,.png,.jpg"
                />
                {visualComponent()}
            </div>
        </div>
    );
}

import React from 'react';
import Button from '../Button';
import './FileLoader.scss';
import FileShow from './views/FileShow';

const BUTTON_CLASS_NAME = 'Button__main_empty Button__main_empty_colorGray Button__main_empty_colorGray_medium';
const ERROR_MESSAGE = 'Please select a file!';
const INDEX_UPLOADED_FILE = 0;

export default function FileLoder() {
    const filePicker = React.useRef<any>(null);
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleChange = (event: any) => {
        event.preventDefault();
        setSelectedFile(event.target.files[INDEX_UPLOADED_FILE]);
    };

    const handeleUpload = async () => {
        if (!selectedFile) {
            alert(ERROR_MESSAGE);
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);
    };

    React.useEffect(() => {
        if (selectedFile !== null) {
            handeleUpload();
        }
    }, [selectedFile]);

    const handlePick = (event: any) => {
        event.preventDefault();
        filePicker.current.click();
    };

    const visualComponent = () => selectedFile ? (
        <FileShow label="Фото профиля" />
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

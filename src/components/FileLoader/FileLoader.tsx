import React from 'react';
import Button from '../Button/Button';
import './FileLoader.scss';
import FileShow from './FileShow';

const BUTTON_CLASS_NAME = 'Button__main_empty Button__main_empty_colorGray Button__main_empty_colorGray_medium';
const INITIAL_STATE = null;

export default function FileLoder() {
    const filePicker = React.useRef<any>();
    const [selectedFile, setSelectedFile] = React.useState(INITIAL_STATE);

    const handleChange = (event: any) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
    };

    const handeleUpload = async () => {
        if (!selectedFile) {
            alert('plaese select a file');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        // const httpFiles = axios.create({
        //     baseURL: 'http://localhost:3000/api/',
        // });

        // const file = await httpFiles.post('files', formData, config);
        // onChange({name: 'photo', value: file.data[0].url});
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

import React, {useState} from 'react';
import PopUp from '../../Pop-up';
import './FileShow.scss';

export interface IItem {
    text: string;
    addClass: 'red' | '';
    action?: (event?: any) => void;
}

interface IFileShow {
    label: string;
    uploadedFile: File;
    fileURL: string | ArrayBuffer | null;
    onReset: () => void;
    onChange: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function FileShow({uploadedFile, label, fileURL, onReset, onChange}: IFileShow) {
    const ITEMS: IItem[] = [
        {text: 'Заменить фото', addClass: '', action: onChange},
        {text: 'Удалить фото', addClass: 'red', action: onReset},
    ];

    return (
        <div className="FileShow">
            <div className="FileShow__label">{label}</div>
            <div className="FileShow__container">
                <div className="FileShow__img">
                    <img
                        className="FileShow__imgLoaded"
                        src={fileURL as string}
                        alt="loaded"
                    />
                    <p className="FileShow__text">{uploadedFile.name}</p>
                </div>
                <div className="FileShow__menu">
                    <PopUp items={ITEMS} />
                </div>
            </div>
        </div>
    );
}

import React, {useState} from 'react';
import PopUp from '../Pop-up';
import './FileShow.scss';

export interface IItem {
    text: string;
    addClass: 'red' | '';
}

const ITEMS: IItem[] = [
    {text: 'Заменить фото', addClass: ''},
    {text: 'Удалить фото', addClass: 'red'},
];

interface IFileShow {
    label: string;
}

export default function FileShow({label}: IFileShow) {
    return (
        <div className="FileShow">
            <div className="FileShow__label">{label}</div>
            <div className="FileShow__container">
                <div className="FileShow__img">
                    <img
                        className="FileShow__imgLoaded"
                        src=""
                        alt="loaded"
                    />
                    <p className="FileShow__text">xxx.png</p>
                </div>
                <div className="FileShow__menu">
                    <PopUp items={ITEMS} />
                </div>
            </div>
        </div>
    );
}

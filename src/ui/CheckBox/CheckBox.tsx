import React from 'react';
import './CheckBox.scss';

interface ICheckBoxProps {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    value: 'checked' | 'unchecked';
    label?: string;
    width?: string;
    height?: string;
    pathsIcons: string[];
}

export default function CheckBox({onClick, label, width, height, value, pathsIcons}: ICheckBoxProps) {
    const index = value === 'checked' ? 1 : 0;
    const onKeyPressHandler = () => {};
    return (
        <div className="CheckBox">
            <div className="CheckBox__container">
                <div
                    className="CheckBox__button"
                    style={{width, height}}
                    onClick={onClick}
                    role="button"
                    tabIndex={0}
                    id={value}
                    onKeyPress={onKeyPressHandler}
                >
                    <img
                        className="CheckBox__img"
                        src={pathsIcons[index]}
                        alt="CheckBox"
                    />
                </div>
                <label
                    htmlFor={value}
                    className="CheckBox__label"
                >
                    {label}
                </label>
            </div>
        </div>
    );
}

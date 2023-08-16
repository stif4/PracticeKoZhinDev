import React from 'react';
import './CheckBox.scss';

interface ICheckBox {
    onClick: () => void;
    value: 0 | 1;
    label?: string;
    id: string;
    onKeyPressHandler: () => void;
    tabIndex: number;
    width?: string;
    height?: string;
    pathIcons: string[];
}
export default function CheckBox({
    onClick,
    value,
    label,
    tabIndex,
    id,
    onKeyPressHandler,
    width,
    height,
    pathIcons,
}: ICheckBox) {
    return (
        <div className="CheckBox">
            <div className="CheckBox__container">
                <div
                    className="CheckBox__button"
                    style={{width, height}}
                    onClick={onClick}
                    role="button"
                    tabIndex={tabIndex}
                    id={id}
                    onKeyPress={onKeyPressHandler}
                >
                    <img
                        className="CheckBox__img"
                        src={pathIcons[value]}
                        alt="CheckBox"
                    />
                </div>

                <label
                    htmlFor={id}
                    className="CheckBox__label"
                >
                    {label}
                </label>
            </div>
        </div>
    );
}

import React from 'react';
import './TextArea.scss';

interface ITextArea {
    onChange: () => void;
    value: string;
    name: string;
    placeholder: string;
    label: string;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function TextArea({
    onChange,
    value,
    name,
    placeholder,
    label,
    onClick,
}: ITextArea) {
    const onKeyPressHandler = () => {};
    return (
        <div className="TextArea">
            <div className="TextArea__container">
                <div className="TextArea__label">{label}</div>
                <textarea
                    className="TextArea__main"
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />

                {value && (
                    <div
                        className="TextArea__img"
                        onKeyPress={onKeyPressHandler}
                        onClick={onClick}
                        role="button"
                        tabIndex={0}
                    >
                        <img
                            className="TextArea__iconCross"
                            src="/icons/cross.svg"
                            alt="cross"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

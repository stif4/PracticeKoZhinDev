import React from 'react';
import './TextArea.scss';

interface ITextArea {
    onChange: () => void;
    value: string;
    name: string;
    placeholder: string;
    label: string;
}

export default function TextArea({
    onChange,
    value,
    name,
    placeholder,
    label,
}: ITextArea) {
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
            </div>
        </div>
    );
}

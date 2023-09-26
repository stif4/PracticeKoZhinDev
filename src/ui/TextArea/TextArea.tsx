import React from 'react';
import './TextArea.scss';

const INDEX_NAME_ELEMENT = 0;
const TEXTAREA_CLASS_BASE = 'TextArea__main ';
const TEXTAREA_CLASS_ERROR = 'TextArea__main_error';

interface ITextAreaProps {
    onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
    name: string;
    id: string;
    placeholder: string;
    label: string;
    error?: boolean;
    onReset: (name: string) => void;
}

export default function TextArea({onChange, value, name, id, placeholder, label, error, onReset}: ITextAreaProps) {
    const calssTextArea = error ? TEXTAREA_CLASS_BASE + TEXTAREA_CLASS_ERROR : TEXTAREA_CLASS_BASE;

    const onKeyPressHandler = () => {};

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const targetId = e.currentTarget.id;
        const targetName = targetId.split('-')[INDEX_NAME_ELEMENT];
        return onReset(targetName);
    };

    return (
        <div className="TextArea">
            <div className="TextArea__container">
                <div className="TextArea__label">{label}</div>
                <textarea
                    className={calssTextArea}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />

                {value && (
                    <div
                        className="TextArea__img"
                        onKeyPress={onKeyPressHandler}
                        onClick={handleClick}
                        role="button"
                        id={id}
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

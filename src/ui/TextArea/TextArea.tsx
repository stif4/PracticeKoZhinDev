import React from 'react';
import './TextArea.scss';

const INDEX_NAME_ELEMENT = 0;
interface ITextArea {
    onChange: (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    value: string;
    name: string;
    id: string;
    placeholder: string;
    label: string;
    onReset: (name: string) => void;
}

export default function TextArea({
    onChange,
    value,
    name,
    id,
    placeholder,
    label,
    onReset,
}: ITextArea) {
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

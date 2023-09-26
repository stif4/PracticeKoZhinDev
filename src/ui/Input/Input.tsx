import React from 'react';
import ProgressBarPassword from '../ProgressBarPassword';
import './Input.scss';

interface IInputProps {
    label: string;
    onChange: (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    onReset: (name: string) => void;
    className?: string;
    error?: boolean;
    name: string;
    id: string;
    type?: string;
    value: string;
    placeholder?: string;
    withProgress?: boolean;
}

const INPUT_CLASS_BASE = 'Input__main ';
const INPUT_CLASS_ERROR = 'Input__main_error';
const IMG_CLASS_BASE = 'Input__img';
const IMG_CLASS_LEFT = 'Input__img_left';
const URL_ICON_SHOW = '/icons/view.svg';
const URL_ICON_HIDE = '/icons/viewhide.svg';
const URL_ICON_CROOS = '/icons/cross.svg';
const INITAL_VALUE = false;
const INDEX_NAME_ELEMENT = 0;

export default function Input({
    error,
    label,
    onChange,
    onReset,
    className = '',
    name,
    id,
    type,
    value,
    placeholder,
    withProgress,
}: IInputProps) {
    const [showPassword, setShowPassword] = React.useState<boolean>(INITAL_VALUE);

    const calssInput = error
        ? INPUT_CLASS_BASE + className + INPUT_CLASS_ERROR
        : INPUT_CLASS_BASE + className;

    const calssInputImg = className?.indexOf('Input__main_imgLeft') === -1
        ? IMG_CLASS_BASE
        : IMG_CLASS_LEFT;

    const getUrlImg = (): string | undefined => {
        if (type === 'password') {
            return showPassword ? URL_ICON_SHOW : URL_ICON_HIDE;
        }
        return URL_ICON_CROOS;
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const targetId = e.currentTarget.id;
        const targetName = targetId.split('-')[INDEX_NAME_ELEMENT];
        if (type === 'password') {
            return setShowPassword((prev) => !prev);
        }
        return onReset(targetName);
    };

    const getCurrentType = () => {
        if (type === 'password') {
            return showPassword ? 'text' : 'password';
        }
        return type;
    };

    const onKeyPressHandler = () => {};

    return (
        <div className="Input">
            <div className="Input__container">
                {label && <p className="Input__label">{label}</p>}
                <div className="Input__wrapper">
                    <input
                        className={calssInput}
                        type={getCurrentType()}
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                    <div
                        className="Input__button"
                        onKeyPress={onKeyPressHandler}
                        role="button"
                        id={id + 'div'}
                        onClick={handleClick}
                        tabIndex={0}
                    >
                        <img
                            className={calssInputImg}
                            src={getUrlImg()}
                            alt="icon"
                        />
                    </div>
                </div>
                {withProgress && (
                    <div className="Input__progressBarPassword">
                        <ProgressBarPassword password={value} />
                    </div>
                )}
            </div>
        </div>
    );
}

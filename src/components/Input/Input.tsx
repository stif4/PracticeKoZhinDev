import React from 'react';
import ProgressBarPassword from '../ProgressBarPassword/ProgressBarPassword';
import './Input.scss';

interface IInput {
    label: string;
    onChange: () => void;
    className: string;
    icon?: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
}

const INPUT_CLASS_BASE = 'Input__main ';
const IMG_CLASS_BASE = 'Input__img';
const IMG_CLASS_LEFT = 'Input__img_left';
const URL_ICON_SHOW = '/icons/view.svg';
const URL_ICON_HIDE = '/icons/viewhide.svg';

export default function Input({
    label,
    onChange,
    className,
    icon,
    name,
    type,
    value,
    placeholder,
}: IInput) {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const calssInput = INPUT_CLASS_BASE + className;
    const calssInputImg = className.indexOf('Input__main_imgLeft') === -1 ? IMG_CLASS_BASE : IMG_CLASS_LEFT;

    const getUrlImg = (): string | undefined => {
        if (type === 'password') {
            return showPassword
                ? URL_ICON_SHOW
                : URL_ICON_HIDE;
        }
        return icon;
    };

    return (
        <div className="Input">
            <div className="Input__container">
                {label && <p className="Input__label">{label}</p>}
                <input
                    className={calssInput}
                    type={type === 'password' ? 'password' : 'text'}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <img
                    className={calssInputImg}
                    src={getUrlImg()}
                    alt="icon"
                />
                <div className="Input__progressBarPassword">
                    <ProgressBarPassword password="sdS+" />
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import './Button.scss';

interface IButton {
    label: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    icon?: string;
}

const BUTTON_CLASS_BASE = 'Button ';

export default function Button({
    label,
    onClick,
    className,
    disabled,
    icon,
}: IButton) {
    const classButton = BUTTON_CLASS_BASE + className;

    return (
        <button
            className={classButton}
            onClick={onClick}
            disabled={disabled}
        >
            <div className="Button__container">
                {icon && (
                    <img
                        className="Button__img"
                        src={icon}
                        alt="icon"
                    />
                )}
                <p className="Button__label">{label}</p>
            </div>
        </button>
    );
}

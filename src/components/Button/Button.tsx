import React from 'react';
import './Button.scss';

interface IButton {
    label: string;
    upLabel?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    disabled?: boolean;
    icon?: string;
}

const BUTTON_CLASS_BASE = 'Button__main ';

export default function Button({
    label,
    upLabel,
    onClick,
    className,
    disabled,
    icon,
}: IButton) {
    const classButton = BUTTON_CLASS_BASE + className;

    return (
        <div className="Button">
            <div className="Button__container">
                {upLabel && <div className="Button__upLabel">{upLabel}</div>}
                <button
                    className={classButton}
                    onClick={onClick}
                    disabled={disabled}
                >
                    <div className="Button__content">
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
            </div>
        </div>
    );
}

/* <button
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
        </button> */

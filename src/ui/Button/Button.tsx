import React from 'react';
import './Button.scss';

interface IButtonProps {
    label: string;
    upLabel?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    disabled?: boolean;
    icon?: string;
    labelColor?: string;
}

const BUTTON_CLASS_BASE = 'Button__main ';

export default function Button({label, upLabel, onClick, className, disabled, icon, labelColor}: IButtonProps) {
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
                        <p
                            className="Button__label"
                            style={{color: `${labelColor}`}}
                        >
                            {label}
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
}

import React from 'react';
import Button from '../Button';

interface ITab {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className: string;
    onKeyPressHandler: () => void;
    label: string;
    isActive: boolean;
    id: string;
}

const TAB_ACTIVE = 'Button__main_medium Button__main_medium_colorDarck';
const TAB_NOT_ACTIVE = 'Button__main_empty Button__main_empty_colorGray Button__main_empty_colorGray_medium';

export default function Tab({
    onClick,
    className,
    onKeyPressHandler,
    label,
    isActive,
    id,
}: ITab) {
    const classTab = isActive ? TAB_ACTIVE : TAB_NOT_ACTIVE;

    return (
        <div
            className={className}
            onKeyPress={onKeyPressHandler}
            onClick={(event) => onClick(event)}
            aria-checked="false"
            role="checkbox"
            tabIndex={0}
            id={id}
        >
            <Button
                className={classTab}
                label={label}
            />
        </div>
    );
}

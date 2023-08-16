import React from 'react';
import Button from '../Button/Button';

interface ITab {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className: string;
    onKeyPressHandler: () => void;
    label: string;
    tabIndex: number;
    isActive: boolean;
}

const TAB_ACTIVE = 'Button_medium Button_medium_colorDarck';
const TAB_NOT_ACTIVE = 'Button_empty Button_empty_colorGray Button_empty_colorGray_medium';

export default function Tab({
    onClick,
    className,
    onKeyPressHandler,
    label,
    tabIndex,
    isActive,
}: ITab) {
    const classTab = isActive ? TAB_ACTIVE : TAB_NOT_ACTIVE;

    return (
        <div
            className={className}
            onKeyPress={onKeyPressHandler}
            onClick={(event) => onClick(event)}
            aria-checked="false"
            role="checkbox"
            tabIndex={tabIndex}
        >
            <Button
                className={classTab}
                label={label}
            />
        </div>
    );
}

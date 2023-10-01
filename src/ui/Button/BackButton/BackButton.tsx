import React from 'react';
import Button from '../Button';

const CLASS_BUTTON = 'Button__main_empty Button__main_empty_colorGray Button__main_medium Button__main_empty_colorGray_medium_withoutBorder';

interface IBackButtonProps {
    onClick: () => void;
}

export default function BackButton({onClick}: IBackButtonProps) {
    return (
        <>
            <Button
                label="Назад"
                className={CLASS_BUTTON}
                icon="../icons/expandleft.svg"
                labelColor="#00000099"
                onClick={onClick}
            />
        </>
    );
}

import React from 'react';
import './ModalPaper.scss';

interface IModalPaperProps {
    children: React.ReactNode;
    isActive: boolean;
    onActive: (event?:any) => void;
}

const MODAL_DEFULT = 'ModalPaper';
const MODAL_ACTIVE = 'ModalPaper ModalPaper_active';

const CONTAINER_DEFULT = 'ModalPaper__container';
const CONTAINER_ACTIVE = 'ModalPaper__container ModalPaper__container_active';

export default function ModalPaper({children, isActive, onActive}: IModalPaperProps) {
    const classNameModal = isActive ? MODAL_ACTIVE : MODAL_DEFULT;
    const classNameContainer = isActive ? CONTAINER_ACTIVE : CONTAINER_DEFULT;

    const onKeyPressHandler = () => {};

    return (
        <div
            className={classNameModal}
            onClick={onActive}
            onKeyPress={onKeyPressHandler}
            role="button"
            tabIndex={0}
        >
            <div className={classNameContainer}>{children}</div>
        </div>
    );
}

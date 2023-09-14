import React from 'react';
import ModalPaper from '../../../shared/Modal/ModalPaper';
import Button from '../../../ui/Button';
import './ProfileModal.scss';

interface IProfileModal {
    isActive: boolean;
    onActive: (event:React.MouseEvent<HTMLElement>) => void;
    onDelite: () => void;
}

export default function ProfileModal({isActive, onActive, onDelite}: IProfileModal) {
    return (
        <ModalPaper
            isActive={isActive}
            onActive={onActive}
        >
            <div className="ProfileModal">
                <div className="ProfileModal__container">
                    <h2 className="ProfileModal__title">Удалить акаунт?</h2>
                    <div className="ProfileModal__buttons">
                        <Button
                            label="Удалить"
                            className="Button__main_empty Button__main_empty_medium"
                            onClick={onDelite}
                        />
                        <Button
                            label="Отменить"
                            className="Button__main_medium"
                            onClick={onActive}
                        />
                    </div>
                </div>
            </div>
        </ModalPaper>
    );
}

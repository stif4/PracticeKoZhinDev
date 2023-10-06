import React from 'react';
import Input from '../Input';

interface IInputSeartchProps {
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onReset: () => void;
    value: string;
}

export default function InputSeartch({onChange, onReset, value}: IInputSeartchProps) {
    return (
        <div className="InputSeartch">
            <div className="InputSeartch__container">
                <Input
                    onChange={onChange}
                    onReset={onReset}
                    value={value}
                    type="seartch"
                    className="Input__main Input__main_imgLeft"
                    name="query"
                    id="input-seartch-subscriptions-page"
                    placeholder="Поиск пользователей"
                />
            </div>
        </div>
    );
}

import React from 'react';
import './Card.scss';

interface ICard {
    children: React.ReactNode;
    padding?: string;
}

export default function Card({children, padding}: ICard) {
    const getPadding = () => {
        if (padding) {
            return {padding};
        }
        return undefined;
    };

    return (
        <div className="Card">
            <div
                className="Card__container"
                style={getPadding()}
            >
                {children}
            </div>
        </div>
    );
}

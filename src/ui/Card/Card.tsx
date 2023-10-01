import React from 'react';
import './Card.scss';

interface ICardProps {
    children: React.ReactNode;
    padding?: string;
    isHide?: boolean;
}

export default function Card({children, padding, isHide}: ICardProps) {
    const getPadding = () => {
        if (padding) {
            return {padding};
        }
        return undefined;
    };

    if (isHide) {
        return <>{children}</>;
    }

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

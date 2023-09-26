import React from 'react';
import Button from '../Button';
import './Tag.scss';

interface ITagProps {
    label: string;
}

export default function Tag({label}: ITagProps) {
    return (
        <div className="Tag">
            <div className="Tag__container">
                <Button
                    label={label}
                    className="Button__main_small"
                />
            </div>
        </div>
    );
}

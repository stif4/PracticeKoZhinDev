import React from 'react';
import Button from '../Button';
import './Tag.scss';

interface ITag {
    label: string;
}

export default function Tag({label}: ITag) {
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

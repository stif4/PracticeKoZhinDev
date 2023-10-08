import React from 'react';
import {ITag} from '../../store/api/types';
import Button from '../Button';
import './Tag.scss';

interface ITagProps {
    tag: ITag;
    onClick?: (tag: ITag) => void;
}

export default function Tag({tag, onClick}: ITagProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(tag);
        }
    };

    return (
        <div className="Tag">
            <div className="Tag__container">
                <Button
                    label={tag.title}
                    className="Button__main_small"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}

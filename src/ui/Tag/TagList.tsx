import React from 'react';
import {ITag} from '../../store/api/types';
import Tag from './Tag';
import './TagList.scss';

interface ITagListProps {
    tags: ITag[];
    onClick?: (tag: ITag) => void;
}

export default function TagList({tags, onClick}: ITagListProps) {
    return (
        <div className="TagList">
            <div className="TagList__container">
                {tags.map((tag) => (
                    <Tag
                        tag={tag}
                        key={tag.title}
                        onClick={onClick}
                    />
                ))}
            </div>
        </div>
    );
}

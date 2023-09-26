import React from 'react';
import {ITag} from '../../store/api/types';
import Tag from './Tag';
import './TagList.scss';

interface ITagListProps {
    tags: ITag[];
}

export default function TagList({tags}: ITagListProps) {
    return (
        <div className="TagList">
            <div className="TagList__container">
                {tags.map((tag) => (
                    <Tag
                        label={tag.title}
                        key={tag.title}
                    />
                ))}
            </div>
        </div>
    );
}
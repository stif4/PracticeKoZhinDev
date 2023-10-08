import React from 'react';
import {MultiValue} from 'react-select';
import {ITag, ITagNormolaized} from '../store/api/types';
import {normalizationTags} from '../utils/tagsNormalization';

export default function useFilterOnTags() {
    const [tags, setTags] = React.useState<ITag[] | null>(null);

    const joinTagsToString = () => {
        if (tags) {
            return tags.map((tag) => tag.title).join();
        }
        return undefined;
    };

    const resetTags = () => {
        setTags(null);
    };

    const handleClickTag = (tag: ITag) => {
        setTags((prev) => {
            if (prev) {
                return [...prev, tag];
            }
            return [tag];
        });
    };

    const handleChangeTags = (tagsNormolaized: MultiValue<ITagNormolaized>) => {
        const tagsUnNormalaized = tagsNormolaized.map((tag) => ({id: tag.id, title: tag.value}));
        setTags(tagsUnNormalaized);
    };

    const normalaizeTags = () => {
        if (tags) {
            return normalizationTags(tags);
        }
        return [];
    };

    return {handleChangeTags, handleClickTag, resetTags, tagsQuery: joinTagsToString(), tagsNormalized: normalaizeTags()};
}

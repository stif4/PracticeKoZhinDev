import {ITag} from '../store/api/types';

export function normalizationTags(tags: ITag[]) {
    const tagsNormolaized = tags.map((tag) => ({value: tag.title, label: `#${tag.title}`, id: tag.id}));
    return tagsNormolaized;
}

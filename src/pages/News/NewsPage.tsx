import React from 'react';
import InputSelectMultiTagsFilter from '../../ui/InputSelect/InputSelectMulti/Tags/InputSelectMultiTagsFilter';
import PostList from '../../ui/Post';
import PostSkeleton from '../../ui/Post/PostSkeleton';
import useShowPostById from '../Profile/hooks/useShowPostById';
import useLazyScrollPosts from '../../hooks/useLazyScrollPosts';
import useFilterOnTags from '../../hooks/useFilterOnTags';
import './NewsPage.scss';

export default function NewsPage() {
    const {tagsNormalized, tagsQuery, handleChangeTags, handleClickTag, resetTags} = useFilterOnTags();
    const {posts, isLoading} = useLazyScrollPosts(undefined, tagsQuery);
    const {getPostByIdModal, handlePostIdShow} = useShowPostById();

    return (
        <div className="newsPage">
            <div className="newsPage__container">
                <div className="newsPage__titleConteiner">
                    <p className="newsPage__title">Новости</p>
                </div>
                <div className="newsPage__filter">
                    <InputSelectMultiTagsFilter
                        value={tagsNormalized}
                        id="newsPage-seartchInputMulti-tags"
                        onChange={handleChangeTags}
                        onReset={resetTags}
                    />
                </div>
                <div className="newsPage__posts">
                    <PostList
                        posts={posts}
                        onPostIdShow={handlePostIdShow}
                        onClickTag={handleClickTag}
                        withInformationBlock
                    />
                    {isLoading && <PostSkeleton marginTop={posts ? '16px' : '0px'} />}
                </div>
            </div>
            <>{getPostByIdModal()}</>
        </div>
    );
}

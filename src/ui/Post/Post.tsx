import React from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '../Card';
import Like from '../Like';
import TagList from '../Tag';
import {IPostTransform} from '../../store/api/types';
import {IInformationBlock} from '../types/types';
import {useAppSelector} from '../../store/store';
import {getIsEditPost} from '../../store/features/userSuncks';
import PostSkeleton from './PostSkeleton';
import PostHeader from './PostHeader';
import './Post.scss';

interface IPostProps {
    urlAvatar?: string;
    informationBlock?: IInformationBlock;
    postTransformed: IPostTransform;
    onEditPost?: (post: IPostTransform) => void;
    onPostIdShow?: (post: number) => void;
    withoutCard?: boolean;
    imgPostSqueeze?: boolean;
    prefixClass?: string;
    isPostPage?: boolean;
}

const CLASS_POST_IMG = 'Post__img';
const CLASS_POST_IMG_SQUEEZE = 'Post__img Post__img_squeeze';

export default function Post({isPostPage, postTransformed, imgPostSqueeze, withoutCard, onPostIdShow, prefixClass = '', ...other}: IPostProps) {
    const {isLoading: isLoadingEditPost, id: idEditPost} = useAppSelector(getIsEditPost());
    const navigate = useNavigate();

    const getPaddingCard = () => {
        if (!other.informationBlock) {
            return '0px 16px 16px 16px';
        }
        return undefined;
    };

    const handleClick = () => {
        if (!isPostPage && onPostIdShow) {
            onPostIdShow(postTransformed.id);
            //navigate(`/news/${postTransformed.id}`);
        }
    };
    const onKeyPressHandler = () => {};

    if (isLoadingEditPost) {
        if (idEditPost === postTransformed.id) {
            return <PostSkeleton marginBottom="16px" />;
        }
    }

    const classNamePostImg = imgPostSqueeze ? CLASS_POST_IMG_SQUEEZE : CLASS_POST_IMG;

    return (
        <div className="Post">
            <Card
                padding={getPaddingCard()}
                isHide={withoutCard}
            >
                <div className="Post__container">
                    {other.informationBlock && (
                        <PostHeader
                            postTransformed={postTransformed}
                            {...other}
                        />
                    )}

                    <div
                        className={`Post__clickArea ${prefixClass}Post__clickArea`}
                        onClick={handleClick}
                        onKeyPress={onKeyPressHandler}
                        role="button"
                        tabIndex={0}
                    >
                        {postTransformed.imageUrl && (
                            <div className={`Post__containerImg ${prefixClass}Post__containerImg`}>
                                <img
                                    className={classNamePostImg}
                                    src={postTransformed.imageUrl}
                                    alt="postImg"
                                />
                            </div>
                        )}

                        <h2 className={`Post__title ${prefixClass}Post__title`}>{postTransformed.title}</h2>
                        <p className="Post__text">{postTransformed.text}</p>
                    </div>

                    <div className="Post__tegs">
                        <TagList tags={postTransformed.tags} />
                    </div>

                    <div className="Post__bottom">
                        <div className="Post__likes">
                            <Like
                                postId={postTransformed.id}
                                count={postTransformed.likesCount}
                                isLiked={postTransformed.isLiked}
                            />
                        </div>
                        <div className="Post__date">
                            <time>{postTransformed.createTime}</time>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

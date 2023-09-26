import React from 'react';
import Avatar from '../Avatar';
import Card from '../Card';
import Like from '../Like';
import PopUp from '../Pop-up';
import TagList from '../Tag';
import {ITag} from '../../store/api/types';
import {IInformationBlock, IItem} from '../types/types';
import './Post.scss';

interface IPostProps {
    informationBlock?: IInformationBlock;
    urlImg?: string;
    title: string;
    text: string;
    tags: ITag[];
    countLikes: number;
    isLiked: boolean;
    date: string;
    postId: number;
}

export default function Post({informationBlock, urlImg, title, text, tags, countLikes, isLiked, date, postId}: IPostProps) {
    const handleDelete = () => {};
    const handleChage = () => {};
    const handleAttach = () => {};

    const ITEMS: IItem[] = [
        {text: 'Редактировать пост', addClass: '', action: handleChage},
        {text: 'Закрепить пост', addClass: '', action: handleAttach},
        {text: 'Удалить пост', addClass: 'red', action: handleDelete},
    ];

    const getPaddingCard = () => {
        if (!informationBlock) {
            return '0px 16px 16px 16px';
        }
        return undefined;
    };

    return (
        <div className="Post">
            <Card padding={getPaddingCard()}>
                <div className="Post__container">
                    {informationBlock && (
                        <div className="Post__header">
                            <Avatar
                                informationBlock={informationBlock}
                                withInformationBlock
                                size={50}
                            />
                            <div className="Post__menu">
                                <figure className="Post__attacher">
                                    <img
                                        className="Post__imgAttacher"
                                        src="./icons/pin.svg"
                                        alt="attach"
                                    />
                                </figure>
                                <div className="Post__popUp">
                                    <PopUp items={ITEMS} />
                                </div>
                            </div>
                        </div>
                    )}

                    {urlImg && (
                        <div className="Post__containerImg">
                            <img
                                className="Post__img"
                                src={urlImg}
                                alt="postImg"
                            />
                        </div>
                    )}

                    <h2 className="Post__title">{title}</h2>
                    <p className="Post__text">{text}</p>

                    <div className="Post__tegs">
                        <TagList tags={tags} />
                    </div>

                    <div className="Post__bottom">
                        <div className="Post__likes">
                            <Like
                                postId={postId}
                                count={countLikes}
                                isLiked={isLiked}
                            />
                        </div>
                        <div className="Post__date">
                            <time>{date}</time>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

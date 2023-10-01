import React from 'react';
import {useToggleLikeMutation} from '../../store/api/postApi';
import './Like.scss';

interface ILikeProps {
    count: number;
    isLiked: boolean;
    postId: number;
}

const URL_SVG_EMPTY_HEART = '../icons/heart.svg';
const URL_SVG_FILL_HEART = '../icons/fillheart.svg';

export default function Like({count, isLiked, postId}: ILikeProps) {
    const [isLike, setIsLike] = React.useState<boolean>(isLiked);
    const [countLikes, setCountLikes] = React.useState<number>(count);
    const [toggleLike, {data, isSuccess}] = useToggleLikeMutation();
    const onKeyPress = () => {};

    const handleToggleLike = async () => {
        try {
            await toggleLike(postId);
        } catch (error) {
            console.log(error);
        }
    };

    const getIcon = () => {
        if (isLike) {
            return URL_SVG_FILL_HEART;
        }
        return URL_SVG_EMPTY_HEART;
    };

    React.useEffect(() => {
        if (data && isSuccess) {
            setIsLike((prev) => !prev);
            setCountLikes(data.likesCount);
        }
    }, [data]);

    return (
        <div className="Like">
            <div className="Like__container">
                <div
                    className="Like__imgContainer"
                    onKeyPress={onKeyPress}
                    onClick={handleToggleLike}
                    role="button"
                    tabIndex={0}
                >
                    <img
                        className="Like__img"
                        src={getIcon()}
                        alt="like"
                    />
                </div>
                <div className="Like__count">{countLikes}</div>
            </div>
        </div>
    );
}

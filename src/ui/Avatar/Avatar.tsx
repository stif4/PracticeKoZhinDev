import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {IInformationBlock} from '../types/types';
import './Avatar.scss';

interface IAvatar {
    informationBlock?: IInformationBlock;
    withInformationBlock?: boolean;
    withOnline?: boolean;
    urlImg?: string;
    size?: number;
    isLoading?: boolean;
}

export default function Avatar({informationBlock, withInformationBlock, withOnline, urlImg, size, isLoading}: IAvatar) {
    const {firstName, lastName, nickname} = {...informationBlock};

    const resizeImgAvatar = () => {
        if (size) {
            return {width: `${size}px`, height: `${size}px`};
        }
        return undefined;
    };

    const getImg = () => {
        if (isLoading) {
            return (
                <Skeleton
                    circle
                    className="Avatar__withImg"
                />
            );
        }
        if (urlImg) {
            return (
                <img
                    className="Avatar__withImg"
                    src={urlImg}
                    alt="avatar"
                />
            );
        }
        return (
            <div className="Avatar__withoutImg">{firstName && lastName && <p className="Avatar__textImg">{`${firstName[0]}${lastName[0]}`}</p>}</div>
        );
    };

    const getFI = () => {
        if (lastName && lastName) {
            return `${firstName} ${lastName}`;
        }
        return <Skeleton />;
    };

    const getNick = () => {
        if (nickname) {
            return `@${nickname}`;
        }
        return <Skeleton />;
    };

    return (
        <div className="Avatar">
            <div className="Avatar__container">
                <div className="Avatar__imageBlock">
                    <div
                        className="Avatar__img"
                        style={resizeImgAvatar()}
                    >
                        {getImg()}
                    </div>

                    {withOnline && (
                        <div className="Avatar__online">
                            <div className="Avatar__cercle" />
                        </div>
                    )}
                </div>

                {withInformationBlock && (
                    <div className="Avatar__informationBlock">
                        <h2 className="Avatar__FI">{getFI()}</h2>
                        <p className="Avatar__nick">{getNick()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

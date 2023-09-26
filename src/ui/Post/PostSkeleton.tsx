import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Avatar from '../Avatar';
import Card from '../Card';
import './Post.scss';

interface IPostSkeletonProps {
    marginTop?: string;
    marginBottom?: string;
}

export default function PostSkeleton({marginTop = '0px', marginBottom = '0px'}: IPostSkeletonProps) {
    return (
        <div
            className="Post"
            style={{marginTop, marginBottom}}
        >
            <Card>
                <div className="Post__container">
                    <div className="Post__header">
                        <Avatar
                            size={50}
                            isLoading
                        />
                        <div className="Post__menu">
                            <figure className="Post__attacher">
                                <Skeleton />
                            </figure>
                        </div>
                    </div>

                    <Skeleton style={{width: '100%', height: '150px'}} />

                    <h2 className="Post__title">
                        <Skeleton />
                    </h2>

                    <p className="Post__text">
                        <Skeleton />
                    </p>

                    <div className="Post__tegs">
                        <Skeleton />
                    </div>

                    <div className="Post__bottom">
                        <div className="Post__likes">
                            <Skeleton />
                        </div>
                        <div className="Post__date">
                            <time>
                                <Skeleton />
                            </time>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

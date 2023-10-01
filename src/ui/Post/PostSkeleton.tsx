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
                    <div
                        className="Post__header"
                        style={{marginBottom: '16px'}}
                    >
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

                    <Skeleton
                        style={{width: '100%', height: '120px'}}
                        borderRadius={8}
                    />

                    <h2
                        className="Post__title"
                        style={{marginTop: '16px'}}
                    >
                        <Skeleton width="40%" />
                    </h2>

                    <p className="Post__text">
                        <Skeleton height={50} />
                    </p>

                    <div
                        className="Post__tags"
                        style={{display: 'flex'}}
                    >
                        <div style={{width: '12%', marginRight: '8px'}}>
                            <Skeleton
                                className="postPageSkeleton__tag"
                                borderRadius={4}
                            />
                        </div>
                        <div style={{width: '12%', marginRight: '8px'}}>
                            <Skeleton
                                className="postPageSkeleton__tag"
                                borderRadius={4}
                            />
                        </div>
                        <div style={{width: '12%', marginRight: '8px'}}>
                            <Skeleton
                                className="postPageSkeleton__tag"
                                borderRadius={4}
                            />
                        </div>
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

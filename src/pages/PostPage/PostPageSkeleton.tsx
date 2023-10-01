import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '../../ui/Card';
import './PostPageSkeleton.scss';

export default function PostPageSkeleton() {
    return (
        <div className="postPageSkeleton">
            <div className="postPageSkeleton__container">
                <div className="postPageSkeleton__post">
                    <Skeleton
                        className="postPageSkeleton__img"
                        borderRadius={18}
                    />

                    <Skeleton
                        className="postPageSkeleton__title"
                        width="50%"
                    />

                    <Skeleton className="postPageSkeleton__text" />

                    <div className="postPageSkeleton__tags">
                        <div style={{width: '12%'}}>
                            <Skeleton
                                className="postPageSkeleton__tag"
                                borderRadius={4}
                            />
                        </div>
                        <div style={{width: '12%'}}>
                            <Skeleton
                                className="postPageSkeleton__tag"
                                borderRadius={4}
                            />
                        </div>
                        <div style={{width: '12%'}}>
                            <Skeleton
                                className="postPageSkeleton__tag"
                                borderRadius={4}
                            />
                        </div>
                    </div>

                    <div className="postPageSkeleton__creatorContainer">
                        <Card padding="12px 16px 12px 16px">
                            <div className="postPageSkeleton__avatar">
                                <div className="postPageSkeleton__imgAvatar">
                                    <Skeleton
                                        circle
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="postPageSkeleton__creatorContainer">
                        <Card padding="12px 16px 12px 16px">
                            <div style={{display: 'flex', width: '100%'}}>
                                <div className="">
                                    <div className="postPageSkeleton__avatar">
                                        <div className="postPageSkeleton__imgAvatar">
                                            <Skeleton
                                                circle
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginLeft: '12px'}}>
                                    <div>
                                        <Skeleton
                                            width="40%"
                                            height="20px"
                                        />
                                    </div>
                                    <div style={{marginTop: '8px'}}>
                                        <Skeleton
                                            width="100%"
                                            height="40px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="postPageSkeleton__creator">{}</div>
                <div className="postPageSkeleton__commentBlock">{}</div>
            </div>
        </div>
    );
}

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from '../../ui/Card';

export default function SubscriptionsUserSkeleton() {
    return (
        <div style={{marginBottom: '16px'}}>
            <Card padding="12px 16px 12px 16px">
                <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '20%'}}>
                        <div style={{width: '50px', height: '50px'}}>
                            <Skeleton
                                circle
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginLeft: '12px'}}>
                        <div>
                            <Skeleton
                                width="80%"
                                height="30px"
                            />
                        </div>
                        <div style={{marginTop: '8px'}}>
                            <Skeleton
                                width="50%"
                                height="20px"
                            />
                        </div>
                    </div>
                    <div style={{width: '20%'}}>
                        <div style={{width: '40px', height: '40px'}}>
                            <Skeleton
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

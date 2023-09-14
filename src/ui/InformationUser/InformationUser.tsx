import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Avatar from '../Avatar';
import PopUp from '../Pop-up';
import {IInformationBlock, IItem} from '../types/types';
import Card from '../Card';
import './informationUser.scss';
import '../../pages/Profile/Profile.scss';

interface IInformationUser {
    informationBlock: IInformationBlock;
    items: IItem[];
    urlAvatar: string | undefined;
    discription: string | null;
    children: React.ReactNode;
    isLoadingAvatar: boolean;
}

export default function InformationUser({informationBlock, items, children, urlAvatar, discription, isLoadingAvatar}: IInformationUser) {
    return (
        <div className="informationUser">
            <Card>
                <div className="informationUser__container">
                    <div className="informationUser__up">
                        <div className="informationUser__avatar">
                            <Avatar
                                urlImg={urlAvatar}
                                isLoading={isLoadingAvatar}
                                informationBlock={informationBlock}
                                withOnline={!isLoadingAvatar}
                                withInformationBlock
                                size={50}
                            />
                        </div>
                        <div className="informationUser__menu">
                            <PopUp items={items} />
                        </div>
                    </div>
                    <div className="informationUser__description">
                        <p className="informationUser__textDescroption">{discription}</p>
                    </div>
                    <div className="informationUser__bottom">{children}</div>
                </div>
            </Card>
        </div>
    );
}

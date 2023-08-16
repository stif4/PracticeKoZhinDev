import React from 'react';
import Button from '../Button/Button';
import Tab from './Tab';
import './TabsChoice.scss';

interface ITabsChoice {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    labels: string[];
}

export default function TabsChoice({onClick, labels}: ITabsChoice) {
    const onKeyPressHandler = () => {};
    const [activeTab, setIsActiveTab] = React.useState<number>(-1);

    return (
        <div className="TabsChoice">
            <div className="TabsChoice__container">
                <Tab
                    className="TabsChoice__tab"
                    onClick={onClick}
                    onKeyPressHandler={onKeyPressHandler}
                    label={labels[0]}
                    tabIndex={-1}
                    isActive={activeTab === -1}
                />
                <Tab
                    className="TabsChoice__tab"
                    onClick={onClick}
                    onKeyPressHandler={onKeyPressHandler}
                    label={labels[1]}
                    tabIndex={0}
                    isActive={activeTab === 0}
                />
            </div>
        </div>
    );
}

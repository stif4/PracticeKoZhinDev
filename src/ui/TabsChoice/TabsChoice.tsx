import React from 'react';
import {NavLink} from 'react-router-dom';
import {ILabelTab} from '../../pages/AuthPage/AuthPage';
import Tab from './Tab';
import './TabsChoice.scss';

interface ITabsChoice {
    onChange: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    labels: ILabelTab[];
    activeTab: string;
}

export default function TabsChoice({onChange, labels, activeTab}: ITabsChoice) {
    const onKeyPressHandler = () => {};

    return (
        <div className="TabsChoice">
            <div className="TabsChoice__container">
                {labels.map((label) => (
                    <NavLink
                        className="TabsChoice__link"
                        to={label.path}
                        key={label.id}
                    >
                        <Tab
                            className="TabsChoice__tab"
                            onClick={onChange}
                            onKeyPressHandler={onKeyPressHandler}
                            label={label.label}
                            isActive={label.id === activeTab}
                            id={label.id}
                        />
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

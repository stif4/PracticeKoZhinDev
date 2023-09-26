import React from 'react';
import {NavLink} from 'react-router-dom';
import {ILabelTab, TAuth} from '../../pages/AuthPage/AuthPage';
import Tab from './Tab';
import './TabsChoice.scss';

interface ITabsChoiceProps {
    onChange: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    labels: ILabelTab[];
    activeTab: TAuth;
}

export default function TabsChoice({onChange, labels, activeTab}: ITabsChoiceProps) {
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

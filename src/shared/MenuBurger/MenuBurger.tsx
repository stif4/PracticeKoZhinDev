import React from 'react';
import MenuList from './views/MenuList';
import {IMenuArrayItem} from '../Header/Header';
import './MenuBurger.scss';

interface IMenuBurger {
    menuItems: IMenuArrayItem[];
    isActive: boolean;
}

const MENU_BURGER_DEFULT = 'MenuBurger ';
const MENU_BURGER_ACTIVE = 'MenuBurger MenuBurger_active';

export default function MenuBurger({menuItems, isActive}: IMenuBurger) {
    const className = isActive ? MENU_BURGER_ACTIVE : MENU_BURGER_DEFULT;

    return (
        <div className={className}>
            <div className="MenuBurger__container">
                <div className="MenuBurger__main">
                    <ul className="MenuBurger__list">
                        <MenuList menuItems={menuItems} />
                    </ul>
                </div>
                <div className="MenuBurger__bottom">
                    <div className="MenuBurger__decorLine" />
                    <p className="MenuBurger__logOut">Выйти из аккаунта</p>
                </div>
            </div>
        </div>
    );
}

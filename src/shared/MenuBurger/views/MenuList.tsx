import React from 'react';
import {NavLink} from 'react-router-dom';
import {IMenuArrayItem} from '../../Header/Header';
import '../MenuBurger.scss';

interface IMenuList {
    menuItems: IMenuArrayItem[];
    closeMenu: () => void;
}

const ITEM_DFULLT = 'MenuBurger__item';
const ITEM_ACTIVE = 'MenuBurger__item MenuBurger__item_active';

export default function MenuList({menuItems, closeMenu}: IMenuList) {
    const getClassNameNavLink = (isActive: boolean) => (isActive ? ITEM_ACTIVE : ITEM_DFULLT);
    return (
        <>
            {menuItems.map((item) => (
                <NavLink
                    key={item.alt}
                    to={item.path}
                    end
                    className={({isActive}) => getClassNameNavLink(isActive)}
                    onClick={closeMenu}
                >
                    <img
                        className="MenuBurger__icon"
                        src={item.img}
                        alt={item.alt}
                    />
                    <p className="MenuBurger__text">{item.label}</p>
                </NavLink>
            ))}
        </>
    );
}

import React from 'react';
import {useNavigate} from 'react-router-dom';
import MenuList from './views/MenuList';
import {IMenuArrayItem} from '../Header/Header';
import './MenuBurger.scss';
import {logOut} from '../../store/features/userSlice';
import {useAppDispatch} from '../../store/store';

interface IMenuBurger {
    menuItems: IMenuArrayItem[];
    isActive: boolean;
    closeMenu: () => void;
}

const MENU_BURGER_DEFULT = 'MenuBurger ';
const MENU_BURGER_ACTIVE = 'MenuBurger MenuBurger_active';

export default function MenuBurger({menuItems, isActive, closeMenu}: IMenuBurger) {
    const className = isActive ? MENU_BURGER_ACTIVE : MENU_BURGER_DEFULT;
    const navigate = useNavigate();
    const onKeyPressHandler = () => {};
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(logOut());
        closeMenu();
        navigate('/');
    };

    return (
        <div className={className}>
            <div className="MenuBurger__container">
                <div className="MenuBurger__main">
                    <ul className="MenuBurger__list">
                        <MenuList
                            menuItems={menuItems}
                            closeMenu={closeMenu}
                        />
                    </ul>
                </div>
                <div className="MenuBurger__bottom">
                    <div className="MenuBurger__decorLine" />
                    <div
                        className="MenuBurger__logOut"
                        onKeyPress={onKeyPressHandler}
                        onClick={handleClick}
                        role="button"
                        tabIndex={0}
                    >
                        Выйти из аккаунта
                    </div>
                </div>
            </div>
        </div>
    );
}

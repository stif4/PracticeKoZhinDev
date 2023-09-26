import React from 'react';
import {useNavigate} from 'react-router-dom';
import MenuList from './views/MenuList';
import {IMenuArrayItem} from '../Header/Header';
import './MenuBurger.scss';
import {logOut} from '../../store/features/userSuncks';
import {useAppDispatch} from '../../store/store';
import {ROUTE_HOME} from '../../constants/routes';
import SlidePaper from '../Modal/SlidePaper';

interface IMenuBurgerProps {
    menuItems: IMenuArrayItem[];
    isActive: boolean;
    closeMenu: () => void;
}

export default function MenuBurger({menuItems, isActive, closeMenu}: IMenuBurgerProps) {
    const navigate = useNavigate();
    const onKeyPressHandler = () => {};
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(logOut());
        closeMenu();
        navigate(ROUTE_HOME);
    };

    return (
        <SlidePaper isActive={isActive}>
            <nav className="MenuBurger">
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
            </nav>
        </SlidePaper>
    );
}

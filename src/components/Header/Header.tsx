import React from 'react';
import Button from '../Button/Button';
import MenuBurger from '../MenuBurger/MenuBurger';
import './Header.scss';

export interface IMenuArrayItem {
    path: string;
    img: string;
    alt: string;
    label: string;
}

const MENU_ITEMS: IMenuArrayItem[] = [
    {
        path: '/news',
        img: '/icons/menu/home.svg',
        alt: 'home',
        label: 'Новости',
    },
    {
        path: '/user/subscriptions',
        img: '/icons/menu/group.svg',
        alt: 'group',
        label: 'Подписки',
    },
    {
        path: '/user',
        img: '/icons/menu/user.svg',
        alt: 'user',
        label: 'Профиль',
    },
];

const PATH_MENU_ACTIVE = '/icons/сrossMenu.svg';
const PATH_MENU_NOT_ACTIVE = '/icons/menu.svg';

export default function Header() {
    // const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     console.log(e.currentTarget.tabIndex);
    // };
    /* <TabsChoice onClick={handleChange} labels={['Логин', 'Регистрация']}/> */

    const [isActiveMenu, setIsActiveMenu] = React.useState<boolean>(false);

    const getPathMenu = () => isActiveMenu ? PATH_MENU_ACTIVE : PATH_MENU_NOT_ACTIVE;

    const handleChange = () => {};
    const onKeyPressHandler = () => {};
    const toggleMenuHandler = () => {
        setIsActiveMenu((prev) => !prev);
    };

    const isLogin = false;

    const getAvatar = () => {
        if (isLogin) {
            return (
                <img
                    className="Header__imgAvata"
                    src="https://i.pinimg.com/originals/d5/e9/39/d5e939dfd5ec2c95ce8cd1844d11c1ad.jpg"
                    alt="avatar"
                />
            );
        }

        return (
            <Button
                className="Button Button_empty Button_empty_colorGray Button_empty_colorGray_small"
                label="Войти"
                onClick={handleChange}
            />
        );
    };

    return (
        <>
            <header className="Header">
                <div className="Header__container">
                    <div className="Header__logo">
                        <img
                            className="Header__imgLogo"
                            src="/icons/logo.svg"
                            alt="logo"
                        />
                    </div>
                    <div className="Header__tabs">
                        <div className="Header__login">{getAvatar()}</div>
                        <div
                            className="Header__menu"
                            onKeyPress={onKeyPressHandler}
                            onClick={toggleMenuHandler}
                            role="button"
                            tabIndex={0}
                        >
                            <img
                                className="Header__imgMenu"
                                src={getPathMenu()}
                                alt="menu"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <MenuBurger
                menuItems={MENU_ITEMS}
                isActive={isActiveMenu}
            />
        </>
    );
}

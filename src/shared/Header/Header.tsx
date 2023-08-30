import React from 'react';
import {NavLink} from 'react-router-dom';
import fetchService from '../../service/fetch.service';
import {getMe} from '../../store/features/userSlice';
import {useAppSelector} from '../../store/store';
import Button from '../../ui/Button/Button';
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
const BUTTON_CLASS_NAME = 'Button__main Button__main_empty Button__main_empty_colorGray Button__main_empty_colorGray_small';
const URL_IMAGE_BASE = 'https://i.pinimg.com/originals/d5/e9/39/d5e939dfd5ec2c95ce8cd1844d11c1ad.jpg';

export default function Header() {
    const [isActiveMenu, setIsActiveMenu] = React.useState<boolean>(false);
    const [avatar, setAvatar] = React.useState<string>(URL_IMAGE_BASE);
    const me = useAppSelector(getMe());
    const onKeyPressHandler = () => {};
    const getPathMenu = () => (isActiveMenu ? PATH_MENU_ACTIVE : PATH_MENU_NOT_ACTIVE);

    const parseAvatar = async () => {
        if (me) {
            const url = await fetchService().fetchFile(me.avatarId);
            setAvatar(url);
        }
    };

    React.useEffect(() => {
        if (me && me.avatarId) {
            parseAvatar();
        }
    }, [me]);

    const toggleMenuHandler = () => {
        setIsActiveMenu((prev) => !prev);
    };

    const getAvatar = () => {
        if (me) {
            return (
                <img
                    className="Header__imgAvata"
                    src={avatar}
                    alt="avatar"
                />
            );
        }
        return (
            <NavLink to="/auth">
                <Button
                    className={BUTTON_CLASS_NAME}
                    label="Войти"
                />
            </NavLink>
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
                        {me && (
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
                        )}
                    </div>
                </div>
            </header>
            <MenuBurger
                menuItems={MENU_ITEMS}
                isActive={isActiveMenu}
                closeMenu={toggleMenuHandler}
            />
        </>
    );
}

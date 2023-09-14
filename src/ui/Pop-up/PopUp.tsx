import React from 'react';
import {IItem} from '../types/types';
import './PopUp.scss';

interface IPopUp {
    items: IItem[];
}

const ITEM_CLASS_RED = 'PopUp__item_red';

const CLASS_MENU_ACTIVE = 'PopUp__menu PopUp__menu_active';
const CLASS_MENU_DEFULT = 'PopUp__menu';

export default function PopUp({items}: IPopUp) {
    const [isShow, setIsShow] = React.useState<boolean>(false);

    const classMenu = isShow ? CLASS_MENU_ACTIVE : CLASS_MENU_DEFULT;

    const handleClick = () => {
        setIsShow((prev) => !prev);
    };

    const handleClickItem = (item: IItem, event: React.MouseEvent<HTMLElement>) => {
        setIsShow((prev) => !prev);
        if (item.action) {
            item.action(event);
        }
    };

    const onKeyPressHandler = () => {};

    return (
        <div className="PopUp">
            <div className="PopUp__container">
                <div
                    className="PopUp__img"
                    onClick={handleClick}
                    onKeyPress={onKeyPressHandler}
                    role="button"
                    tabIndex={0}
                >
                    <img
                        className="PopUp__icon"
                        src="/icons/threedots.svg"
                        alt="menuThreeDots"
                    />
                </div>
                <div className={classMenu}>
                    <ul className="PopUp__items">
                        {items.map((item) => {
                            const classItem = item.addClass === 'red' ? ITEM_CLASS_RED : '';
                            return (
                                <div
                                    key={item.text}
                                    className={`PopUp__item ${classItem}`}
                                    onClick={(e) => handleClickItem(item, e)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={onKeyPressHandler}
                                >
                                    {item.text}
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

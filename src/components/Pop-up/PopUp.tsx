import React from 'react';
import {IItem} from '../FileLoader/FileShow';
import './PopUp.scss';

interface IPopUp {
    items: IItem[];
}

const ITEM_CLASS_RED = 'PopUp__item_red';
const INITIAL_SHOW_POP_UP = false;

export default function PopUp({items}: IPopUp) {
    const [isShow, setIsShow] = React.useState<boolean>(INITIAL_SHOW_POP_UP);

    const handleClick = () => {
        setIsShow((prev) => !prev);
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
                {isShow && (
                    <div className="PopUp__menu">
                        <ul className="PopUp__items">
                            {items.map((item) => {
                                const classItem = item.addClass === 'red'
                                    ? ITEM_CLASS_RED
                                    : '';
                                return (
                                    <li
                                        key={item.text}
                                        className={`PopUp__item ${classItem}`}
                                    >
                                        {item.text}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

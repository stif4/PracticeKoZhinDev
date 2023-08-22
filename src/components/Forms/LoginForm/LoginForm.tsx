import React, {useState} from 'react';
import Button from '../../Button/Button';
import CheckBox from '../../CheckBox/CheckBox';
import Error from '../../Error';
import Input from '../../Input';

import './LoginForm.scss';

const PATH_ICON_FILL = '/icons/checkbox.svg';
const PATH_ICON_EMPTY = '/icons/checkboxEmpty.svg';
const PATH_ICONS = [PATH_ICON_EMPTY, PATH_ICON_FILL];
const INITIAL_VALUE = 'checked';

export default function LoginForm() {
    const value = '';
    const [error, setError] = useState<boolean>(true);
    const [check, setCheck] = useState<'checked' | 'notChecked'>(INITIAL_VALUE);

    const handleChange = () => {};
    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = e.currentTarget.id as 'checked' | 'notChecked';
        setCheck(id === 'checked' ? 'notChecked' : 'checked');
    };

    const onKeyPressHandler = () => {};
    const handleSubbmit = (e: React.MouseEvent<HTMLElement>) => {
        if (e) {
            e.preventDefault();
        }
    };

    return (
        <form className="LoginForm">
            <div className="LoginForm__container">
                <div className="LoginForm__input">
                    <Input
                        label="Email"
                        onChange={handleChange}
                        name="Email"
                        value="value"
                        error={error}
                        placeholder="Введите Email"
                    />
                </div>
                <div className="LoginForm__input">
                    <Input
                        label="Пароль"
                        onChange={handleChange}
                        name="password"
                        type="password"
                        value="Sdqwe"
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="LoginForm__checkBox">
                    <CheckBox
                        onClick={onClick}
                        label="Запомни меня"
                        onKeyPressHandler={onKeyPressHandler}
                        value={check}
                        pathsIcons={PATH_ICONS}
                    />
                </div>
                <div className="LoginForm__button">
                    <Button
                        label="Войти"
                        className=''
                        onClick={handleSubbmit}
                    />
                </div>
                {error && (
                    <div className="LoginForm__Error">
                        <Error
                            place="login"
                            message="User not found"
                        />
                    </div>
                )}
            </div>
        </form>
    );
}

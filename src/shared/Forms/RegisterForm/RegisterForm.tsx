import React, {useState} from 'react';
import Button from '../../../ui/Button/Button';
import FileLoder from '../../../ui/FileLoader/FileLoader';
import Input from '../../../ui/Input';
import TextArea from '../../../ui/TextArea';
import './RegisterForm.scss';

const INITIAL_VALUE = 'checked';

export default function RegisterForm() {
    const [check, setCheck] = useState<'checked' | 'notChecked'>(INITIAL_VALUE);
    const handleChange = () => {};
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};
    const onKeyPressHandler = () => {};
    const handleSubbmit = (e: React.MouseEvent<HTMLElement>) => {
        if (e) {
            e.preventDefault();
        }
    };

    return (
        <form className="RegisterForm">
            <div className="RegisterForm__container">
                <div className="RegisterForm__input">
                    <Input
                        label="Имя"
                        onChange={handleChange}
                        name="userName"
                        value="value"
                        placeholder="Введите имя"
                    />
                </div>
                <div className="RegisterForm__input">
                    <Input
                        label="Фамилия"
                        onChange={handleChange}
                        name="userSurname"
                        value="value"
                        placeholder="Введите фамилию"
                    />
                </div>
                <div className="RegisterForm__input">
                    <Input
                        label="Email"
                        onChange={handleChange}
                        name="Email"
                        value="value"
                        placeholder="Введите Email"
                    />
                </div>
                <div className="RegisterForm__input">
                    <Input
                        label="Пароль"
                        onChange={handleChange}
                        name="password"
                        type="password"
                        value="Sdqwe"
                        withProgress
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="RegisterForm__fileLoader">
                    <FileLoder />
                </div>
                <div className="RegisterForm__textArea">
                    <TextArea
                        onChange={handleChange}
                        value=""
                        name="textArea"
                        placeholder="Расскажи о себе"
                        label="Описание профиля"
                        onClick={handleClick}
                    />
                </div>
                <div className="RegisterForm__button">
                    <Button
                        label="Войти"
                        onClick={handleSubbmit}
                    />
                </div>
            </div>
        </form>
    );
}

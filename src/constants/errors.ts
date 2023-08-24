const USER_NOT_FOUND = 'User not found';
const INCORRECT_EMAIL = 'Email must be an email';
const PASSWORD_EMPTY = 'Password should not be empty';
const PASSWORD_LENGTH = 'Password must be longer than or equal to 4 characters';
const USER_EXISTS = 'This user already exists';
const FILE_NOT_FOUND = 'File not found';

export const ERROR_OBJECT = {
    [USER_NOT_FOUND]: 'aвторизации/Пользователь не найден',
    [INCORRECT_EMAIL]: 'aвторизации/Не корректный Email',
    [PASSWORD_EMPTY]: 'aвторизации/Поле пароля не должено быть пустым',
    [PASSWORD_LENGTH]: 'aвторизации/Длина пароля 4 символа',
    [USER_EXISTS]: 'aвторизации/Пользователь уже зарегестрирован',
    [FILE_NOT_FOUND]: '/Файл не найден',
};

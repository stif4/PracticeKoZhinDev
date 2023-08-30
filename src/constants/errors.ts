const USER_NOT_FOUND = 'User not found';
const INCORRECT_EMAIL = 'Email must be an email';
const PASSWORD_EMPTY = 'Password should not be empty';
const PASSWORD_SHORT_LENGTH = 'Password must be longer than or equal to 4 characters';
const PASSWORD_LONG_LENGTH = 'Password must be shorten than or equal to 16 characters';
const USER_EXISTS = 'This user already exists';
const FILE_NOT_FOUND = 'File not found';
const LASTNAME_SHORT_LENGTH = 'Lastname must be longer than or equal to 2 characters';
const LASTNAME_LONG_LENGTH = 'Lastname must be shorten than or equal to 16 characters';
const EMPTY_FIELD = 'Fill in the empty fields';

export const ERROR_OBJECT = {
    [USER_NOT_FOUND]: 'Пользователь не найден',
    [INCORRECT_EMAIL]: 'Не корректный Email',
    [PASSWORD_EMPTY]: 'Поле пароля не должено быть пустым',
    [PASSWORD_SHORT_LENGTH]: 'Длина пароля не менее 4 символов',
    [PASSWORD_LONG_LENGTH]: 'Длина пароля не более 16 символов',
    [LASTNAME_LONG_LENGTH]: 'Длина фамилии не более 16 символов',
    [LASTNAME_SHORT_LENGTH]: 'Длина фамилии не менее 2 символов',
    [EMPTY_FIELD]: 'Заполните пустые поля',
    [USER_EXISTS]: 'Пользователь уже зарегестрирован',
    [FILE_NOT_FOUND]: 'Файл не найден',
};

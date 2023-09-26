import * as yup from 'yup';

//eslint-disable-next-line
const EMAIL_REGULAR =
    //eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateStringIsEmpty = yup.string().required('Fill in the empty fields');
export const validateEmail = yup.string().required('Email must be an email').matches(EMAIL_REGULAR, 'Email must be an email');
export const validatePassword = yup
    .string()
    .required('Fill in the empty fields')
    .min(4, 'Password must be longer than or equal to 4 characters')
    .max(16, 'Password must be shorten than or equal to 16 characters');
export const validatelastName = yup
    .string()
    .required('Fill in the empty fields')
    .min(2, 'Lastname must be longer than or equal to 2 characters')
    .max(16, 'Lastname must be shorten than or equal to 16 characters');
export const validateArray = yup.array().min(1, 'Укажите значение');
export const validatePostTitle = yup.string().required('Fill in the empty fields').min(5, 'title must be longer than or equal to 5 characters');
export const validatePostText = yup
    .string()
    .required('Fill in the empty fields')
    .min(10, 'text must be longer than or equal to 10 characters');

import React from 'react';
import {ObjectSchema, ValidationError} from 'yup';

export function getErrors<T>(error: ValidationError) {
    const {inner} = error;
    const errors: {[key in keyof T]?: string} = {};
    if (inner) {
        inner.forEach((err) => {
            errors[err.path as keyof T] = err.message;
        });
    }
    return errors;
}

export function useValidate<T>(
    obj: T,
    schema: ObjectSchema<any>,
): [boolean, {[key in keyof T]?: string} | undefined, () => Promise<boolean>, boolean, () => void, (someError: string, key: string) => void] {
    const [isValid, setIsValid] = React.useState<boolean>(true);
    const [isCheckValid, setIsCheckValid] = React.useState<boolean>(false);
    const [errorsValidate, setErrorsValidated] = React.useState<{[key in keyof T]?: string} | undefined>(undefined);

    const resetError = () => {
        setErrorsValidated(undefined);
        setIsCheckValid(false);
    };

    const addSomeErrors = (someError: string, key: string) => {
        setErrorsValidated((errors) => ({...errors, [key]: someError}));
        setIsValid(false);
    };

    const checkValid = async () => {
        try {
            const res = await schema.validate(obj, {abortEarly: false});
            setIsValid(true);
            setErrorsValidated(undefined);
            setIsCheckValid(false);
            return true;
        } catch (e) {
            setIsValid(false);
            setIsCheckValid(true);
            const errors = getErrors<T>(e as ValidationError);
            setErrorsValidated(errors);
            return false;
        }
    };
    return [isValid, errorsValidate, checkValid, isCheckValid, resetError, addSomeErrors];
}

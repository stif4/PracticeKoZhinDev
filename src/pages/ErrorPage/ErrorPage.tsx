import React from 'react';
import {useRouteError, isRouteErrorResponse} from 'react-router-dom';

export default function ErrorPage() {
    const [errorMessage, setErrormessage] = React.useState<string>('');
    const error = useRouteError();

    React.useEffect(() => {
        if (isRouteErrorResponse(error)) {
            if (error.status === 401) {
                setErrormessage('Такой страницы нет, ебанбобан!');
            }
            if (error.status === 400) {
                setErrormessage('Не верный запрос');
            }
        }
        setErrormessage('');
    }, [error]);

    return (
        <div className="ErrorPage">
            <div
                className="ErrorPage__contaier"
                style={{display: 'flex', justifyContent: 'center', marginTop: '24px', fontSize: '16px'}}
            >
                <p>Такой страницы нет, ебанбобан!</p>
            </div>
        </div>
    );
}

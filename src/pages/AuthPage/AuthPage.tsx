import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ROUTE_HOME} from '../../constants/routes';
import LoginForm from '../../shared/Forms/LoginForm';
import RegisterForm from '../../shared/Forms/RegisterForm';
import {getMe} from '../../store/features/userSuncks';
import {useAppSelector} from '../../store/store';
import TabsChoice from '../../ui/TabsChoice';
import './AuthPage.scss';

export interface ILabelTab {
    id: string;
    label: string;
    path: string;
}

export const enum EAuth {
    login = 'login',
    register = 'register',
}

export type TAuth = 'login' | 'register';

const LABELS: ILabelTab[] = [
    {id: 'login', label: 'Авторизация', path: '/auth'},
    {id: 'register', label: 'Регистрация', path: '/auth/register'},
];

export default function AuthPage() {
    const [activeTab, setIsActiveTab] = React.useState<TAuth>(EAuth.login);
    const user = useAppSelector(getMe());

    const navigate = useNavigate();
    React.useEffect(() => {
        if (user) {
            navigate(ROUTE_HOME);
        }
    }, [user]);

    const hendleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const tab = e.currentTarget.id as TAuth;
        setIsActiveTab(tab);
    };

    const getForm = () => (activeTab === EAuth.login ? <LoginForm /> : <RegisterForm />);

    return (
        <section className="AuthPage">
            <div className="AuthPage__container">
                <div className="AuthPage__head">
                    <div className="AuthPage__logo">
                        <img
                            className="AuthPage__imgLogo"
                            src="/icons/bigLogo.svg"
                            alt="logo"
                        />
                    </div>
                    <div className="AuthPage__tabsChoice">
                        <TabsChoice
                            onChange={hendleChange}
                            labels={LABELS}
                            activeTab={activeTab}
                        />
                    </div>
                </div>
                <div className="AuthPage__form">{getForm()}</div>
            </div>
        </section>
    );
}

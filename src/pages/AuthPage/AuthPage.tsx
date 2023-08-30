import React from 'react';
import {useNavigate} from 'react-router-dom';
import LoginForm from '../../shared/Forms/LoginForm';
import RegisterForm from '../../shared/Forms/RegisterForm';
import {getMe} from '../../store/features/userSlice';
import {useAppSelector} from '../../store/store';
import TabsChoice from '../../ui/TabsChoice';
import './AuthPage.scss';

export interface ILabelTab {
    id: string;
    label: string;
    path: string;
}

const LABELS: ILabelTab[] = [
    {id: 'login', label: 'Авторизация', path: '/auth'},
    {id: 'register', label: 'Регистрация', path: '/auth/register'},
];

export default function AuthPage() {
    const [activeTab, setIsActiveTab] = React.useState<string>('login');
    const user = useAppSelector(getMe());

    const navigate = useNavigate();
    React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    const hendleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const tab = e.currentTarget.id;
        setIsActiveTab(tab);
    };

    const getForm = () => (activeTab === 'login' ? <LoginForm /> : <RegisterForm />);

    return (
        <div className="AuthPage">
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
        </div>
    );
}

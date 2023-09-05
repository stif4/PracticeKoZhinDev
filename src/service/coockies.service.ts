import Cookies from 'universal-cookie';
import {ECheck, TCheck} from '../shared/Forms/LoginForm/LoginForm';

const TOKEN_ACCESS = 'accessToken';
const TOKEN_REFRESH = 'refreshToken';
const KEY_USERID = 'userId';
const KEY_REMEMBER = 'remember';
const TIME_CURRENT = 1000;
const TIME_EXP = 30 * 60 * 1000;

interface ISetTookens {
    userId: number;
    accessExp: number;
    refreshExp?: number;
    refresh?: string;
    access: string;
    remember?: TCheck;
}

export default function coockiesService() {
    const cookies = new Cookies();

    const getAcesstoken = (): string => cookies.get(TOKEN_ACCESS);
    const getRefreshtoken = (): string => cookies.get(TOKEN_REFRESH);
    const getUserId = (): string => cookies.get(KEY_USERID);
    const getRemember = (): string | undefined => cookies.get(KEY_REMEMBER);

    const removeTookens = (): void => {
        cookies.remove(KEY_USERID, {path: '/'});
        cookies.remove(TOKEN_ACCESS, {path: '/'});
        cookies.remove(KEY_REMEMBER, {path: '/'});
        cookies.remove(TOKEN_REFRESH, {path: '/'});
    };

    const getConfig = (expiration: Date | undefined) => ({expires: expiration, path: '/'});

    const getExpiration = (dataRemember: TCheck | undefined, date: number) => {
        // берем значение из куки, если ранее сохроняли
        const isRememberedCoockie = getRemember() === ECheck.checked;
        // берем значение из текущей даты
        const isRememberedData = dataRemember === ECheck.checked;
        const isRemembered = isRememberedData || isRememberedCoockie;
        // если запомнить, тогда генерируем дату жизни токена, иначе undefined (session - пока не закроют браузер, куки будут жить).
        return isRemembered ? new Date(date) : undefined;
    };

    const setTookens = (data: ISetTookens): void => {
        const dateAccessExpJsMS = data.accessExp * TIME_CURRENT + TIME_EXP;
        const accessExpiration = getExpiration(data?.remember, dateAccessExpJsMS);

        cookies.set(TOKEN_ACCESS, data.access, getConfig(accessExpiration));
        cookies.set(KEY_USERID, data.userId, getConfig(accessExpiration));

        if (data?.refreshExp) {
            const dateRefreshExpJsMS = data?.refreshExp * TIME_CURRENT;
            const refreshExpiration = getExpiration(data?.remember, dateRefreshExpJsMS);
            cookies.set(TOKEN_REFRESH, data.refresh, getConfig(refreshExpiration));
            cookies.set(KEY_REMEMBER, data.remember, getConfig(refreshExpiration));
        }
    };
    return {getAcesstoken, getRefreshtoken, setTookens, removeTookens, getUserId};
}

import Cookies from 'universal-cookie';
import {IJWTDecode, IResponceLogin} from '../store/api/types';

const TOKEN_ACCESS = 'accessToken';
const TOKEN_REFRESH = 'refreshToken';
const KEY_USERID = 'userId';

interface ISetTookens {
    tokens: IResponceLogin;
    user: IJWTDecode;
}

export default function coockiesService() {
    const cookies = new Cookies();

    const getAcesstoken = (): string => cookies.get(TOKEN_ACCESS);
    const getRefreshtoken = (): string => cookies.get(TOKEN_REFRESH);
    const getUserId = (): string => cookies.get(KEY_USERID);

    const removeTookens = (): void => {
        cookies.remove(TOKEN_ACCESS, {path: '/'});
        cookies.remove(TOKEN_REFRESH, {path: '/'});
        cookies.remove(KEY_USERID, {path: '/'});
    };

    const setTookens = ({tokens, user}: ISetTookens): void => {
        removeTookens();
        cookies.set(TOKEN_ACCESS, tokens.accessToken, {expires: new Date(user.iat * 10000), path: '/'});
        cookies.set(TOKEN_REFRESH, tokens.refreshToken, {expires: new Date(user.iat * 10000), path: '/'});
        cookies.set(KEY_USERID, user.id, {expires: new Date(user.iat * 10000), path: '/'});
    };

    return {getAcesstoken, getRefreshtoken, setTookens, removeTookens, getUserId};
}

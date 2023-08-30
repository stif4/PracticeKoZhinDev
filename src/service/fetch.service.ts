import {URL_FILE} from '../constants/api';
import coockiesService from './coockies.service';

const URL_BASE = process.env.REACT_APP_SERVER_ENDPOINT as string;

export default function fetchService() {
    const bearer = 'Bearer ' + coockiesService().getAcesstoken();

    const fetchFile = async (id: number) => {
        const file = await fetch(`${URL_BASE}${URL_FILE}/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: bearer,
            },
        });
        const blob = await file.blob();
        const url = URL.createObjectURL(blob);
        return url;
    };
    return {fetchFile};
}

import {IUser} from '../store/api/types';

export default function checkSubscriptions(me: IUser, user: IUser): boolean {
    return me.subscriptions.some((sub) => sub.id === user.id);
}

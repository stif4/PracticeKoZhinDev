import {IUserById, IUser} from '../store/api/types';

export default function checkSubscriptions(me: IUserById, user: IUserById | IUser): boolean {
    return me.subscriptions.some((sub) => sub.id === user.id);
}

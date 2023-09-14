export interface IItem {
    text: string;
    addClass: 'red' | '';
    action?: (event?: any) => void;
}

export interface IInformationBlock {
    firstName: string;
    lastName: string;
    nickname: string;
}

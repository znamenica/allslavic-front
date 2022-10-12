export interface User {
    firstname: string;
    lastname: string;
    midname: string;
    nickname: string;
    id: number;
    email: string;
}

export interface Account {
    id: number;
    sid: string;
    social_id: number;
    user_id: number;
}

export interface NameObj {
    alphabeth_id: number;
    dictumable_id: number;
    dictumable_type: string;
    id: number;
    kind: string;
    language_id: number;
    text: string;
    type: string;
}

export interface OuterUser {
    id: number;
    accounts: Account[];
    names: NameObj[];
}

export enum USER_KIND {
    FIRST_NAME = "first_name",
    MID_NAME = "mid_name",
    LAST_NAME = "last_name",
    NICK_NAME = "nick_name",
}

export interface MyResponse {
    item: User;
    needAuth: boolean;
}
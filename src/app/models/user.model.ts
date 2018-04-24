export interface User {
    _id: string;
    email: string;
    password: string;
    schedule: Array<Object>;
}

export class UserObject implements User {
    _id: string;
    email: string;
    password: string;
    schedule: Array<Object>;
}

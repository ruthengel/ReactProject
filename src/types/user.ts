import { Action } from "./action"

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    id?:number
}
export type UserContextType = {
    user: User;
    userDispatch: React.Dispatch<Action>;
};

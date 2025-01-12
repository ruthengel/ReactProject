import { createContext, useReducer, useState } from "react"
import { User } from "../types/user"
import { Action } from "../types/action"
import Login from "./Login"
import VerifiedUser from "./VerifiedUser"
import { Button } from "@mui/material"
import axios, { AxiosError } from "axios"
import { Password } from "@mui/icons-material"

const userReducer = (state: User, action: Action): User => {

    switch (action.type) {
        case 'CREATE':
            return {
                firstName: action.data.firstName ?? '',
                lastName: '',
                email: '',
                password: action.data.password ?? '',
                address: '',
                phone: '',
                id: action.data.id ?? 0
            }
        case 'UPDATE':
            return {
                firstName: action.data.firstName ?? state.firstName,
                lastName: action.data.lastName ?? state.lastName,
                email: action.data.email ?? state.email,
                password: action.data.password ?? state.password,
                address: action.data.address ?? state.address,
                phone: action.data.phone ?? state.address,
                id: state.id
            }
        case 'DELETE':
            return state
        default:
            return state


    }

}

type UserContextType = {
    user: User;
    userDispatch: React.Dispatch<Action>;
};

export const UserContext = createContext<UserContextType | null>(null)

const HomePage = () => {

    const initialUser: User = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    }
    const [verified, setVerified] = useState(false)
    const [user, userDispatch] = useReducer(userReducer, initialUser)
    return (<>
        <UserContext.Provider value={{ user, userDispatch }}>
            <Login Verified={setVerified} />
            <VerifiedUser very={verified} />
        </UserContext.Provider>
    </>)
}

export default HomePage

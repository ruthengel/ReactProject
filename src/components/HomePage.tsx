import { createContext, useReducer, useState } from "react"
import { User } from "../types/user"
import { Action } from "../types/action"
import Login from "./Login"
import VerifiedUser from "./VerifiedUser"
import { Button } from "@mui/material"
import axios, { AxiosError } from "axios"

import { Password } from "@mui/icons-material"

const handleLogUp = async (state: User, action: Action) => {

    try {
        const res = await axios.post('http://localhost:3000/api/user/register', action.data)
        state = res.data.user
    }
    catch (e) {
        if (axios.isAxiosError(e))
            if (e.status === 400)
                alert(`${e.message}`)
    }


}

const handleLogin = async (state: User, action: Action) => {
    try {
        const res = await axios.post('http://localhost:3000/api/user/login', action.data)
        state = res.data.user
    }
    catch (e) {
        if (axios.isAxiosError(e))
            if (e.status === 401)
                alert(`${e.message}`)
    }
}

const handleUpdate = async (state: User, action: Action) => {
    try {
        const res = await axios.put('http://localhost:3000/api/user/', action.data)
        state = res.data.user
    }
    catch (e) {
        if (axios.isAxiosError(e))
            if (e.status === 404)
                alert(`${e.message}`)
    }
}

const userReducer = (state: User, action: Action): User => {

    switch (action.type) {
        case 'LOGUP':
            handleLogUp(state, action);

        case 'LOGIN':
            handleLogin(state, action)
        case 'UPDATE':
            handleUpdate(state, action)
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
        firstName: "Hi!",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    }

    const [login, setLogin] = useState(true)
    const [user, userDispatch] = useReducer(userReducer, initialUser)
    const [verified, setVerified] = useState(false)
    const [very, setVery] = useState(false)

    const handleVerified = () => {
        setVerified(true)
    }

    return (<>


        <UserContext.Provider value={{ user, userDispatch }}>
            <Login Verified={handleVerified} />
            <VerifiedUser very={verified} />
        </UserContext.Provider>


    </>)
}

export default HomePage

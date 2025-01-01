import { createContext, useReducer, useState } from "react"
import { User } from "../types/user"
import { Action } from "../types/action"
import Login from "./Login"
import VerifiedUser from "./VerifiedUser"
import { Button } from "@mui/material"
import axios, { AxiosError } from "axios"
import { Password } from "@mui/icons-material"

const handleLogUp = async (user: User, action: Action): Promise<boolean> => {

    try {     
        const res = await axios.post('http://localhost:3000/api/user/register', action.data)
        user = res.data.user
        return true
    }
    catch (e) {
        if (axios.isAxiosError(e))
            if (e.status === 400) {
                alert(`error`)
                return false
            }


    }
    return true

}

const handleLogin = async (user: User, action: Action): Promise<boolean> => {
    try {
        const res = await axios.post('http://localhost:3000/api/user/login', action.data)
        user = res.data.user
        return true
    }
    catch (e) {
        if (axios.isAxiosError(e))
            if (e.status === 401) {
                alert(`${e.message}`)
                return false
            }

    }
    return true
}

const handleUpdate = async (user: User, action: Action) => {
    try {
        const res = await axios.put('http://localhost:3000/api/user/', action.data)
        user = res.data.user
    }
    catch (e) {
        if (axios.isAxiosError(e))
            if (e.status === 404)
                alert(`${e.message}`)
    }
}

const userReducer = (state: User, action: Action): any => {
    let success: any
    
    switch (action.type) {
        case 'LOGUP':
            success = handleLogUp(state, action);
            return success
        case 'LOGIN':
            success = handleLogin(state, action)
            return true
        case 'UPDATE':
            handleUpdate(state, action)
            break
        case 'DELETE':
            break
        default:
            break

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
    const [login, setLogin] = useState(true)
    const [user, userDispatch] = useReducer(userReducer, initialUser)
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

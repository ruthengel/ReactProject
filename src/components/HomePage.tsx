import { createContext, useState } from "react"
import { User, UserContextType } from "../types/user"
import { Action } from "../types/action"
import Login from "./user/Login"
import VerifiedUser from "./user/VerifiedUser"
import { Typography } from "@mui/material"
import { useLocation } from "react-router-dom"

export const userReducer = (state: User, action: Action): User => {

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

export const UserContext = createContext<UserContextType | null>(null)

const HomePage = () => {
    const location = useLocation();
    const [verified, setVerified] = useState(false)
    return (<>
        {location.pathname === '/' && <Typography variant="button" component="div" sx={{ fontSize: "60px", color: "white", textAlign: "center", display: "flex", alignItems: "center", fontFamily: "'Roboto', sans-serif", fontWeight: 1000 }}>
            Recipe for happiness?<br /> Just give it a try –<br /> every bite is a new story.
        </Typography>}
        <Login Verified={setVerified} />
        <VerifiedUser very={verified} />
    </>)
}

export default HomePage

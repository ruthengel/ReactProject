import { createContext, useReducer, useState } from "react"
import { User } from "../types/user"
import { Action } from "../types/action"
import Login from "./Login"
import VerifiedUser from "./VerifiedUser"
import { Button } from "@mui/material"


const userReducer = (state: User, action: Action): User => {

    switch (action.type) {
        case 'CREATE':
            return state
        case 'UPDATE':          
            return {
                firstName: action.data.firstName || state.firstName,
                lastName: action.data.lastName || state.lastName,
                email: action.data.email || state.email,
                password: action.data.password || state.password,
                address: action.data.address || state.address,
                phone: action.data.phone || state.phone
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
        firstName: "Ruth",
        lastName: "Engel",
        email: "",
        password: "123456",
        address: "",
        phone: ""
    }
    
    const [login, setLogin] = useState(true)
    const [user, userDispatch] = useReducer(userReducer, initialUser)
    const [verified, setVerified] = useState(false)
    const [very, setVery] = useState(false)

    const handleVerified = (state: boolean) => {
        setVerified(true)
    }

    return (<>


        <UserContext.Provider value={{ user, userDispatch }}>
            {/* <Button onClick={handleLogin}>login</Button> */}
            {/* {login && <Login Verified={handleVerified} />} */}
            <Login Verified={handleVerified} />
            <VerifiedUser very={verified} />
        </UserContext.Provider>


    </>)
}
export default HomePage
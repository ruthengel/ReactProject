import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import HomePage, { UserContext, userReducer } from "./HomePage"
import { User } from "../types/user"
import { useReducer } from "react"

const Applayout = () => {
    const initialUser: User = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    }
    const [user, userDispatch] = useReducer(userReducer, initialUser)

    return (
        <>
            <UserContext value={{ user, userDispatch }}>
                <NavBar />
                <HomePage />
                <Outlet />
            </UserContext>
        </>
    )
};

export default Applayout
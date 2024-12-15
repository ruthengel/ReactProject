import { FormEvent, useContext, useRef, useState } from "react"
import { Avatar, Box, Button } from "@mui/material"
import { UserContext } from "./HomePage"
import { Action } from "../types/action"
import UpdateUser from "./UpdateUser"

const VerifiedUser = ({ very }: { very: boolean }) => {
    const [update, steUpdate] = useState(true)
    const userContext = useContext(UserContext)
    if (!userContext)
        throw new Error("Profile must be used within a UserContext.Provider");
    const { user, userDispatch } = userContext

    return very && (<>

        <Box
            sx={{
                position: "absolute",
                top: 16,
                left: 16,
                display: "flex",
                alignItems: "center",
                gap: 1,
                zIndex: 1300,
            }}
        >
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }} alt="Remy Sharp">
                {user.firstName[0]}
            </Avatar >
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {user.firstName + " " + user.lastName}
            </span>
        </Box>
        <UpdateUser />
    </>)
}
export default VerifiedUser
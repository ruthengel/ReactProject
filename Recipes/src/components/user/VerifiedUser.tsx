import { useContext } from "react"
import { Avatar, Box } from "@mui/material"
import { UserContext } from "../HomePage"
import UpdateUser from "./UpdateUser"

const VerifiedUser = ({ very }: { very: boolean }) => {
    const userContext = useContext(UserContext)
    if (!userContext)
        throw new Error("Profile must be used within a UserContext.Provider");
    const { user } = userContext

    return very && (<>

        <Box
            sx={{ position: "absolute", top: 10, right: 1400, display: "flex", alignItems: "center", gap: 1, zIndex: 1300, }}        >
            <Avatar sx={{ backgroundColor: "black", width: 56, height: 56 }} alt="Remy Sharp">
                {user.firstName[0]}
            </Avatar >
            <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "white" }}>
                {user.firstName + " " + user.lastName}
            </span>
        </Box>
        <UpdateUser />
    </>)
}
export default VerifiedUser
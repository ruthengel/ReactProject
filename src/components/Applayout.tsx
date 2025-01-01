import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import { Box, Container, Paper } from "@mui/material"

const Applayout = () => {
    return (
        <>

            <NavBar />
            <Container
                maxWidth="lg"
                sx={{
                    marginTop: "20px", 
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: "100%",
                        padding: "20px",
                        borderRadius: "10px",
                        backgroundColor: "#f5f5f5", 
                    }}
                >
                   
                    <Outlet />
                </Paper>
            </Container>
        </>
    )
}
export default Applayout
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router"

const NavBar = () => {
    return (
        <>
            <AppBar position="static" color="primary" >
            <Toolbar>
                <Box>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{ textTransform: "none", marginX: 1 }}
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="grandfather"
                        sx={{ textTransform: "none", marginX: 1 }}
                    >
                        Grandfather
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="grandfather/father"
                        sx={{ textTransform: "none", marginX: 1 }}
                    >
                        Father
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="grandmother"
                        sx={{ textTransform: "none", marginX: 1 }}
                    >
                        Grandmother
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>

        </>
    )
}
export default NavBar
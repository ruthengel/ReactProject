import { Box, IconButton, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Restaurant, Fastfood, Cake, LocalPizza, Icecream, Liquor, LocalBar, LocalDining, Kitchen } from '@mui/icons-material'; import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./HomePage";

const NavBar = () => {
    const userContext = useContext(UserContext);
    if (!userContext) throw new Error("Profile must be used within a UserContext.Provider");
    const { user } = userContext;
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box sx={{ position: "fixed", width: "100%", top: 0, left: 0 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
                    <IconButton edge="end" color="inherit" onClick={() => setOpen(true)}
                        sx={{ fontSize: 35, border: "2px solid white", borderRadius: "50%", padding: 1, transition: "border-color 0.3s ease, transform 0.3s ease", "&:hover": { backgroundColor: "transparent", borderColor: "black", transform: "scale(1.1)" }, "& svg": { color: "white" } }}>
                        <Restaurant sx={{ color: "white" }} />
                    </IconButton>
                </Toolbar>
            </Box>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250, backgroundColor: "white", height: "100vh", paddingTop: 2 }}>
                    <List sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/" onClick={() => setOpen(false)} sx={{ width: "100%", alignItems:"center",textAlign: "center", color: "black", borderTop: "1px solid transparent", borderBottom: "1px solid transparent", padding: "10px 0", position: "relative", "&:hover": { borderTop: "1px solid black", borderBottom: "1px solid black", backgroundColor: "#f5f5f5", color: "black" }, "&:hover::before": { content: '""', position: "absolute", left: "50%", right: "50%", bottom: 0, height: "2px", backgroundColor: "black", transition: "all 0.3s ease" } }}>
                                <ListItemText primary="Home" sx={{  color: "black" }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="recipes"
                                onClick={() => setOpen(false)}
                                sx={{ width: "100%", textAlign: "center", color: "black", borderTop: "1px solid transparent", borderBottom: "1px solid transparent", padding: "10px 0", position: "relative", "&:hover": { borderTop: "1px solid black", borderBottom: "1px solid black", backgroundColor: "#f5f5f5" }, "&:hover::before": { content: '""', position: "absolute", left: "50%", right: "50%", bottom: 0, height: "2px", backgroundColor: "black", transition: "all 0.3s ease" } }}>
                                <ListItemText primary="Our Recipes" sx={{ textAlign: "center", color: "black" }} />
                            </ListItemButton>
                        </ListItem>
                        {user.id && (
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to="addrecipe"
                                    onClick={() => setOpen(false)}
                                    sx={{ width: "100%", textAlign: "center", color: "black", borderTop: "1px solid transparent", borderBottom: "1px solid transparent", padding: "10px 0", position: "relative", "&:hover": { borderTop: "1px solid black", borderBottom: "1px solid black", backgroundColor: "#f5f5f5" }, "&:hover::before": { content: '""', position: "absolute", left: "50%", right: "50%", bottom: 0, height: "2px", backgroundColor: "black", transition: "all 0.3s ease" } }}>
                                    <ListItemText primary="Add Recipe" sx={{ textAlign: "center", color: "black" }} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default NavBar;

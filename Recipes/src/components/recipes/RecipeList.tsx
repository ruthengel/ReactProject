import recipeStore from "./recipeStore";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import { observer } from "mobx-react-lite";

const RecipecList = observer(() => {
    const [value, setValue] = useState(0)
    const navigate = useNavigate()

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigate(`/recipes/${recipeStore.recipes[newValue].id}`); 
    };

    return (
        <><Box sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'fixed', top: '-5px', left: '300px', right: "200px", width: 'auto', padding: "20px"
        }}>
            <Tabs
                value={false} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile orientation="horizontal"
                sx={{
                    "& .MuiTabs-indicator": { backgroundColor: "black", fontWeight: "bold" }, '& .MuiTabs-scrollButtons': { color: "white" }
                }} >
                {recipeStore.recipes.map((recipe) => (
                    <Tab
                        key={recipe.id}
                        label={recipe.title}
                        sx={{
                            color: "white", fontWeight: "bold",
                            "&:hover": { borderBottom: "2px solid black" },
                            "&.Mui-selected": { color: "white", borderBottom: "2px solid black" },
                            "&:focus": { borderBottom: "2px solid black" },
                        }}
                    />
                ))}
            </Tabs>
        </Box>

            <Box sx={{ marginTop: "80px" }}>
                <Outlet />
            </Box>
        </>
    );
});

export default RecipecList;


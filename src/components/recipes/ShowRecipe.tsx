import { useState, useEffect, useRef } from "react";
import { ArrowDownward } from "@mui/icons-material";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import recipeStore from "./recipeStore";
import { useParams } from "react-router-dom";

const ShowRecipe = () => {
    const { id } = useParams()
    const recipe = recipeStore.recipes.find((recipe) => recipe.id === Number(id))

    const boxRef = useRef<HTMLDivElement | null>(null)
    const [showScrollIcon, setShowScrollIcon] = useState(false)

    useEffect(() => {
        if (boxRef.current) {
            const isScrollable = boxRef.current.scrollHeight > boxRef.current.clientHeight
            setShowScrollIcon(isScrollable)
        }
    }, [recipe])

    if (!recipe) {
        return <Typography variant="h1" sx={{ color: "white", textAlign: "center" }}>Recipe not found</Typography>;
    }

    return (
        <Box ref={boxRef} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '60vw', maxWidth: '800px', height: 'auto', maxHeight: '70vh', color: 'white', margin: '20px auto 0', padding: '30px', paddingTop: '50px', overflowY: 'auto', overflowX: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '8px', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "10px", fontWeight: 'bold', color: 'white', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {recipe.title}
            </Typography>
            <Typography sx={{ fontSize: '18px', fontWeight: '600', color: 'white', textAlign: 'center', textTransform: 'uppercase' }}>
                <strong style={{ color: "white" }}>Description:</strong>
            </Typography>
            {recipe.description}
            <Typography sx={{ marginBottom: "10px", fontSize: '18px', fontWeight: '600', color: 'white', textAlign: 'center', textTransform: 'uppercase' }}>
                <strong style={{ color: "white" }}>Ingredients:</strong>
            </Typography>
            <List sx={{ width: "100%", paddingLeft: "0", textAlign: "center" }}>
                {recipe.ingredients.map((ingredient, index) => (
                    <ListItem key={index} sx={{ padding: 0 }}>
                        <ListItemText primary={ingredient} sx={{ fontSize: '16px', color: 'white', lineHeight: 1.5 }} />
                    </ListItem>
                ))}
            </List>
            <Typography sx={{ marginBottom: "10px", fontSize: '18px', fontWeight: '600', color: 'white', textAlign: 'center', textTransform: 'uppercase' }}>
                <strong style={{ color: "white" }}>Instructions:</strong>
            </Typography>
            {recipe.instructions}
            {showScrollIcon && (
                <Box sx={{ position: 'absolute', bottom: '60px', backgroundColor: 'white', borderRadius: '50%', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ArrowDownward sx={{ color: 'black', fontSize: 24 }} />
                </Box>
            )}
        </Box>
    );
};

export default ShowRecipe;

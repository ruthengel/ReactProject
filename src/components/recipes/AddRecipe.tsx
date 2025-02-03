import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Recipe } from "../../types/recipe";
import recipeStore from "./recipeStore";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';

const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    authorId: yup.number().typeError("Author ID must be a number").required("Author ID is required"),
    ingredients: yup.array().of(yup.string().required("Ingredient cannot be empty")).min(1, "At least one ingredient is required").required(),
    instructions: yup.string().required("Instructions are required"),
});

const AddRecipe = () => {
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<Recipe>({
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    });

    const onSubmit: SubmitHandler<Recipe> = (data: Recipe) => {
        const recipe: Recipe = {
            title: data.title,
            description: data.description,
            authorId: data.authorId,
            ingredients: data.ingredients,
            instructions: data.instructions
        };
        recipeStore.addRecipe(recipe);
        reset();
    };

    return (
        <Box sx={{ width: "400px", margin: "0 auto", padding: "20px", backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: "8px", boxShadow: 3 }}>
            <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "20px", fontWeight: 'bold', color: 'black', textTransform: 'uppercase' }}>Add Recipe</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ marginBottom: "15px" }}>
                    <TextField fullWidth {...register("title")} label="Title" variant="outlined" error={!!errors.title} helperText={errors.title?.message} sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                </Box>

                <Box sx={{ marginBottom: "15px" }}>
                    <TextField fullWidth {...register("description")} label="Description" variant="outlined" error={!!errors.description} helperText={errors.description?.message} sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                </Box>

                <Box sx={{ marginBottom: "15px" }}>
                    <TextField fullWidth {...register("authorId")} label="Author ID" variant="outlined" type="number" error={!!errors.authorId} helperText={errors.authorId?.message} sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                </Box>

                <Box sx={{ marginBottom: "15px" }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "10px", fontWeight: 'bold', color: 'black', textAlign: 'left', textTransform: 'uppercase' }}>Ingredients:</Typography>
                    {fields.map((field, index) => (
                        <Box key={field.id} sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                            <TextField fullWidth {...register(`ingredients.${index}`)} label={`Ingredient ${index + 1}`} variant="outlined" sx={{ backgroundColor: 'white', marginRight: "10px", borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', border: '1px solid black', borderRadius: '8px', padding: '5px', '&:hover': { backgroundColor: 'black' } }}>
                                <IconButton onClick={() => remove(index)} sx={{ padding: '6px' }}>
                                    <Delete sx={{ color: 'white' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                    <Button variant="outlined" onClick={() => append("")} sx={{ borderColor: "black", color: "black", width: "100%", marginTop: "10px", '&:hover': { borderColor: 'black', backgroundColor: 'black', color: 'white' } }}>Add Ingredient</Button>
                    {errors.ingredients && <Typography color="error">{errors.ingredients.message}</Typography>}
                </Box>

                <Box sx={{ marginBottom: "15px" }}>
                    <TextField fullWidth {...register("instructions")} label="Instructions" variant="outlined" multiline rows={4} error={!!errors.instructions} helperText={errors.instructions?.message} sx={{ backgroundColor: 'white', borderRadius: '8px', '& .MuiOutlinedInput-root': { borderRadius: '8px', '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                </Box>

                <Button type="submit" variant="outlined" endIcon={<SendIcon />} fullWidth sx={{ backgroundColor: "black", color: "white", border: '2px solid black', '&:hover': { border: '2px solid black' } }}>Save Recipe</Button>
            </form>
        </Box>
    );
};

export default AddRecipe;


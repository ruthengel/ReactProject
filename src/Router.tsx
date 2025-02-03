import Applayout from "./components/Applayout";
import { createBrowserRouter } from "react-router-dom";
import RecipecList from "./components/recipes/RecipeList";
import ShowRecipe from "./components/recipes/ShowRecipe";
import AddRecipe from "./components/recipes/AddRecipe";

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <Applayout />,
        errorElement: <>main error</>,
        children: [
            {
                path: 'recipes',
                element: <RecipecList />,
                errorElement: <>recipes error</>,
                children: [
                    {
                        path: ':id',
                        element: <ShowRecipe />,
                        errorElement: <>recipe id error</>
                    }
                ]
            },
            {
                path: 'addrecipe',
                element: <AddRecipe />,
                errorElement: <>addrecipe error</>
            }
        ]
    },
]);



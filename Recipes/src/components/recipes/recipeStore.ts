import axios from "axios"
import { Recipe } from "../../types/recipe"
import { makeAutoObservable, runInAction } from "mobx";

class RecipeStore {

    recipes: Recipe[] = []

    constructor() {
        makeAutoObservable(this)
        this.getAllRecipes()
    }

    private async getAllRecipes() {
        let res;
        try {
            res = await axios.get('http://localhost:3000/api/recipes/')
        }
        catch (e) {
            if (axios.isAxiosError(e))
                alert(`${e.response?.data.message}`)
        }
        if (res?.data)
            runInAction(() => {
                this.recipes = res.data
            });
    }

    async addRecipe(recipe: Recipe) {
        let res;
        try {
            res = await axios.post('http://localhost:3000/api/recipes/', recipe, {
                headers: { 'user-id': recipe.authorId }
            })
            this.recipes.push(res.data.recipe)
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404)
                    alert(`${e.response?.data.message}`)
            }
        }
    }

    getRecipeById(id: number): Recipe | undefined {
        return this.recipes.find(r => r.id === id)
    }

    
}
export default new RecipeStore()
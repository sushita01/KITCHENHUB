import Recipe from "../models/recipe.model.js";

// CREATE Recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image, createdBy } = req.body;
    if (!title || !ingredients || !instructions || !createdBy) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const recipe = await Recipe.create({ title, ingredients, instructions, image, createdBy });
    res.status(201).json({ success: true, recipe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all Recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, recipes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single Recipe
export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ success: false, message: "Recipe not found" });
    res.status(200).json({ success: true, recipe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE Recipe
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, recipe: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE Recipe
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

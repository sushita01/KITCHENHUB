import SavedRecipe from "../models/savedRecipe.model.js";

// SAVE Recipe
export const saveRecipe = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    if (!userId || !recipeId) return res.status(400).json({ success: false, message: "All fields are required" });

    const existing = await SavedRecipe.findOne({ user: userId, recipe: recipeId });
    if (existing) return res.status(400).json({ success: false, message: "Recipe already saved" });

    const saved = await SavedRecipe.create({ user: userId, recipe: recipeId });
    res.status(201).json({ success: true, saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// REMOVE Saved Recipe
export const removeSavedRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await SavedRecipe.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Removed from saved recipes" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET My Saved Recipes
export const getMySavedRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const saved = await SavedRecipe.find({ user: userId }).populate("recipe");
    res.status(200).json({ success: true, saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

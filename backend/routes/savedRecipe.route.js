import express from "express";
import { saveRecipe, removeSavedRecipe, getMySavedRecipes } from "../controllers/savedRecipe.controller.js";

const router = express.Router();

router.post("/", saveRecipe);
router.get("/user/:userId", getMySavedRecipes);
router.delete("/:id", removeSavedRecipe);

export default router;

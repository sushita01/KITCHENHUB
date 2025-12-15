import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import recipeRoute from "./routes/recipe.route.js";
import savedRecipeRoute from "./routes/savedRecipe.route.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/recipes", recipeRoute);
app.use("/api/v1/saved", savedRecipeRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

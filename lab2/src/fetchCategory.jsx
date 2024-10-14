import fetchIngredient from "./fetchIngredient";
import safeFetchJson from "./safeFetchJson";

async function fetchCategory(category) {

const url = `http://localhost:8080/${category}`;
  const ingredients = await safeFetchJson(url); 
  const ingredientPromises = ingredients.map(ingredient => fetchIngredient(category, ingredient)); 
  const ingredientsArray = await Promise.all(ingredientPromises); 
  return Object.assign({}, ...ingredientsArray);
}

export default fetchCategory;
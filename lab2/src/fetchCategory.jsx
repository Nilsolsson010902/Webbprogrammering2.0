import fetchIngredient from "./fetchIngredient";
import safeFetchJson from "./safeFetchJson";

async function fetchCategory(category) {

const url = `http://localhost:8080/${category}`;
  const names = await safeFetchJson(url); 
  const ingredientPromises = names.map(name => fetchIngredient(category, name)); 
  const ingredientsArray = await Promise.all(ingredientPromises); 
  return Object.assign({}, ...ingredientsArray);
}

export default fetchCategory;
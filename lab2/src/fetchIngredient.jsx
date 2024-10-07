import safeFetchJson from "./safeFetchJson";
async function fetchIngredient(category, ingredientName) {

  const url = `http://localhost:8080/${category}/${ingredientName}`;
  const ingredient = await safeFetchJson(url);
  return { [ingredientName]: ingredient };
}

export default fetchIngredient;
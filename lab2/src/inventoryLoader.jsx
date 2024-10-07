import fetchCategory from "./fetchCategory";
import safeFetchJson from "./safeFetchJson";

async function inventoryLoader() {
    
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(fetchCategory('foundations'))
    return fetchCategory('foundations');
    }

export default inventoryLoader;
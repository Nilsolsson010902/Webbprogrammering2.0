
import fetchCategory from "./fetchCategory";
async function inventoryLoader() {
    const [foundations, proteins, extras, dressings] = await Promise.all([
        fetchCategory('foundations'),
        fetchCategory('proteins'),
        fetchCategory('extras'),
        fetchCategory('dressings')
      ]);
    
      
      const inventory = {
        foundations,
        proteins,
        extras,
        dressings
      };
      await new Promise(resolve => setTimeout(resolve, 3000));
      return inventory; 
}

export default inventoryLoader;

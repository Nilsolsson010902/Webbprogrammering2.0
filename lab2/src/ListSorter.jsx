//sorts items based on their category in the salad
function ListSorter({inventory, saladComponent}){
    return Object.keys(inventory)
    .filter(name => inventory[name][saladComponent])
    .map(name => ({name, price: inventory[name].price}));
 }
 export default ListSorter
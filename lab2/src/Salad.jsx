import { v4 as uuidv4 } from 'uuid';
class Salad{
    constructor(foundation, protein, extras, dressing, uuid) {
        this.foundation = foundation;
        this.protein = protein;
        this.extras = extras;
        this.dressing = dressing;
        this.uuid = uuid;
      }
    
     
    getTotalPrice(inventory) {                                    //calculates price of entire salad
        let totalPrice = 0;
        totalPrice += inventory[this.foundation].price || 0;
        totalPrice += inventory[this.protein].price || 0;
    
        for (const extra in this.extras) {
          if (this.extras[extra]) {
            totalPrice += inventory[extra].price || 0;
          }
        }
    
        totalPrice += inventory[this.dressing].price || 0;
        return totalPrice;
      }
}

export default Salad;
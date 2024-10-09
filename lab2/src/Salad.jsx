import { v4 as uuidv4 } from 'uuid';
class Salad{
        static instanceCounter = 0; 
        
        constructor(arg) { 
          const uuid = uuidv4();
          this.id = 'salad_' + Salad.instanceCounter++;
          if (arg instanceof Salad){
            this.ingredients = {...arg.ingredients};
            this.uuid = uuidv4();
      
            if (arg.uuid) {
              this.uuid = arg.uuid;  
            }
          }
          else{
            this.ingredients = {};
            this.uuid = uuidv4();
          }
        }
        add(name, properties) { 
          this.ingredients[name] = properties;
          return this;
        }
        remove(name) { 
            if(this.ingredients.hasOwnProperty(name)){
            delete this.ingredients[name];
        }
        return this;
        }
        getPrice() {
            return Object.values(this.ingredients).reduce((total, ingredient) => total + ingredient.price, 0);
        }
        count(property) {
            return Object.values(this.ingredients).filter(ingredient => ingredient[property] === true).length;
        } 

        static parse(saladData){
          const salad = new Salad()
          salad.uuid = saladData.uuid;
          salad.ingredients = { ...saladData.ingredients };
          return salad

        }
    }

export default Salad;
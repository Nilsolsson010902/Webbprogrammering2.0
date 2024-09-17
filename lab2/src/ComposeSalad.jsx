import { useState } from 'react';
import ListSorter from './ListSorter';
import Select from './Select';
import Salad from './Salad';
import { v4 as uuidv4 } from 'uuid';


function ComposeSalad({inventory, addSalad }) {


 const [protein, setProtein] = useState('Kycklingfilé');  //state variables
 const [foundation, setFoundation] = useState('Pasta');
 const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
 const [dressing, setDressing] = useState('Rostad aioli');


 const handleFoundationChange = (event) => {
   setFoundation(event.target.value);  // Update state based on the selected option
 };

 const handleExtrasChange  = (event) => { //lär dig förstå allt rakt igenom
   const { name, checked } = event.target;
   setExtra((prevExtras) => {
    const newExtras = { ...prevExtras };
    if (checked) {
      newExtras[name] = true;
    } else {
      delete newExtras[name];
    }
    return newExtras;
  });
};


 const handleProteinChange = (event) => {
   setProtein(event.target.value);  // Update state based on the selected option
 };


 const handleDressingChange = (event) => {
   setDressing(event.target.value);  // Update state based on the selected option
 };

 const handleSubmitSaladForm = (event) => {
    event.preventDefault(); // Prevent default form submission
    const newSalad = new Salad(
        foundation,
        protein,
        extras,
        dressing,
        uuidv4()  // Generate a unique UUID for each new Salad
      );

    addSalad(newSalad); // Pass the salad to the parent component

    // Clear the form
    setFoundation('Pasta');
    setProtein('Kycklingfilé');
    setExtra({ Bacon: true, Fetaost: true });
    setDressing('Rostad aioli');
  };



  return ( //render function
   <form onSubmit={handleSubmitSaladForm}>
   <div className="continer col-12">
     <div className="row h-200 p-5 bg-light border rounded-3">
       <h2>Välj innehållet i din sallad</h2>
       <fieldset className="col-md-12">
         <Select
         label="Välj bas: "
         onChange={handleFoundationChange}
         value={foundation}
         options= {ListSorter({ inventory: inventory, saladComponent: 'foundation' })}>
         </Select>
       </fieldset>
       </div>


       <div className="row h-200 p-5 bg-light border rounded-3">
       <fieldset>
         <Select
         label="Välj protein: "
         onChange={handleProteinChange}
         value={protein}
         options={ListSorter({inventory: inventory, saladComponent: 'protein'})} >
         </Select>
       </fieldset>
       </div>


       <div className="row h-200 p-5 bg-light border rounded-3">
       <fieldset>
       <Select
         label="Välj dressing: "
         onChange={handleDressingChange}
         value={dressing}
         options={ListSorter({inventory: inventory, saladComponent: 'dressing'})} >
         </Select>
       </fieldset>
       </div>


       <div className="container col-12">
       <div className="row h-200 p-5 bg-light border rounded-3">
       <fieldset>
         <label>Välj extra tillbehör (max 2): </label>
         <div className="col-4">
         {ListSorter({inventory: inventory, saladComponent: 'extra'})
         .map((extra) => (


           <label key={extra.name}>
             <input
               type="checkbox"
               name={extra.name}
               checked={!!extras[extra.name]} // Ensure checked is always boolean i.e not assigning undefined to html atribute
               onChange={handleExtrasChange}
             />
             {extra.name}  {extra.price} kr: 
           </label>
          
           ))
         }
         </div>
       </fieldset>

       </div>
       <button type="submit">Lägg till sallad</button>
     </div>
   </div>
   </form>
);
 }
export default ComposeSalad;


//reflection 1: If the render function depens on external data that changes over time
// it can lead to unpredictable updates in UI, performance issues as well as difficutlies in maintaining
// a component. In essence, it introduces complexity and unpredictability, making the component less reliable and harder to maintain.


//reflection 2:


//reflection 3: this would violate SRP since it would give the Select component more responsibility
//currently the ComposeSalad component is responsible for managing the state of the salad whilst Select
// is responsible for presenting and handeling user interactions related to selection.
//Another issue with moving the foundation state into the Select component is that
// we would have to implement some form of state lifting instead of just having communication through callbacks
//to the parrent with our "handleChange" functions, when a change is made.

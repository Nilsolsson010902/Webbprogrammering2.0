import { useMemo, useState } from 'react';
import Select from './Select';
import Salad from './Salad';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { useLoaderData } from 'react-router-dom';


function ComposeSalad() {

 const inventory = useLoaderData();

 console.log(inventory);

 const [protein, setProtein] = useState('');  //state variables
 const [foundation, setFoundation] = useState('');
 const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
 const [dressing, setDressing] = useState('');
 const [touched, setTouched] = useState(false);
 const [formError, setFormError] = useState(false);

 const navigate = useNavigate();



 const handleFoundationChange = (event) => {
   setFoundation(event.target.value);  // Update state based on the selected option
 };

 const handleExtrasChange  = (event) => { //the state is updated immutably, instead of modyfying the extras object directly we create a copy
   const { name, checked } = event.target; //refers to the checkbox, {name, checked} extracts name and chekced properties from the event target
   setExtra((prevExtras) => {              //he argument prevExtras represents the current extras state, which contains the previously selected extras
    const newExtras = { ...prevExtras }; //shallow copy
    if (checked) {
      newExtras[name] = true;   //if the checkbox is checked , the extra that is represented by name will be added to the new extras object
    } else {
      delete newExtras[name]; //the opposite
    }
    return newExtras;  //passes the new extra to the setExtra function
  });
};


 const handleProteinChange = (event) => {
   setProtein(event.target.value);  // Update state based on the selected option
 };


 const handleDressingChange = (event) => {
   setDressing(event.target.value);  // Update state based on the selected option
 };

 const handleSubmitSaladForm = (event) => {
    event.preventDefault();

    if(!event.target.checkValidity()){
      setTouched(true);
      setFormError(true);
      return
    }

    setFormError(false);
    setTouched(false)
    
    const newSalad = new Salad()
        .add(foundation, inventory.foundations[foundation])
        .add(protein, inventory.proteins[protein])
        .add(dressing, inventory.dressings[dressing])

        Object.keys(extras).forEach(extra=> newSalad.add(extra, inventory.extras[extra]))
    
    console.log("Adding Salad:", newSalad); // Log the salad being added

    handleAddSalad(newSalad); 
    
    navigate(`/view-order/confirm/${newSalad.uuid}`);
    

    setFoundation('');
    setProtein('');
    setExtra({ Bacon: true, Fetaost: true });
    setDressing('');
  };

 const { handleAddSalad } = useOutletContext();



  return ( //render function, onSubmit is triggerd when the user presses the submit button
   <form onSubmit={handleSubmitSaladForm} className={touched ? "was-validated" : ""}
   noValidate>   
   <div className="continer col-12">

     <div className="row h-200 p-5 bg-light border rounded-3">
       <h2>Välj innehållet i din sallad</h2>
       <fieldset className="col-md-12">
         <Select
         label="Välj bas: "
         onChange={handleFoundationChange}
         value={foundation}
         options= {Object.keys(inventory.foundations).map(name => ({
          name,
          price: inventory.foundations[name].price
      }))}>
         </Select>
       </fieldset>
       </div>


       <div className="row h-200 p-5 bg-light border rounded-3">
       <fieldset>
         <Select
         label="Välj protein: "
         onChange={handleProteinChange}
         value={protein}
         options= {Object.keys(inventory.proteins).map(name => ({
          name,
          price: inventory.proteins[name].price
      }))}> 
         </Select>
       </fieldset>
       </div>


       <div className="row h-200 p-5 bg-light border rounded-3">
       <fieldset>
       <Select
         label="Välj dressing: "
         onChange={handleDressingChange}
         value={dressing}
         options= {Object.keys(inventory.dressings).map(name => ({
          name,
          price: inventory.dressings[name].price
      }))}>
         </Select>
       </fieldset>
       </div>


       <div className="container col-12">
       <div className="row h-200 p-5 bg-light border rounded-3">
       <fieldset>
         <label>Välj extra tillbehör (max 2): </label>
         <div className="col-4">
         {Object.keys(inventory.extras).map(extra => (
            <label key={extra}>
                <input
                    type="checkbox"
                    name={extra}
                    checked={!!extras[extra]} // Ensure checked is always boolean
                    onChange={handleExtrasChange}
                />
                {extra} {inventory.extras[extra].price} kr
            </label>
          
           ))
         }
         </div>
       </fieldset>

       </div>
        {formError && (
          <div className="text-danger">
            Vänligen välj en bas, ett protein och en dressing för din sallad.
          </div>
        )}
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


//reflection 2:You can use useMemo() rather than useEffect in this scenario. 
//The useMemo hook allows you to cache the computed values and only recompute them when dependencies change, 
//which is more suitable here since we want to compute the foundations when inventory changes. 


//reflection 3: this would violate SRP since it would give the Select component more responsibility
//currently the ComposeSalad component is responsible for managing the state of the salad whilst Select
// is responsible for presenting and handeling user interactions related to selection.
//Another issue with moving the foundation state into the Select component is that
// we would have to implement some form of state lifting instead of just having communication through callbacks
//to the parrent with our "handleChange" functions, when a change is made.

//reflection 4: The thing that triggers the render functions is the eventhandlers in composeSalad that listens for change
// in state it can be onClick such asd for the button or onChange/onClick for the dropboxes and checkboxes. 

//reflection 5: No changing the HTML form state (DOM) does not directly change the state of the react component. 
//React’s state is separate from the DOM and is managed through the component's state variables for example useState.
// To synchronize the component's state with changes in the DOM (such as user input), you need to use event handlers in React.

//reflection 6: we use the arrow function (=>) instead of this in our eventhandlers because it refers to the react
//component instance, the function inherits it from the surounding scope.
//Since React functional components don’t have their own this like class components. 

//reflection 7: in this case we create what is known as a shallow copy and this means that the properties of 
//the sourceObject are copied into a new object however the prototype chain of the new object will not be inherited 
//from the original object, i.e the prototype chain is not affected at all. The copy will have a default prototype chain
// in the fomr of Object.prototype
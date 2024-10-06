//dropdown display of salad components

import { useId } from "react";
function Select({ label, onChange, value, options }) {
 const id = useId();
 return (
   <div className="form-group">
     <label htmlFor={id} className="form-label">{label}</label>
     <select required className="form-select" onChange={onChange} value={value} id={id}>
         <option value=""></option>
       {options.map((option) => (
         <option value={option.name} key={option.name}>
           {option.name}, {option.price} kr
         </option>
       ))}
       
     </select>
     <div className = 'invalid-feedback'>
      <p>Välj</p>
     </div>
   </div>
 );
}


export default Select;
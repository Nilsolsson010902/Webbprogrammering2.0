
import { useId } from "react";
function Select({ label, onChange, value, options }) {
 const id = useId();
 return (
   <div className="form-group">
     <label htmlFor={id} className="form-label">{label}</label>
     <select className="form-select" onChange={onChange} value={value} id={id}>
       {options.map((option) => (
         <option value={option.name} key={option.name}>
           {option.name}, {option.price} kr
         </option>
       ))}
     </select>
   </div>
 );
}


export default Select;
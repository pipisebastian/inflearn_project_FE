import React from "react";

const OutlinedInput = ({ label, placeholder, value, onChange }) => {
  return (
    <div class="relative h-11 flex-1">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        class="peer w-full rounded border border-b-4 border-slate-200 
              bg-white h-11 font-sans text-sm font-normal
                outline outline-0 transition-all 
                px-1 focus:outline-0 focus:border-b-emerald-500  
               placeholder:opacity-0 focus:placeholder:opacity-100"
      />
      <label
        class="after:content[''] pointer-events-none absolute px-1
        -top-4     peer-after:bg-white  flex  select-none !overflow-visible truncate 
             text-xs font-normal leading-tight text-slate-400 peer-focus:text-emerald-500 
             transition-all  
             
         after:transition-transform 
            after:duration-300 peer-placeholder-shown:text-sm 
            peer-placeholder-shown:leading-[5.5] 
 
            peer-placeholder-shown:text-blue-gray-500 
            peer-focus:text-xs peer-focus:leading-tight
  "
      >
        {label}
      </label>
    </div>
  );
};

export default OutlinedInput;

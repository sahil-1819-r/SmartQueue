import React, { useState } from 'react'

function Service() {
    let [formData,setFormData] = useState({});
  return (
    <div className='bg' >
        <form action="">
            <input type="text" placeholder='Enter Name ' 
            onChange={(e)=>setFormData((data)=>{
                
            })}
            
            />
        </form>
    </div>
  )
}

export default Service
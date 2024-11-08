import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Logout() {

    const navigate=useNavigate("");
    
    useEffect(()=>{
toast.success("Logout successfuly");
localStorage.removeItem("token");
navigate("/shoping/signin");
    },[]);
  return (
    <>
      
    </>
  )
}

export default Logout

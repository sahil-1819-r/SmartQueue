import React from "react";
import { useNavigate } from "react-router";

export default function Queue() {
    
    const navigate = useNavigate();

    const showService = () =>{
        navigate('/Service');
    }

  return (
    // button create queue
    <button className="bg-slate-800 text-white rounded-2xl text-lg m-4 p-4 hover:bg-slate-800/90"
    onClick={showService}
    >
      {" "}
      create service{" "}
    </button>
  );
}

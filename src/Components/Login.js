import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../API/auth";



function Login () {
 const [Data, setData] = useState ({
    username:"",
    password:"",
    
  });
  const {mutate}=useMutation({
    mutationKey:["LogIn"],
    mutationFn:()=>login(Data),
    
  })

  const handleChange = (e) =>{
    setData({...Data, [e.target.name]: e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate();
};


  return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="username"
        placeholder="username"
        value={Data.username}
        onChange={handleChange}
        required         
        
        />
        <input
        type="password"
        name="password"
        placeholder="password"
        value={Data.password}
        onChange={handleChange}
        required         
        
    />
        <button type="submit">Login</button>
    </form>
  );
}

export default Login; 
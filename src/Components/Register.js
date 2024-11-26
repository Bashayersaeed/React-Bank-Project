import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { register } from "../API/auth";
import { Link } from "react-router-dom";

function Register () {
    const [Data, setData] = useState ({
        username:"",
        password:"",
        image:"",
      });


const {mutate}=useMutation({
  mutationKey:["register"],
  mutationFn:()=>register(Data),
  
})

      const handleChange = (e) =>{
        setData({...Data, [e.target.name]: e.target.value});
      };
      const handleFileChange = (e) =>{
        setData({...Data, image: e.target.file[0]})
      };
      const handleSubmit = async (e) => {
        e.preventDefault()
        mutate()
      }
     
      return (
      <>
       <h1>Account Registration</h1>
       <p>
        I have an account!{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Login Here
        </Link>
      </p>
      
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
             <input
            type="text"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
                
            
            />
            <button type="submit">Register</button>
        </form>
       
      </>
        
      );
    
      
}
export default Register;

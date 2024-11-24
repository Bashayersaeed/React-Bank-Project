import { useState } from "react";


function Register () {
    const [Data, setData] = useState ({
        username:"",
        password:"",
        image: null,
      });

      const handleChange = (e) =>{
        setData({...Data, [e.target.name]: e.target.value});
      };
      const handleFileChange = (e) =>{
        setData({...Data, image: e.taarget.file[0]})
      };
      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(Data)
      }
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
             <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
                
            
            />
            <button type="submit">Register</button>
        </form>
      );
      
}
export default Register;

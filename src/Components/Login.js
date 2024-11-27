import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../API/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [Data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate(); 
  const { mutate } = useMutation({
    mutationKey: ["LogIn"],
    mutationFn: () => login(Data),
    onSuccess: () => {
      navigate("/profile");
    },
  });

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="Login-Container">
      <form className="Login-Form" onSubmit={handleSubmit}>
        <h1>Welcome</h1>
        <h3>Please LogIn to your Account</h3>
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
        <button className="Link-Btn" to="/Profile" type="submit">
          Login
        </button>
        <h3>If you don't have an account!</h3>
        <Link className="Link-Btn" to="/Register">
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;

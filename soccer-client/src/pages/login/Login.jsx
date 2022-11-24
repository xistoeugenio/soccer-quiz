import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const {login} = useContext(AuthContext);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(credentials)
      navigate("/")
    } catch (err) {
      console.log(err.response?.data  || "there is a problem with our server")
    }
  };

  return (
    <div className="login">
      <div className="inputs">
        <label>Email</label>
        <input type="text" name="email" onChange={handleChange} />
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange} />
      </div>
      <p>this is a error</p>
      <button onClick={handleClick}>login</button>
      <p>Don't you have an account? <Link to="/register">register</Link></p>
    </div>
  )
}

import "./login.scss"
import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatchAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(credentials)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/login", credentials);
      console.log(res.data)
    } catch (err) {
      console.log(err.response.data)
    }
  };

  return (
    <div className="login">
      <div className="inputs">
        <label>Email</label>
        <input type="text" name="email" onChange={handleChange}/>
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange}/>
      </div>
      <p>this is a error</p>
      <button onClick={handleClick}>login</button>
      <p>Don't you have an account? <Link to="/register">register</Link></p>
    </div>
  )
}

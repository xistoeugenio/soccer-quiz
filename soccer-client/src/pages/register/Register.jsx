import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import "./register.scss"

export default function Register() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    username: undefined
  });

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/register", credentials);
      navigate("/login")
    } catch (err) {
      setError(err.response.data.message)
    }
  };

  return (
    <div className="login">
      <form className="inputs" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange} />
        <button type="submit">dfafds</button>
      </form>
      {error ?
        <p className="error">
          {error}
          <Link to="/login">Login</Link>
        </p>
        :
        <p>Do you have an account? <Link to="/login">Login</Link></p>}
    </div>
  )
}

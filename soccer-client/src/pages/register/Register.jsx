import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { CircularProgress } from "@mui/material"
import "./register.scss"
import { makeRequest } from "../../axios";

export default function Register() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    username: undefined
  });

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await makeRequest.post("/register", credentials);
      navigate("/login")
    } catch (err) {
      setError(err.response?.data.message || "Problems on our server.")
    }
    setLoading(false)
  };

  return (
    <div className="register">
      <form className="inputs" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} required />
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange} required />
          {loading ? <CircularProgress /> :
          <div className="buttons">
            <Link to="/">
              <button className="back">back</button>
            </Link>
            <button type="submit">Register</button>
          </div>
        }
      </form>
      {error ?
        <p className="error">
          {
            (error === "User already exist! Check your email or username.") ?
              <>
                {error}
                < Link to="/login" className="link">Login</Link>
              </>
              :
              error

          }

        </p>
        :
        <p>Do you have an account? <Link to="/login" className="link">Login</Link></p>
      }
    </div >
  )
}

import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress } from "@mui/material";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      await login(credentials)
      navigate("/")
    } catch (err) {
      console.log(err.response?.data)
      setError(err.response?.data.message || "Problems on our server.")
    }
    setLoading(false)
  };

  return (
    <div className="login">
      <form className="inputs" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" name="email" onChange={handleChange} required />
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange} required />
        {loading ? <CircularProgress /> :
          <button type="submit">sign in</button>}

      </form>
      {
        error ?
          <p className="error">
            {
              (error === "User not found!") ?
                <>
                  {error}
                  < Link to="/register" className="link">Register</Link>
                </>
                :
                error

            }

          </p>
          :

          <p>Don't you have an account? <Link to="/register" className="link">register</Link></p>
      }
    </div>
  )
}

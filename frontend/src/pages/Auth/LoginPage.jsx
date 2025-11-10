import { useState, useContext } from "react";
import { FaUserLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setIsLoading, snackBar, setUser } = useContext(GeneralContext);

  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email) {
      snackBar("Eamil is required");
      return;
    }
    if (!formData.password) {
      snackBar("Password is required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const userData = await response.json();

      if (userData.user.token) {
        localStorage.setItem("token", userData.user.token);
      }

      setUser(userData);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="smallFrame">
      <h2>
        Login <FaUserLock />
      </h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleInputChange}
          />
        </label>

        <button>Login</button>
      </form>

      <p className="login-link">
        <Link to="/signup">Don't have an account yet?</Link>
      </p>
    </div>
  );
}

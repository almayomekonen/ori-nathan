import { useState, useContext } from "react";
import { FaUserLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  const { setIsLoading, snackBar } = useContext(GeneralContext);

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
      const response = await fetch("http://localhost:3000/api/signup", {
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
      console.log(userData);
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
        Signup <FaUserLock />
      </h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="full-name">
          full name
          <input
            name="fullName"
            id="full-name"
            type="text"
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="username">
          username
          <input
            name="username"
            id="username"
            type="text"
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            name="password"
            id="password"
            type="password"
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            name="email"
            id="email"
            type="email"
            onChange={handleInputChange}
          />
        </label>

        <button>Signup</button>
      </form>

      <p className="signup-link">
        <Link to="/">Click here to login</Link>
      </p>
    </div>
  );
}

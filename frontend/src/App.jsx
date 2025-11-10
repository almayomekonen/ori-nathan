import { FcNews } from "react-icons/fc";
import { Router, RouterAuth } from "./Router";
import React, { useState, useEffect } from "react";
import Logout from "./pages/Auth/Logout";
import Loader from "./components/ui/Loader";
import Snackbar from "./components/ui/Snackbar";

export const GeneralContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");

  function snackBar(text) {
    setSnackBarText(text);
    setTimeout(() => setSnackBarText(""), 3000);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <GeneralContext.Provider value={{ user, snackBar, setIsLoading, setUser }}>
      <div>
        <h1>
          News Management <FcNews />
        </h1>

        <div className="frame">
          {user && <Logout />}
          {isLoading && <Loader />}
          {user ? <Router /> : <RouterAuth />}
          {snackBarText && <Snackbar text={snackBarText} />}
        </div>
      </div>
    </GeneralContext.Provider>
  );
}

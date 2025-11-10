import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";

export default function Logout() {
  const { user, snackBar, setIsLoading, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoading(true);
    localStorage.removeItem("token");
    setUser(null);
    setIsLoading(false);

    snackBar(`Bye ${user.user.name.toUpperCase()} see you soon ☺️`);
    navigate("/");
  }

  if (!user) {
    return null;
  }

  return (
    <div className="user">
      <h3 className="user-desc">
        Hey! <span className="user-name">{user.user.name.toUpperCase()}</span>{" "}
        Welcome to the app
      </h3>

      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </div>
  );
}

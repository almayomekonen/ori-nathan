import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import Articles from "./pages/News/Articles";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Articles />} />
    </Routes>
  );
}

export function RouterAuth() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

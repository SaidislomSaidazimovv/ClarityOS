import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LogoMaker from "./pages/LogoMaker";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cabinet from "./pages/Cabinet";
import NewChat from "./pages/NewChat";

import "./App.css";

function App() {
  const location = useLocation();

  const hideLayout = ["/login", "/register", "/logo-maker", "/new-chat"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}

      <div className={`flex-grow ${!hideLayout ? "pt-20" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logo-maker" element={<LogoMaker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/new-chat" element={<NewChat />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;

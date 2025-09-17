import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslator } from "../hooks/useTranslator";

export default function Header() {
  const [role, setRole] = useState("guest");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const navigate = useNavigate();

  const loginText = useTranslator("Login");
  const logoMakerText = useTranslator("Logo Maker");
  const cabinetText = useTranslator("Cabinet");
  const dashboardText = useTranslator("Dashboard");
  const logoutText = useTranslator("Logout");

  const checkAuth = () => {
    const admin = localStorage.getItem("currentAdmin");
    const user = localStorage.getItem("currentUser");
    if (admin) setRole("admin");
    else if (user) setRole("user");
    else setRole("guest");
  };

  useEffect(() => {
    checkAuth();
    const listener = () => checkAuth();
    window.addEventListener("authChange", listener);
    return () => window.removeEventListener("authChange", listener);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentAdmin");
    localStorage.removeItem("currentUser");
    setRole("guest");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    window.dispatchEvent(new Event("langChange"));
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto bg-white/70 backdrop-blur-lg shadow-lg">
        <nav className="flex justify-between items-center py-4 px-6">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/"
              className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-[length:200%_200%] bg-clip-text text-transparent hover:opacity-90 transition"
            >
              LogoMaker
            </Link>
          </motion.div>

          <motion.ul
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex gap-6 text-gray-700 font-medium items-center"
          >
            <li>
              <div className="relative">
                <select
                  value={lang}
                  onChange={handleLanguageChange}
                  className="appearance-none px-3 py-2 pr-8 rounded-lg border border-gray-300 text-sm font-medium 
                 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 cursor-pointer transition"
                >
                  <option value="ru">RU</option>
                  <option value="uz">UZ</option>
                  <option value="en">EN</option>
                  <option value="zh">CN</option>
                </select>
                <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </li>

            <li>
              <Link
                to="/login"
                className="relative hover:text-indigo-600 transition after:content-[''] after:block after:h-[2px] after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {loginText}
              </Link>
            </li>

            {role === "user" && (
              <>
                <li>
                  <Link
                    to="/logo-maker"
                    className="relative hover:text-indigo-600 transition after:content-[''] after:block after:h-[2px] after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {logoMakerText}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cabinet"
                    className="relative hover:text-indigo-600 transition after:content-[''] after:block after:h-[2px] after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {cabinetText}
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <li>
                <Link
                  to="/dashboard"
                  className="relative hover:text-indigo-600 transition after:content-[''] after:block after:h-[2px] after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {dashboardText}
                </Link>
              </li>
            )}

            {(role === "user" || role === "admin") && (
              <li>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow hover:opacity-90 transition"
                >
                  {logoutText}
                </motion.button>
              </li>
            )}
          </motion.ul>
        </nav>
      </div>
    </header>
  );
}

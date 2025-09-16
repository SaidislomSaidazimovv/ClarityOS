import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslator } from "../hooks/useTranslator";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const ADMIN_EMAIL = "admin@logo.uz";
  const ADMIN_PASSWORD = "admin123";

  const loginText = useTranslator("Login");
  const emailText = useTranslator("Email");
  const passwordText = useTranslator("Password");
  const noAccountText = useTranslator("Don’t have an account?");
  const registerText = useTranslator("Register");
  const adminSuccessText = useTranslator("Admin sifatida kirdingiz ✅");
  const successText = useTranslator("Login muvaffaqiyatli ✅");
  const errorText = useTranslator("Email yoki parol noto‘g‘ri ❌");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      localStorage.setItem("currentAdmin", JSON.stringify({ email: ADMIN_EMAIL }));
      window.dispatchEvent(new Event("authChange"));
      alert(adminSuccessText);
      navigate("/dashboard");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const validUser = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      window.dispatchEvent(new Event("authChange"));
      alert(successText);
      navigate("/logo-maker");
    } else {
      alert(errorText);
    }
  };

  return (
    <div className="container mx-auto py-50 px-6 max-w-md">
      <h2 className="text-3xl font-bold mb-6">{loginText}</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder={emailText}
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder={passwordText}
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {loginText}
        </button>
      </form>
      <p className="mt-4">
        {noAccountText}{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-indigo-500 cursor-pointer"
        >
          {registerText}
        </span>
      </p>
    </div>
  );
}

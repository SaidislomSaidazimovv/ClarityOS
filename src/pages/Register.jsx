import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslator } from "../hooks/useTranslator";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const registerText = useTranslator("Register");
  const emailText = useTranslator("Email");
  const passwordText = useTranslator("Password");
  const alreadyHaveText = useTranslator("Already have an account?");
  const loginText = useTranslator("Login");
  const errorText = useTranslator("Bu email allaqachon ro‘yxatdan o‘tgan ❌");
  const successText = useTranslator("Ro‘yxatdan muvaffaqiyatli o‘tdingiz ✅");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      alert(errorText);
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(form));
    window.dispatchEvent(new Event("authChange"));

    alert(successText);
    navigate("/brief-builder");
  };

  return (
    <div className="container mx-auto py-50 px-6 max-w-md">
      <h2 className="text-3xl font-bold mb-6">{registerText}</h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
          {registerText}
        </button>
      </form>
      <p className="mt-4">
        {alreadyHaveText}{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-indigo-500 cursor-pointer"
        >
          {loginText}
        </span>
      </p>
    </div>
  );
}

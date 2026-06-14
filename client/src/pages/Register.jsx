import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-3xl p-8">
        <p className="text-purple-400 font-semibold mb-2">AI Creative Studio</p>

        <h1 className="text-4xl font-bold mb-2">Create Account</h1>

        <p className="text-slate-300 mb-8">
          Join ImageStudio and create professional AI portraits.
        </p>

        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none"
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none"
          />

          {error && <p className="text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-slate-300 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
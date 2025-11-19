import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { login as loginRequest } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res) => {
      login(res.data.token, res.data.user);
      navigate("/admin");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg px-3 py-2 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg px-3 py-2 w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg transition"
        >
          Ingresar
        </button>

        {mutation.isError && (
          <p className="text-red-600 text-center">Credenciales incorrectas</p>
        )}

        <p className="text-center text-sm text-gray-600">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
}

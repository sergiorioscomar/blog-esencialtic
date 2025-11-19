import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate("/login"),
  });

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Crear cuenta</h2>

        <input
          type="text"
          placeholder="Nombre"
          className="border rounded-lg px-3 py-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
          Registrarse
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useLogin } from "../hooks/useAuthMutations";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const mutation = useLogin();

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutation.mutate(form, {
      onSuccess: () => navigate("/admin"),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-gradient">
          Iniciar Sesión
        </h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            className={`border rounded-lg px-3 py-2 w-full ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            className={`border rounded-lg px-3 py-2 w-full ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Ingresando..." : "Ingresar"}
        </button>

        {mutation.isError && (
          <p className="text-red-600 text-center">
            {mutation.error?.response?.data?.message ||
              "Credenciales incorrectas"}
          </p>
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

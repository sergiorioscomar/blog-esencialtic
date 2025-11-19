import { useState } from "react";
import { useRegister } from "../hooks/useAuthMutations";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    password_confirmation: ""
  });
  const [errors, setErrors] = useState({});

  const mutation = useRegister();

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El email no es válido";
    }
    
    if (!form.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Las contraseñas no coinciden";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    mutation.mutate(form, {
      onSuccess: () => {
        navigate("/login");
      },
    });
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
          value={form.name}
          className={`border rounded-lg px-3 py-2 w-full ${errors.name ? "border-red-500" : ""}`}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className={`border rounded-lg px-3 py-2 w-full ${errors.email ? "border-red-500" : ""}`}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className={`border rounded-lg px-3 py-2 w-full ${errors.password ? "border-red-500" : ""}`}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password}</p>
        )}

        <input
          type="password"
          placeholder="Confirmar Password"
          value={form.password_confirmation}
          className={`border rounded-lg px-3 py-2 w-full ${errors.password_confirmation ? "border-red-500" : ""}`}
          onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
        />
        {errors.password_confirmation && (
          <p className="text-red-600 text-sm">{errors.password_confirmation}</p>
        )}

        <button 
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Registrando..." : "Registrarse"}
        </button>

        {mutation.isError && (
          <p className="text-red-600 text-center">
            {mutation.error?.response?.data?.message || "Error al registrar. Intenta nuevamente."}
          </p>
        )}

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

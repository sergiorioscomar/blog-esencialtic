import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "../hooks/usePasswordReset";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: searchParams.get("email") || "",
    token: searchParams.get("token") || "",
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState("");

  const resetPasswordMutation = useResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.password || form.password !== form.password_confirmation) {
      setMessage("Las contraseñas deben coincidir.");
      return;
    }

    resetPasswordMutation.mutate(form, {
      onSuccess: () => {
        setMessage("Contraseña actualizada correctamente. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2500);
      },
      onError: (error) => {
        setMessage(error.response?.data?.message || "No pudimos actualizar tu contraseña.");
      },
    });
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Restablecer contraseña</h1>
      <p className="text-gray-600 mb-4">
        Ingresa tu nueva contraseña para continuar.
      </p>

      {message && (
        <p className={`mb-4 ${resetPasswordMutation.isError ? "text-red-600" : "text-emerald-600"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white shadow rounded-xl p-6">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-600">Correo electrónico</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="border rounded-lg px-3 py-2"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-600">Token</span>
          <input
            type="text"
            value={form.token}
            onChange={(e) => setForm((prev) => ({ ...prev, token: e.target.value }))}
            className="border rounded-lg px-3 py-2"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-600">Nueva contraseña</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            className="border rounded-lg px-3 py-2"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-600">Confirmar contraseña</span>
          <input
            type="password"
            value={form.password_confirmation}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password_confirmation: e.target.value }))
            }
            className="border rounded-lg px-3 py-2"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg disabled:opacity-60"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? "Guardando..." : "Guardar contraseña"}
        </button>
      </form>

      <Link to="/login" className="text-blue-600 hover:underline inline-block mt-6">
        ← Volver al login
      </Link>
    </div>
  );
}

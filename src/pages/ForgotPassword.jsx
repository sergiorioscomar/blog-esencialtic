import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../hooks/usePasswordReset";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setMessage("Te enviamos un correo con instrucciones para recuperar tu contraseña.");
        },
        onError: (error) => {
          setMessage(error.response?.data?.message || "No pudimos enviar el correo. Intenta nuevamente.");
        },
      },
    );
  };

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">¿Olvidaste tu contraseña?</h1>
      <p className="text-gray-600 mb-4">
        Ingresa tu correo y te enviaremos un enlace para restablecerla.
      </p>

      {message && (
        <p className={`mb-4 ${forgotPasswordMutation.isError ? "text-red-600" : "text-emerald-600"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white shadow rounded-xl p-6">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-600">Correo electrónico</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-60"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? "Enviando..." : "Enviar instrucciones"}
        </button>
      </form>

      <Link to="/login" className="text-blue-600 hover:underline inline-block mt-6">
        ← Volver al login
      </Link>
    </div>
  );
}

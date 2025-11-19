import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout, user } = useAuth();

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          📝 Porfolio
        </Link>

        <div className="flex gap-4 items-center">
          <Link to="/" className="text-gray-700 hover:underline">
            Inicio
          </Link>

          {token ? (
            <>
              {user?.role === "admin" && (
                <Link to="/admin" className="text-blue-600 hover:underline">
                  Admin
                </Link>
              )}

              {user?.id === 2 && (
                <a href="/admin/users" className="ml-4 text-blue-600">
                  Users
                </a>
              )}
              <button
                onClick={logout}
                className="text-blue-600 hover:underline"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout, user } = useAuth();

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo - vuelve al inicio */}
        <NavLink
          to="/"
          className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
          Porfolio
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm sm:text-base">
          
          {/* <NavLink 
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Inicio
          </NavLink> */}

          {token ? (
            <>
              <NavLink
                to="/panel/services"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                }
              >
                Servicios
              </NavLink>

              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                  }
                >
                  Admin
                </NavLink>
              )}

              {user?.id === 2 && (
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "text-gray-700"
                  }
                >
                  Users
                </NavLink>
              )}

              <button
                onClick={logout}
                className="text-blue-600 hover:underline"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink to="/login" className="text-blue-600 hover:underline">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

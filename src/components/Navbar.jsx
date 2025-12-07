import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IconWrapper = ({ className = "h-4 w-4", children }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const ProfileIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5.5 19c1.3-2.5 3.8-4 6.5-4s5.2 1.5 6.5 4" />
  </IconWrapper>
);

const ServicesIcon = (props) => (
  <IconWrapper {...props}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </IconWrapper>
);

const AdminIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M12 4l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V7l7-3z" />
    <path d="M9.5 13.5l2.5 2.5 4-4" />
  </IconWrapper>
);

const UsersIcon = (props) => (
  <IconWrapper {...props}>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="8" r="3" />
    <path d="M4 20c0-3 2.5-5.5 5.5-5.5h1" />
    <path d="M19.5 14.5h-1c-3 0-5.5 2.5-5.5 5.5" />
  </IconWrapper>
);

const LogoutIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M15 7l5 5-5 5" />
    <path d="M20 12H9" />
    <path d="M11 5V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-1" />
  </IconWrapper>
);

const LoginIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M9 7L4 12l5 5" />
    <path d="M4 12h11" />
    <path d="M13 5V4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-1" />
  </IconWrapper>
);

export default function Navbar() {
  const { token, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseLinkStyles =
    "flex items-center gap-2 transition-colors duration-150 hover:text-emerald-600";

  const desktopLinkClass = ({ isActive }) =>
    `${baseLinkStyles} ${isActive ? "text-emerald-600 font-semibold" : "text-gray-700"}`;

  const mobileLinkClass = ({ isActive }) =>
    `${baseLinkStyles} w-full text-left ${
      isActive ? "text-emerald-600 font-semibold" : "text-gray-700"
    }`;

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const renderLinks = (mobile = false) => {
    const linkClass = mobile ? mobileLinkClass : desktopLinkClass;
    const handleClick = mobile ? closeMenu : undefined;

    if (!token) {
      return (
        <NavLink
          to="/login"
          className={`flex items-center gap-2 text-emerald-600 hover:text-emerald-700 ${
            mobile ? "w-full text-left" : ""
          }`}
          onClick={handleClick}
        >
          <LoginIcon className="h-4 w-4" />
          <span>Login</span>
        </NavLink>
      );
    }

    return (
      <>
        <NavLink to="/profile" className={linkClass} onClick={handleClick}>
          <ProfileIcon className="h-4 w-4" />
          <span>Perfil</span>
        </NavLink>

        <NavLink to="/panel/services" className={linkClass} onClick={handleClick}>
          <ServicesIcon className="h-4 w-4" />
          <span>Servicios</span>
        </NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin" className={linkClass} onClick={handleClick}>
            <AdminIcon className="h-4 w-4" />
            <span>Admin</span>
          </NavLink>
        )}

        {user?.id === 2 && (
          <NavLink to="/admin/users" className={linkClass} onClick={handleClick}>
            <UsersIcon className="h-4 w-4" />
            <span>Users</span>
          </NavLink>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className={`flex items-center gap-2 text-emerald-600 hover:text-emerald-700 ${
            mobile ? "w-full text-left" : ""
          }`}
        >
          <LogoutIcon className="h-4 w-4" />
          <span>Cerrar sesión</span>
        </button>
      </>
    );
  };

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo - vuelve al inicio */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="https://esencialtic.com.ar/assets/img/ESENCIALTIC.png"
            alt="Porfolio"
            className="h-14 object-contain drop-shadow-[2px_4px_6px_rgba(0,0,0,0.9)]"
          />
          <span className="sr-only">Porfolio</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 text-sm sm:text-base">
          {renderLinks()}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-gray-600 hover:text-emerald-600 focus:outline-none"
          aria-expanded={isMenuOpen}
          aria-label="Menú"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t border-gray-100 transition-all duration-200 ease-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-3 text-base">
          {renderLinks(true)}
        </div>
      </div>
    </nav>
  );
}

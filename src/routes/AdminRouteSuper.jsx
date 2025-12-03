import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRouteSuper({ children }) {
  const { user } = useAuth();

  // id=1 superadmin
  if (user?.id !== 1) return <Navigate to="/" />;

  return children;
}

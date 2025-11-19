import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRouteSuper({ children }) {
  const { user } = useAuth();

  if (user?.id !== 2) return <Navigate to="/" />;

  return children;
}

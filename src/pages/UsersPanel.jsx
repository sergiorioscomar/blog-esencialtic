import { useUsers, useUpdateUserRole } from "../hooks/useUsers";
import { useAuth } from "../context/AuthContext";

export default function UsersPanel() {
  const { user } = useAuth();
  const { data: users, isLoading } = useUsers();
  const updateRole = useUpdateUserRole();

  // Acceso solo para superusuario
  if (user?.id !== 2) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-center text-red-600">
        No tienes permiso para acceder a esta sección.
      </div>
    );
  }

  if (isLoading) {
    return <p className="text-center py-10">Cargando usuarios...</p>;
  }

  if (!users || !Array.isArray(users) || users.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Administrar Roles de Usuarios</h1>
        <p className="text-gray-500">No hay usuarios disponibles.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Administrar Roles de Usuarios</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Rol actual</th>
              <th className="p-2 text-left">Acción</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button
                    onClick={() =>
                      updateRole.mutate({
                        id: u.id,
                        role: u.role === "admin" ? "user" : "admin",
                      })
                    }
                    className="px-3 py-1 bg-emerald-600 text-white rounded"
                  >
                    {u.role === "admin" ? "Quitar Admin" : "Hacer Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

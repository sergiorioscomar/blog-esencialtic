import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function UsersPanel() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Solo superusuario id=2
  if (user?.id !== 2) {
    return (
      <div className="p-6 text-center text-red-600">
        No tienes permiso para acceder a esta sección.
      </div>
    );
  }

  // Obtener usuarios
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });

  // Mutación para cambiarles el rol
  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return api.post(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  if (isLoading) return <p className="p-6">Cargando usuarios...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-xl font-bold mb-4">Administrar Roles de Usuarios</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rol actual</th>
            <th className="p-2 border">Acción</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border">
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>

              <td className="p-2 border">
                <button
                  onClick={() =>
                    mutation.mutate({
                      id: u.id,
                      role: u.role === "admin" ? "user" : "admin",
                    })
                  }
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  {u.role === "admin" ? "Quitar Admin" : "Hacer Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function Dashboard() {
  const { role, token, logout } = useAuth();

  // lista de posts (del admin)
  const { data: posts } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const res = await api.get("/posts");
      return res.data;
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Panel Admin</h2>

      <div className="flex gap-4 mb-6">
        {role === "admin" && (
          <Link
            to="/admin/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ➕ Crear nuevo Post
          </Link>
        )}

      </div>

      <table className="w-full">
        <thead>
          <tr className="font-semibold text-gray-600">
            <th className="text-left p-2">Título</th>
            <th className="text-center p-2">Acciones</th>
          </tr>
          
        </thead>

        <tbody>
          {posts?.map((post) => (
            <tr key={post.id} className="border-b">
              <td className="p-2">{post.titulo}</td>

              <td className="p-2 flex justify-evenly gap-4">
                
                {role === "admin" && (
                  <>
                    <Link to={`/admin/edit/${post.id}`} className="text-blue-600">
                      Editar
                    </Link>

                    <button
                      className="text-red-600"
                      onClick={() => console.log("delete", post.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts, useDeletePost } from "../hooks/usePosts";

export default function Dashboard() {
  const { role } = useAuth();
  const { data: posts, isLoading } = usePosts();
  const deletePost = useDeletePost();

  if (isLoading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">Panel Admin</h2>

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
          {posts && Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
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
                        onClick={() => {
                          if (confirm("¿Estás seguro de eliminar este post?")) {
                            deletePost.mutate(post.id);
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="p-4 text-center text-gray-500">
                No hay publicaciones disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

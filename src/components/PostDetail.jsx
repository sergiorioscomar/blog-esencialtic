import { useParams, Link } from "react-router-dom";
import { usePost } from "../hooks/usePosts";

export default function PostDetail() {
  const { id } = useParams();
  const { data: post, isLoading, error } = usePost(id);

  if (isLoading) return <p className="text-center text-gray-500 mt-6">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">Error cargando publicaciones.</p>;
  if (!post) return <p className="text-center text-gray-500 mt-6">Publicaciones no encontradas.</p>;

  const parseDate = (d) => {
    if (!d) return "";
    const iso = d.replace(" ", "T");
    const dateObj = new Date(iso);
    if (Number.isNaN(dateObj.getTime())) return d;
    return dateObj.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="text-blue-600 hover:underline block mb-4"
      >
        ← Volver
      </Link>

      <h1 className="text-4xl font-bold mb-4">{post.titulo}</h1>

      <p className="text-gray-500 mb-6">
        {post.autor} • {parseDate(post.fecha_publicacion)} •{" "}
        {post.categoria || "Sin categoría"}
      </p>

      {post.imagen && (
        <img
          src={post.imagen}
          alt={post.titulo}
          onError={(e) => (e.target.src = "/img/posts/default.png")}
          className="rounded-lg shadow mb-6 w-full object-cover"
        />
      )}

      <div className="prose prose-lg max-w-none">
        {post.content || post.descripcion}
      </div>
    </div>
  );
}

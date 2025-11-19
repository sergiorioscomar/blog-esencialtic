export default function PostCard({ post }) {
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
    <article className="rounded-xl bg-white shadow-lg overflow-hidden hover:shadow-xl transition">
      
      <a href={`/post/${post.id}`}>
        <img
          src={post.imagen}
          alt={post.titulo}
          onError={(e) => (e.target.src = "/posts/default.png")}
          className="w-full h-48 object-cover"
        />
      </a>

      <div className="p-4 flex flex-col gap-3">
        
        <h3 className="text-xl font-semibold">{post.titulo}</h3>

        <p className="text-gray-600">{post.descripcion}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{post.autor}</span> •
          <span>{parseDate(post.fecha_publicacion)}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
            {post.categoria || "Sin categoría"}
          </span>

          <a
            className="text-blue-600 hover:underline text-sm font-medium"
            href={`/post/${post.id}`}
          >
            Leer
          </a>
        </div>
      </div>
    </article>
  );
}

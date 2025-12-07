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

          {/* CATEGORÍA */}
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">
            {post.categoria || "Sin categoría"}
          </span>

          {/* ACCIONES: LEER + GITHUB */}
          <div className="flex items-center gap-3">

            {/* Ícono leer */}
            <a 
              href={`/post/${post.id}`}
              className="text-emerald-600 hover:text-emerald-800 transition"
              title="Leer publicación"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12l-7.5 7.5M3 12h18" 
                />
              </svg>
            </a>

            {/* GitHub icon */}
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition"
                title="Ver repositorio en GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.45 7.9 10.98.58.1.8-.25.8-.57v-2.1c-3.22.7-3.9-1.55-3.9-1.55-.53-1.35-1.3-1.7-1.3-1.7-1.06-.7.08-.7.08-.7 1.17.08 1.8 1.2 1.8 1.2 1.04 1.78 2.75 1.27 3.42.97.1-.75.4-1.27.72-1.57-2.57-.3-5.28-1.3-5.28-5.83 0-1.27.45-2.32 1.2-3.15-.12-.3-.52-1.52.12-3.17 0 0 .97-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.22-1.5 3.2-1.2 3.2-1.2.64 1.65.24 2.87.12 3.17.75.83 1.2 1.88 1.2 3.15 0 4.54-2.72 5.52-5.3 5.82.43.38.8 1.12.8 2.27v3.37c0 .33.22.68.82.57A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>
            )}

          </div>
        </div>
      </div>
    </article>
  );
}

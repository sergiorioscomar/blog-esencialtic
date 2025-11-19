import { usePosts } from "../hooks/usePosts";
import PostCard from "./PostCard";

export default function PostsList() {
  const { data, isLoading } = usePosts();

  if (isLoading) return <p className="text-center py-10">Cargando publicaciones...</p>;
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p className="text-center py-10 text-gray-500">No hay publicaciones disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

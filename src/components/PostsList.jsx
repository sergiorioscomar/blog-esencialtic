import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import PostCard from "./PostCard";

export default function PostsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

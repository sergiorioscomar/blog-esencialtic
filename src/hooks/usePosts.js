// src/hooks/usePosts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../api/posts";

// Hook para obtener todos los posts
export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 1000 * 30, // Cache por 30 segundos
  });
}

// Hook para obtener un post específico
export function usePost(id) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id, // Solo ejecuta si hay un id
  });
}

// Hook para crear un post
export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // Refresca el listado
    },
  });
}

// Hook para actualizar un post
export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
    },
  });
}

// Hook para eliminar un post
export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

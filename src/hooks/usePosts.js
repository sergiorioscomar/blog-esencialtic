// src/hooks/usePosts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export function usePosts() {
  return useQuery(["posts"], async () => {
    const res = await api.get("/api/posts");
    return res.data;
  }, {
    staleTime: 1000 * 30,
  });
}

export function usePost(id) {
  return useQuery(["post", id], async () => {
    const res = await api.get(`/api/posts/${id}`);
    return res.data;
  }, {
    enabled: !!id,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation(
    async (payload) => {
      const res = await api.post("/api/posts", payload);
      return res.data;
    },
    {
      onSuccess: () => {
        qc.invalidateQueries(["posts"]); // refresca listado
      },
    }
  );
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation(
    async (id) => {
      const res = await api.delete(`/api/posts/${id}`);
      return res.data;
    },
    {
      onSuccess: () => qc.invalidateQueries(["posts"]),
    }
  );
}

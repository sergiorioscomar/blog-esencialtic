import { useState, useEffect } from "react";
import { getPost, updatePost } from "../api/posts";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    categoria: "",
    content: "",
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      navigate("/admin");
    },
  });

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, data: form });
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-2">Editar Post</h2>

        <input
          placeholder="Título"
          className="border rounded-lg px-3 py-2"
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />

        <input
          placeholder="Imagen (URL)"
          className="border rounded-lg px-3 py-2"
          onChange={(e) => setForm({ ...form, imagen: e.target.value })}
        />

        <input
          placeholder="Categoría"
          className="border rounded-lg px-3 py-2"
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        />

        <textarea
          placeholder="Descripción"
          className="border rounded-lg px-3 py-2 h-24"
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />

        <textarea
          placeholder="Contenido"
          className="border rounded-lg px-3 py-2 h-40"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
         Guardar cambios
        </button>
      </form>
    </div>
  );
}

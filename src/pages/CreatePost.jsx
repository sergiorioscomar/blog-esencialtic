import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    categoria: "",
    content: "",
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => navigate("/admin"),
  });

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-2">Crear Post</h2>

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
          Guardar
        </button>
      </form>
    </div>
  );
}

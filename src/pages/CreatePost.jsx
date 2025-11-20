import { useState } from "react";
import { useCreatePost } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    categoria: ""
  });
  const [errors, setErrors] = useState({});

  const mutation = useCreatePost();

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.titulo.trim()) {
      newErrors.titulo = "El título es requerido";
    }
    
    if (!form.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }

    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    mutation.mutate(form, {
      onSuccess: () => navigate("/admin"),
    });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-2">Crear Proyecto</h2>

        <input
          placeholder="Título"
          value={form.titulo}
          className={`border rounded-lg px-3 py-2 ${errors.titulo ? "border-red-500" : ""}`}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />
        {errors.titulo && (
          <p className="text-red-600 text-sm">{errors.titulo}</p>
        )}

        <input
          placeholder="Imagen (URL)"
          value={form.imagen}
          type="url"
          className="border rounded-lg px-3 py-2"
          onChange={(e) => setForm({ ...form, imagen: e.target.value })}
        />

        <input
          placeholder="Categoría"
          value={form.categoria}
          className="border rounded-lg px-3 py-2"
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        />

        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          className={`border rounded-lg px-3 py-2 h-24 ${errors.descripcion ? "border-red-500" : ""}`}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        {errors.descripcion && (
          <p className="text-red-600 text-sm">{errors.descripcion}</p>
        )}
        
        {mutation.isError && (
          <p className="text-red-600 text-center">
            {mutation.error?.response?.data?.message || "Error al crear el post. Intenta nuevamente."}
          </p>
        )}

        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}

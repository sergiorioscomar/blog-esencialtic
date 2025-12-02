import { useEffect, useState } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  category: "",
  image_url: "",
};

const mapInitialValues = (values = {}) => ({
  title: values.title ?? values.titulo ?? "",
  description: values.description ?? values.descripcion ?? "",
  price: values.price ?? values.precio ?? "",
  category: values.category ?? values.categoria ?? "",
  image_url: values.image_url ?? values.image ?? values.imagen ?? "",
});

export default function ServiceForm({
  initialValues,
  onSubmit,
  submitLabel = "Guardar servicio",
  title = "Servicio",
  isSubmitting = false,
  serverError = "",
}) {
  const [form, setForm] = useState(mapInitialValues(initialValues));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setForm(mapInitialValues(initialValues));
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "El título es obligatorio";
    }

    if (!form.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    }

    if (form.price === "" || Number.isNaN(Number(form.price))) {
      newErrors.price = "Ingresa un precio válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      image_url: form.image_url,
      image: form.image_url,
      imagen: form.image_url,
      titulo: form.title,
      descripcion: form.description,
      categoria: form.category,
      precio: Number(form.price),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-xl flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>

      <input
        placeholder="Título"
        value={form.title}
        className={`border rounded-lg px-3 py-2 ${errors.title ? "border-red-500" : ""}`}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

      <textarea
        placeholder="Descripción"
        value={form.description}
        className={`border rounded-lg px-3 py-2 h-32 ${errors.description ? "border-red-500" : ""}`}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      {errors.description && (
        <p className="text-red-600 text-sm">{errors.description}</p>
      )}

      <input
        placeholder="Precio"
        type="number"
        min="0"
        step="0.01"
        value={form.price}
        className={`border rounded-lg px-3 py-2 ${errors.price ? "border-red-500" : ""}`}
        onChange={(e) => handleChange("price", e.target.value)}
      />
      {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}

      <input
        placeholder="Categoría"
        value={form.category}
        className="border rounded-lg px-3 py-2"
        onChange={(e) => handleChange("category", e.target.value)}
      />

      <input
        placeholder="Imagen (URL)"
        value={form.image_url}
        className="border rounded-lg px-3 py-2"
        onChange={(e) => handleChange("image_url", e.target.value)}
      />

      {serverError && (
        <p className="text-red-600 text-center">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}

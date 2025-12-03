import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useService, useHireService } from "../hooks/useServices";

export default function ServiceDetail() {
  const { id } = useParams();
  const { data: service, isLoading, error } = useService(id);
  const hireService = useHireService();
  const [feedback, setFeedback] = useState("");

  const handleHire = () => {
    setFeedback("");
    hireService.mutate(id, {
      onSuccess: () =>
        setFeedback("¡Listo! Te contactaremos para avanzar con el servicio."),
      onError: () =>
        setFeedback("No pudimos procesar tu solicitud. Intenta nuevamente."),
    });
  };

  if (isLoading) {
    return <p className="text-center py-10">Cargando servicio...</p>;
  }

  if (error || !service) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10 text-center">
        <p className="text-gray-600 mb-4">
          No encontramos información del servicio.
        </p>
        <Link to="/panel/services" className="text-blue-600 hover:underline">
          ← Volver al listado
        </Link>
      </div>
    );
  }

  const title = service.title ?? service.titulo ?? service.nombre;
  const category = service.category ?? service.categoria;
  const image =
    service.image_url ??
    service.image ??
    service.imagen ??
    "/img/service/default.png";
  const description = service.description ?? service.descripcion ?? "";
  const content = service.content ?? service.content ?? "";
  const displayPrice = service.price ?? service.precio;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/panel/services" className="text-blue-600 hover:underline">
        ← Volver
      </Link>

      <h1 className="text-4xl font-bold mt-4">
        {title}
      </h1>

      {category && (
        <p className="text-gray-500 mt-2">{category}</p>
      )}
{/*
      {displayPrice !== undefined &&
        displayPrice !== null &&
        displayPrice !== "" && (
        <p className="text-2xl font-semibold text-emerald-600 mt-4">
          {`$${displayPrice}`}
        </p>
      )}
*/}
      <img
        src={image}
        alt={title}
        className="mt-6 rounded-lg"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/img/service/default.png";
        }}
      />

      <p className="mt-6 text-lg text-gray-700">{description}</p>
      <p className="mt-6 text-lg text-gray-700">{content}</p>

      {feedback && (
        <div className="mt-6 p-4 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
          {feedback}
        </div>
      )}

      <button
        onClick={handleHire}
        className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg disabled:opacity-60"
        disabled={hireService.isPending}
      >
        {hireService.isPending ? "Enviando..." : "Solicitar cotización"}
      </button>
    </div>
  );
}

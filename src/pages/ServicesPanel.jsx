import { useState } from "react";
import { Link } from "react-router-dom";
import { useServices, useHireService } from "../hooks/useServices";

export default function ServicesPanel() {
  const { data: services, isLoading, error } = useServices();
  const hireService = useHireService();
  const [feedback, setFeedback] = useState("");

  const handleHire = (serviceId) => {
    setFeedback("");
    hireService.mutate(serviceId, {
      onSuccess: () => setFeedback("¡Se solicito la cotizacion con exito! Nuestro equipo te contactará pronto."),
      onError: () =>
        setFeedback("No se pudo pedir cotizacion el servicio. Intenta nuevamente."),
    });
  };

  if (isLoading) {
    return <p className="text-center py-10">Cargando servicios...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-600">
        Ocurrió un error al cargar los servicios.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Servicios disponibles</h1>
          <p className="text-gray-600">
            Nuestros servicios profesionales listos para contratar.
          </p>
        </div>
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline self-start sm:self-center"
        >
          ← Volver al inicio
        </Link>
      </div>

      {feedback && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
          {feedback}
        </div>
      )}

      {services && Array.isArray(services) && services.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => {
            const title = service.title ?? service.titulo ?? service.nombre;
            const category = service.category ?? service.categoria;
            const description = service.description ?? service.descripcion ?? "";
            const displayPrice = service.price ?? service.precio;
            const image =
              service.image_url ??
              service.image ??
              service.imagen ??
              "/img/posts/default.png";
            return (
              <article
                key={service.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4"
              >
                <div className="md:w-48 flex-shrink-0">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover rounded-xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/img/posts/default.png";
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-gray-500">
                      {category || "Servicio"}
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {title}
                    </h3>
                  </div>
                  <p className="text-gray-600 flex-1">{description}</p>
                  {/*
                  {displayPrice !== undefined &&
                    displayPrice !== null &&
                    displayPrice !== "" && (
                    <p className="font-semibold text-emerald-600 text-lg">
                      {`Desde $${displayPrice}`}
                    </p>
                  )} */}

                  <div className="flex items-center gap-4 mt-2">
                    <Link
                      to={`/panel/services/${service.id}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Ver detalle
                    </Link>

                    <button
                      onClick={() => handleHire(service.id)}
                      className="px-5 py-2 bg-emerald-600 text-white font-semibold rounded-lg disabled:opacity-60"
                      disabled={hireService.isPending}
                    >
                      {hireService.isPending ? "Enviando..." : "Solicitar cotización"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No hay servicios cargados todavía.
        </p>
      )}
    </div>
  );
}

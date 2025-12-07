import { useParams, useNavigate, Link } from "react-router-dom";
import ServiceForm from "../components/ServiceForm";
import { useService, useUpdateService } from "../hooks/useServices";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: service, isLoading, error } = useService(id);
  const updateService = useUpdateService();

  const handleSubmit = (payload) => {
    updateService.mutate(
      { id, data: payload },
      {
        onSuccess: () => navigate("/admin"),
      },
    );
  };

  if (isLoading) return <p className="text-center py-10">Cargando servicio...</p>;

  if (error || !service) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-600 mb-4">
          No se pudo cargar la información del servicio.
        </p>
        <Link to="/admin" className="text-emerald-600 hover:underline">
          ← Volver al panel
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <ServiceForm
        title="Editar servicio"
        submitLabel="Guardar cambios"
        initialValues={service}
        onSubmit={handleSubmit}
        isSubmitting={updateService.isPending}
        serverError={
          updateService.error?.response?.data?.message ||
          updateService.error?.message ||
          ""
        }
      />
    </div>
  );
}

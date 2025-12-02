import { useNavigate } from "react-router-dom";
import ServiceForm from "../components/ServiceForm";
import { useCreateService } from "../hooks/useServices";

export default function CreateService() {
  const navigate = useNavigate();
  const createService = useCreateService();

  const handleSubmit = (payload) => {
    createService.mutate(payload, {
      onSuccess: () => navigate("/admin"),
    });
  };

  return (
    <div className="flex justify-center mt-10">
      <ServiceForm
        title="Crear servicio"
        submitLabel="Crear servicio"
        onSubmit={handleSubmit}
        isSubmitting={createService.isPending}
        serverError={
          createService.error?.response?.data?.message ||
          createService.error?.message ||
          ""
        }
      />
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts, useDeletePost } from "../hooks/usePosts";
import { useServices, useDeleteService } from "../hooks/useServices";
import { useServiceHires } from "../hooks/useServiceHires";

export default function Dashboard() {
  const { role } = useAuth();
  const { data: posts, isLoading: isLoadingPosts } = usePosts();
  const { data: services, isLoading: isLoadingServices } = useServices();
  const {
    data: hires,
    isLoading: isLoadingHires,
    error: hiresError,
  } = useServiceHires();
  const deletePost = useDeletePost();
  const deleteService = useDeleteService();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">Panel Admin</h2>

      <div className="flex gap-4 mb-6">
        {role === "admin" && (
          <Link
            to="/admin/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ➕ Crear nuevo Post
          </Link>
        )}

        {role === "admin" && (
          <Link
            to="/admin/services/create"
            className="bg-emerald-600 text-white px-4 py-2 rounded"
          >
            ➕ Crear servicio
          </Link>
        )}
      </div>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Publicaciones</h3>
        {isLoadingPosts ? (
          <p className="text-center py-6 text-gray-500">Cargando publicaciones...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="font-semibold text-gray-600">
                <th className="text-left p-2">Título</th>
                <th className="text-center p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts && Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="border-b">
                    <td className="p-2">{post.titulo}</td>
                    <td className="p-2 flex justify-evenly gap-4">
                      {role === "admin" && (
                        <>
                          <Link to={`/admin/edit/${post.id}`} className="text-blue-600">
                            Editar
                          </Link>
                          <button
                            className="text-red-600"
                            onClick={() => {
                              if (confirm("¿Estás seguro de eliminar este post?")) {
                                deletePost.mutate(post.id);
                              }
                            }}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-4 text-center text-gray-500">
                    No hay publicaciones disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Servicios</h3>
        {isLoadingServices ? (
          <p className="text-center py-6 text-gray-500">Cargando servicios...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="font-semibold text-gray-600">
                <th className="text-left p-2">Servicio</th>
                <th className="text-left p-2 hidden md:table-cell">Precio</th>
                <th className="text-center p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services && Array.isArray(services) && services.length > 0 ? (
                services.map((service) => {
                  const title = service.title ?? service.titulo ?? service.nombre;
                  const description = service.description ?? service.descripcion ?? "";
                  const displayPrice = service.price ?? service.precio ?? "";
                  return (
                    <tr key={service.id} className="border-b">
                      <td className="p-2">
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-gray-500">
                          {description}
                        </p>
                      </td>
                      <td className="p-2 hidden md:table-cell">
                        {displayPrice !== "" ? `$${displayPrice}` : "—"}
                      </td>
                      <td className="p-2 flex justify-evenly gap-4">
                        {role === "admin" && (
                          <>
                            <Link to={`/admin/services/edit/${service.id}`} className="text-blue-600">
                              Editar
                            </Link>
                            <button
                              className="text-red-600"
                              onClick={() => {
                                if (confirm("¿Eliminar este servicio?")) {
                                  deleteService.mutate(service.id);
                                }
                              }}
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No hay servicios configurados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Contrataciones de servicios</h3>
        {isLoadingHires && (
          <p className="text-center py-6 text-gray-500">Cargando contrataciones...</p>
        )}

        {!isLoadingHires && hiresError && (
          <p className="text-center py-6 text-red-600">
            No pudimos cargar las contrataciones. {hiresError.response?.data?.message || hiresError.message}
          </p>
        )}

        {!isLoadingHires && !hiresError && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem]">
              <thead>
                <tr className="font-semibold text-gray-600">
                  <th className="text-left p-2">Servicio</th>
                  <th className="text-left p-2 hidden sm:table-cell">Usuario</th>
                  <th className="text-left p-2 hidden md:table-cell">Email</th>
                  <th className="text-left p-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const hiresList = Array.isArray(hires?.data) ? hires.data : hires;
                  if (Array.isArray(hiresList) && hiresList.length > 0) {
                    return hiresList.map((hire) => {
                      const serviceTitle = hire.service_title ?? hire.service?.title ?? hire.service?.nombre ?? "Servicio";
                      const userName = hire.user_name ?? hire.user?.name ?? "Usuario";
                      const userEmail = hire.user_email ?? hire.user?.email ?? "Sin email";
                      const hiredDate = hire.hired_at ?? hire.created_at ?? hire.fecha ?? "";
                      return (
                        <tr key={`${hire.id ?? hire.hire_id ?? `${serviceTitle}-${userEmail}`}`} className="border-b">
                          <td className="p-2">{serviceTitle}</td>
                          <td className="p-2 hidden sm:table-cell">{userName}</td>
                          <td className="p-2 hidden md:table-cell">{userEmail}</td>
                          <td className="p-2">
                            {hiredDate
                              ? new Date(hiredDate).toLocaleString("es-AR", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "—"}
                          </td>
                        </tr>
                      );
                    });
                  }

                  return (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-gray-500">
                        No hay contrataciones registradas.
                      </td>
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useProfile, useUpdateProfile, useUpdateProfilePassword } from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { updateUser } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const updatePassword = useUpdateProfilePassword();

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    username: "",
    avatar: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [feedback, setFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name ?? "",
        email: profile.email ?? "",
        username: profile.username ?? "",
        avatar:
          profile.profile_photo_url ??
          "",
      });
    }
  }, [profile]);

  if (isLoading) {
    return <p className="text-center py-10">Cargando perfil...</p>;
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setFeedback("");
    setProfileForm((prev) => ({
      ...prev,
    }));
    updateProfile.mutate(
      {
        name: profileForm.name,
        email: profileForm.email,
        username: profileForm.username || null,
        profile_photo_url: profileForm.avatar,
      },
      {
        onSuccess: (data) => {
          setFeedback("Perfil actualizado correctamente.");
          updateUser?.(data);
          setProfileForm({
            name: data.name ?? "",
            email: data.email ?? "",
            username: data.username ?? "",
            avatar: data.profile_photo_url ?? "",
          });
        },
        onError: (error) => {
          setFeedback(
            error.response?.data?.message ||
              "No se pudo actualizar el perfil. Intenta nuevamente.",
          );
        },
      },
    );
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordFeedback("");
    if (
      passwordForm.password.trim() === "" ||
      passwordForm.password !== passwordForm.password_confirmation
    ) {
      setPasswordFeedback("Las contraseñas deben coincidir.");
      return;
    }

    updatePassword.mutate(passwordForm, {
      onSuccess: () => {
        setPasswordFeedback("Contraseña actualizada correctamente.");
        setPasswordForm({
          current_password: "",
          password: "",
          password_confirmation: "",
        });
      },
      onError: (error) => {
        setPasswordFeedback(
          error.response?.data?.message ||
            "No se pudo actualizar la contraseña.",
        );
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Mi perfil</h1>

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Información personal</h2>

        {feedback && (
          <p className={`mb-4 ${updateProfile.isError ? "text-red-600" : "text-emerald-600"}`}>
            {feedback}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleProfileSubmit}>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Nombre</span>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
              className="border rounded-lg px-3 py-2"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Email</span>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
              className="border rounded-lg px-3 py-2"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Usuario</span>
            <input
              type="text"
              value={profileForm.username}
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, username: e.target.value }))
              }
              className="border rounded-lg px-3 py-2"
              placeholder="usuario"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Imagen de perfil (URL)</span>
            <input
              type="url"
              value={profileForm.avatar}
              onChange={(e) => setProfileForm((prev) => ({ ...prev, avatar: e.target.value }))}
              className="border rounded-lg px-3 py-2"
              placeholder="https://example.com/avatar.jpg"
            />
          </label>

          {profileForm.avatar && (
            <div className="flex justify-center">
              <img
                src={profileForm.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/img/posts/default.png";
                }}
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg disabled:opacity-60"
            disabled={updateProfile.isPending}
          >
            {updateProfile.isPending ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Actualizar contraseña</h2>

        {passwordFeedback && (
          <p
            className={`mb-4 ${updatePassword.isError ? "text-red-600" : "text-emerald-600"}`}
          >
            {passwordFeedback}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Contraseña actual</span>
            <input
              type="password"
              value={passwordForm.current_password}
              onChange={(e) =>
                setPasswordForm((prev) => ({ ...prev, current_password: e.target.value }))
              }
              className="border rounded-lg px-3 py-2"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Nueva contraseña</span>
            <input
              type="password"
              value={passwordForm.password}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, password: e.target.value }))}
              className="border rounded-lg px-3 py-2"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Confirmar contraseña</span>
            <input
              type="password"
              value={passwordForm.password_confirmation}
              onChange={(e) =>
                setPasswordForm((prev) => ({ ...prev, password_confirmation: e.target.value }))
              }
              className="border rounded-lg px-3 py-2"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg disabled:opacity-60"
            disabled={updatePassword.isPending}
          >
            {updatePassword.isPending ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}

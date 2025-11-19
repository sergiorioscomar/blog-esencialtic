import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Container from "./components/Container";
import PostsList from "./components/PostsList";
import PostDetail from "./components/PostDetail";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import UsersPanel from "./pages/UsersPanel";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminRouteSuper from "./routes/AdminRouteSuper";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>

          <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main>
              <Routes>

                {/* HOME */}
                <Route
                  path="/"
                  element={
                    <>
                      <Container className="text-center py-10">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
                        Proyectos
                      </h1>
                        <p className="text-gray-600 mt-2">
                          Algunos proyectos en los que participamos y trabajamos junto a nuestros clientes.
                        </p>
                      </Container>

                      <Container>
                        <PostsList />
                      </Container>
                    </>
                  }
                />

                {/* Detalle del post */}
                <Route path="/post/:id" element={<PostDetail />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboard admin */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminRoute>
                        <Dashboard />
                      </AdminRoute>
                    </PrivateRoute>
                  }
                />

                {/* Crear post */}
                <Route
                  path="/admin/create"
                  element={
                    <PrivateRoute>
                      <AdminRoute>
                        <CreatePost />
                      </AdminRoute>
                    </PrivateRoute>
                  }
                />

                {/* Editar post */}
                <Route
                  path="/admin/edit/:id"
                  element={
                    <PrivateRoute>
                      <AdminRoute>
                        <EditPost />
                      </AdminRoute>
                    </PrivateRoute>
                  }
                />

                {/* Gestión de usuarios — SOLO SUPER ADMIN */}
                <Route
                  path="/admin/users"
                  element={
                    <PrivateRoute>
                      <AdminRouteSuper>
                        <UsersPanel />
                      </AdminRouteSuper>
                    </PrivateRoute>
                  }
                />

              </Routes>
            </main>

          </div>

        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

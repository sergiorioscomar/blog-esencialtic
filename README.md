# Blog Esencialtic · Portfolio + Panel de Gestión

Aplicación React + Vite que reúne un portfolio público, un panel privado para gestionar proyectos/servicios y una integración directa con la API de esencialtic.com.ar para mantener todo sincronizado.

---

## 🚀 Puesta en marcha

| Acción | Comando |
| --- | --- |
| Instalar dependencias | `npm install` |
| Servidor de desarrollo | `npm run dev` |
| Build de producción | `npm run build` |

---

## 🧱 Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend / API:** Laravel + Sanctum (`https://proyectos.esencialtic.com.ar/api`)
- **Roles disponibles:**
  1. `superusers` (id = 2) · gestión de usuarios
  2. `admin` · servicios, proyectos, cotizaciones
  3. `usuarios registrados` · ven proyectos/servicios y piden cotizaciones
  4. `visitantes` · solo visualización pública

Superadmin, admin y usuarios registrados pueden administrar su perfil dentro de la app.

---

## 📚 Historial de entregas

### 1️⃣ 1ra Entrega · v1.0 — Landing de posts recientes
- Versión inicial enfocada en mostrar publicaciones del blog estilo portfolio.
- **Screenshot:**  
  ![Vista previa v1.0](./src/assets/preview.png)

### 2️⃣ 2da Entrega · v2.0 (20-nov-2025) — Panel de proyectos
- Se agregó un panel renovado para gestionar proyectos y exponerlos en la web principal.
- Incluye primeras vistas del gestor de proyectos y usuarios.
- **Panel principal:**  
  ![Panel v2.0](./src/assets/proyecto-react.png)
- **Gestor de Proyectos:**  
  ![Gestor de proyectos](./src/assets/proyecto-react2-gestorproyects.png)
- **Gestor de Usuarios:**  
  ![Gestor de usuarios](./src/assets/proyecto-react3-gestorusers.png)
- **API de proyectos (Laravel + Sanctum):**  
  ![API proyectos](./src/assets/api-proyectos-esencialtic.png)

### 3️⃣ 3ra Entrega · v3.0 (07-dic-2025) — Panel completo + perfiles
- Panel mejorado que integra servicios, proyectos y envío de cotizaciones por email.
- Portfolio público actualizado y se documentaron todos los flujos principales.
- **Portfolio público:**  
  ![Portfolio v3.0](./src/assets/porfolio.png)
- **Login:**  
  ![Login](./src/assets/0-login.png)
- **Dashboard general (proyectos/servicios/cotizaciones):**  
  ![Dashboard](./src/assets/3-admin.png)
- **Servicios:**  
  ![Servicios](./src/assets/2-servicios.png)
- **Gestor de Usuarios:**  
  ![Usuarios](./src/assets/4-usuarios.png)
- **Perfil del usuario:**  
  ![Perfil](./src/assets/1-perfil.png)
- **API Backend / permisos:**  
  ![Backend](./src/assets/backend.png)

---

## 🎯 Objetivo

Centralizar la gestión de proyectos y servicios de esencialtic.com.ar desde mi portfolio, permitiendo publicar rápidamente en la web principal y vincular cada servicio con un flujo de cotización en un clic.

**Vista general del sitio de proyectos:**  
![Sitio esencialtic](./src/assets/proyectos_esencialtic.png)

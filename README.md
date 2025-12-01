# E-commerce Mueblería Hermanos Jota - Sprint 7 y 8

Integrantes del Equipo:

* Juan Ignacio Zamit 
* Felipe Martinez 


Este proyecto es la etapa final de nuestra aplicación, transformando el sistema de gestión de productos (CRUD) en una plataforma de e-commerce completa y funcional, lista para un entorno de producción. El objetivo de esta entrega fue profesionalizar la arquitectura MERN (MongoDB, Express, React, Node.js) implementando un ciclo de vida de usuario completo y desplegando la solución en la nube para su acceso público.

Las nuevas implementaciones de la aplicación fueron:

Seguridad Avanzada: Autenticación de usuarios mediante JWT y hashing de contraseñas con bcrypt.

Gestión de Estado Global: Implementación de React Context API para manejar la sesión del usuario y el estado del carrito de compras de forma eficiente en toda la aplicación.

Control de Acceso: Sistema de roles donde solo los usuarios con permisos de Administrador pueden acceder a las interfaces de creación, edición y eliminación de productos.

Experiencia de Usuario Dinámica: Interfaz que reacciona al estado de autenticación (Login/Logout) y valida el stock en tiempo real.

Despliegue en la Nube: El proyecto ha dejado de ser local, el frontend se encuentra alojado en Vercel y el backend en Render, conectados a una base de datos MongoDB Atlas.

Enlaces de Despliegue:

* **Backend (API):** [https://hermanos-jota-sprint-7y8.onrender.com](https://hermanos-jota-sprint-7y8.onrender.com)
* **Frontend (Web):** [https://hermanos-jota-sprint-7y8-yymb.vercel.app/](https://hermanos-jota-sprint-7y8-yymb.vercel.app/)

El link de vercel posee la pagina de la muebleria funcionando 


El proyecto se construyó con un enfoque Full Stack, utilizando las siguientes tecnologías:


Frontend:

* React (Vite)
* Context API (Gestión de estado global para Auth y Carrito)
* React Router v6 (Ruteo y Rutas Protegidas)

Backend:
* Node.js & Express
* MongoDB Atlas (Base de datos NoSQL)
* Mongoose
* JWT (JSON Web Tokens) (Autenticación segura)
* Bcrypt (Hashing de contraseñas)


Configuración de la aplicación en caso de Instalación Local

Si deseas correr este proyecto en tu máquina local, sigue estos pasos:

1. Configuración del Backend

Navega a la carpeta backend e instala las dependencias:

cd backend
npm install

Crea un archivo .env dentro de la carpeta backend con las siguientes variables:

Fragmento de código

PORT=5000
MONGO_URI="mongodb+srv://[USUARIO]:[CONTRASEÑA]@[CLUSTER].mongodb.net/[NOMBRE_BD]"
JWT_SECRET=frase_super_secreta_para_firmar_tokens_123451212

Inicia el servidor:

node server.js


2. Configuración del Frontend

Se debe abrir una nueva terminal y navegar a la carpeta frontend e instalar las dependencias:

cd frontend
npm install


Crea un archivo .env dentro de la carpeta frontend para conectar con tu backend local:

Fragmento de código

VITE_API_URL=http://localhost:5000/api


Inicia la aplicación React (Vite):

npm run dev 


para poder entrar a la cuenta en modo administrador, aca dejamos e-mail y contraseña:

E-mail: cuentaadmin02@gmail.com
Contraseña: administracionHermanosjOta1221







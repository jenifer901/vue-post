# TechPoC - Posts & Comments App

## Descripción

Aplicación desarrollada con Vue 3, Vite y Pinia. Permite la gestión de posts y comentarios con autenticación básica, internacionalización y testing unitario.

---

## Tecnologías

- Vue 3 (Composition API)
- Vite
- Pinia
- Vue Router
- Vue I18n
- TailwindCSS + DaisyUI
- Axios
- TypeScript
- Vitest
- Vue Test Utils

---

## Funcionalidades

### Autenticación

- Login de usuario
- Persistencia de sesión
- Logout con confirmación

### Posts

- Listado de posts
- Búsqueda por título y contenido
- Búsqueda por Autor y tags 
- Vista detalle de post
- Editar post
- Eliminar post

### Comentarios

- Listado de comentarios por post
- Añadir comentario
- Editar comentario
- Eliminar comentario
- Control de permisos (solo el autor puede modificar)

### Internacionalización

- Cambio de idioma (ES / EN)

---

## Estructura del proyecto
src/
├── components/
├── composables/
├── i18n
├── models/
├── shared/
├── stores/
├── services/
├── utils/
├── views/
└── router/

---

## API

Endpoints utilizados:

- GET /posts
- GET /comments
- POST /comments
- PUT /comments/:id
- DELETE /comments/:id

---

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/jenifer901/vue-post.git

# Entrar en el proyecto
cd vue-post

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Testing
npm run test
npm run test:watch
npm run test:coverage

´´´





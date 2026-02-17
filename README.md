# DATA INSIGHT

Plataforma de análisis de datos con arquitectura full-stack separada.

## 🏗️ Estructura del Proyecto

```
data-insight/
├── laravel/          # Backend API (Laravel 12)
├── angular/          # Frontend Web App (Angular 20)
├── DOCUMENTACION.md  # Documentación completa del proyecto
└── README.md         # Este archivo
```

## 🚀 Inicio Rápido

### Requisitos Previos

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm o yarn
- WSL (si estás en Windows)

### Instalación

#### Backend (Laravel)

```bash
cd laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

El backend estará disponible en `http://localhost:8000`

#### Frontend (Angular)

```bash
cd angular
npm install
ng serve
```

El frontend estará disponible en `http://localhost:4200`

## 📚 Documentación

Para información detallada sobre arquitectura, componentes, flujos y próximos pasos, consulta [DOCUMENTACION.md](./DOCUMENTACION.md)

## 🎨 Diseño

- **Tema:** Dark mode con paleta graphite gray
- **Estilo:** Wireframes conceptuales monolíticos
- **Responsive:** Sí, con CSS Grid y Flexbox

## 📄 Páginas Disponibles

- **Home** (`/home`) - Página principal
- **Nosotros** (`/nosotros`) - Información corporativa
- **Catálogo** (`/catalogo`) - Catálogo de productos/servicios
- **Login** (`/login`) - Acceso a la aplicación

## 🔧 Estado Actual

✅ Estructura base configurada  
✅ Componentes y páginas wireframe creados  
✅ Sistema de routing implementado  
✅ Tema dark aplicado  
⏳ Conexión Frontend-Backend pendiente  
⏳ Funcionalidad de componentes pendiente  

## 📝 Notas

Este proyecto está en fase inicial con wireframes conceptuales. Los componentes actuales son representaciones visuales de la estructura propuesta y serán desarrollados en iteraciones futuras.

---

**Versión:** 0.1.0  
**Última actualización:** Noviembre 2024

set
----------
---------
---------
----------
---------

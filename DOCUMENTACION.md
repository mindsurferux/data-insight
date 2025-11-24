# DATA INSIGHT - Documentación del Proyecto

## Información General

**Nombre del Proyecto:** Data Insight  
**Versión:** 0.1.0  
**Fecha de Inicio:** Noviembre 2024  
**Entorno:** WSL (Windows Subsystem for Linux)

---

## Arquitectura del Proyecto

### Estructura de Directorios

```
data-insight/
├── laravel/          # Backend API (Laravel 12)
└── angular/          # Frontend Web App (Angular 20)
```

### Stack Tecnológico

#### Backend - Laravel
- **Framework:** Laravel 12.x
- **PHP:** ^8.2
- **Base de Datos:** SQLite (desarrollo)
- **Dependencias principales:**
  - laravel/framework: ^12.0
  - laravel/tinker: ^2.10.1

#### Frontend - Angular
- **Framework:** Angular 20.1.0
- **TypeScript:** ~5.8.2
- **Routing:** Angular Router
- **Estilos:** CSS puro con variables CSS
- **Arquitectura:** Standalone Components

---

## Frontend - Angular

### Estructura de Componentes

```
src/app/
├── components/
│   ├── navbar/       # Barra de navegación principal
│   └── footer/       # Pie de página
├── pages/
│   ├── home/         # Página de inicio
│   ├── nosotros/     # Página sobre nosotros
│   ├── catalogo/     # Página de catálogo
│   └── login/        # Página de login
├── app.ts            # Componente raíz
├── app.routes.ts     # Configuración de rutas
└── app.config.ts     # Configuración de la aplicación
```

### Rutas Configuradas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Redirect → `/home` | Redirección a home |
| `/home` | HomeComponent | Página principal |
| `/nosotros` | NosotrosComponent | Información corporativa |
| `/catalogo` | CatalogoComponent | Catálogo de productos/servicios |
| `/login` | LoginComponent | Acceso a la aplicación |
| `/**` | Redirect → `/home` | Rutas no encontradas |

### Componentes Principales

#### Navbar
- **Ubicación:** `components/navbar/`
- **Funcionalidad:**
  - Logo con enlace a home
  - Menú de navegación (Home, Nosotros, Catálogo)
  - Botón de Login destacado
  - Sticky positioning
  - Indicador de ruta activa

#### Footer
- **Ubicación:** `components/footer/`
- **Funcionalidad:**
  - Información corporativa
  - Enlaces de navegación
  - Información de contacto
  - Copyright

### Páginas Corporativas (Wireframes)

#### Home
- **Hero Section:** Banner principal de bienvenida
- **Features Section:** 3 características destacadas en grid
- **CTA Section:** Llamada a la acción

#### Nosotros
- **Header:** Encabezado de la sección
- **Misión y Visión:** Grid de 2 columnas
- **Equipo:** Sección para presentación del equipo

#### Catálogo
- **Header:** Título del catálogo
- **Filtros:** Barra de búsqueda y filtros
- **Items Grid:** Grid responsive de 6 items (ejemplo)

#### Login
- **Formulario:** Wireframe de formulario de acceso
  - Campo Email
  - Campo Password
  - Botón Login
- **Layout:** Centrado vertical y horizontal

---

## Sistema de Diseño

### Tema Dark - Graphite Gray

#### Paleta de Colores

```css
--bg-primary: #1a1a1a      /* Fondo principal */
--bg-secondary: #252525    /* Fondo secundario */
--bg-tertiary: #303030     /* Fondo terciario */

--text-primary: #e0e0e0    /* Texto principal */
--text-secondary: #a0a0e0  /* Texto secundario */
--text-muted: #707070      /* Texto atenuado */

--border-color: #404040    /* Bordes */
--accent-color: #606060    /* Color de acento */
```

#### Sombras

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3)
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4)
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5)
```

### Filosofía de Diseño

- **Estilo:** Maqueta monolítica conceptual
- **Wireframes:** Cajas con bordes discontinuos (dashed)
- **Colores:** Escala de grises con claridad
- **Tipografía:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Espaciado:** Consistente con rem units
- **Responsive:** Grid layouts con auto-fit/auto-fill

---

## Backend - Laravel

### Estructura Básica

Laravel está instalado con la configuración estándar:
- Migraciones base ejecutadas
- SQLite como base de datos
- Estructura MVC lista para desarrollo

### Estado Actual

El backend está en estado base, listo para:
- Crear modelos y migraciones
- Desarrollar API REST
- Implementar autenticación
- Conectar con el frontend Angular

---

## Flujos Propuestos

### Flujo de Navegación Pública

```
Landing (Home)
    ├─→ Nosotros
    ├─→ Catálogo
    └─→ Login → [Aplicación Protegida - Futuro]
```

### Flujo de Autenticación (Propuesto)

```
1. Usuario accede a /login
2. Ingresa credenciales
3. Backend valida y genera token
4. Frontend almacena token
5. Redirección a dashboard/app principal
```

---

## Próximos Pasos

### Frontend
- [ ] Desarrollar componentes funcionales (reemplazar wireframes)
- [ ] Implementar formulario de login funcional
- [ ] Crear servicios para comunicación con API
- [ ] Implementar guards de autenticación
- [ ] Desarrollar dashboard/app principal post-login

### Backend
- [ ] Crear API REST endpoints
- [ ] Implementar sistema de autenticación (Laravel Sanctum/Passport)
- [ ] Crear modelos y migraciones según necesidades
- [ ] Configurar CORS para comunicación con Angular
- [ ] Desarrollar lógica de negocio

### Integración
- [ ] Conectar Angular con Laravel API
- [ ] Implementar interceptors HTTP
- [ ] Configurar manejo de errores
- [ ] Implementar sistema de tokens
- [ ] Testing de integración

---

## Comandos Útiles

### Angular
```bash
cd angular
npm install              # Instalar dependencias
ng serve                 # Servidor de desarrollo (http://localhost:4200)
ng build                 # Build de producción
ng generate component    # Generar nuevo componente
```

### Laravel
```bash
cd laravel
composer install         # Instalar dependencias
php artisan serve        # Servidor de desarrollo (http://localhost:8000)
php artisan migrate      # Ejecutar migraciones
php artisan make:model   # Crear modelo
php artisan make:controller  # Crear controlador
```

---

## Notas de Desarrollo

### Convenciones
- **Componentes Angular:** Standalone components (sin módulos)
- **Estilos:** CSS puro con variables, sin preprocesadores
- **Naming:** kebab-case para archivos, PascalCase para clases
- **Commits:** Mensajes descriptivos en español

### Consideraciones
- El proyecto usa Angular 20 con la nueva arquitectura standalone
- Laravel 12 con PHP 8.2+
- Desarrollo en WSL, considerar paths y permisos
- Los wireframes son conceptuales, no son componentes finales

---

## Sistema de Autenticación y Dashboard

### Usuarios Mock

El sistema actualmente utiliza autenticación mock para desarrollo:

| Usuario | Rol | Permisos |
|---------|-----|----------|
| **Luis** | Administrador | Proyectos ✅ CMS ✅ Ciberseguridad ✅ |
| **Ana** | Editor | Proyectos ✅ CMS ✅ Ciberseguridad ❌ |

### Flujo de Login

1. Usuario accede a `/login`
2. Selecciona su perfil (Luis o Ana)
3. Sistema muestra alert de desarrollo
4. AuthService crea sesión mock
5. Redirección automática a `/dashboard`

### Dashboard

**Estructura:** Sidebar fijo + Área de contenido

#### Sidebar
- **Header:** Logo y título "DATA INSIGHT"
- **Usuario:** Avatar, nombre y email del usuario actual
- **Navegación:** Tabs dinámicos según permisos
  - Proyectos (icon: project-diagram)
  - CMS (icon: edit)
  - Ciberseguridad (icon: shield-alt)
- **Footer:** Botones "Ir al Sitio" y "Cerrar Sesión"

#### Módulos (Tabs)

Todos los módulos están actualmente en estado "En Construcción":

**Proyectos**
- Vista centrada con icono y mensaje
- Fondo: `var(--bg-tertiary)`

**CMS**
- Vista centrada con icono y mensaje
- Fondo: `var(--bg-tertiary)`

**Ciberseguridad**
- Vista centrada con icono y mensaje
- Fondo: `var(--bg-tertiary)`
- Solo visible para usuarios con permiso

### AuthService

**Ubicación:** `services/auth.service.ts`

**Métodos:**
- `login(username)`: Autenticación mock
- `logout()`: Cierra sesión y limpia localStorage
- `isAuthenticated()`: Verifica si hay sesión activa
- `hasPermission(module)`: Verifica permisos por módulo
- `currentUser`: Signal con datos del usuario actual

### Rutas del Dashboard

```
/dashboard
├── /proyectos          # Módulo Proyectos
├── /cms                # Módulo CMS
└── /ciberseguridad     # Módulo Ciberseguridad
```

**Redirect por defecto:** `/dashboard` → `/dashboard/proyectos`

---

## Historial de Cambios

### v0.2.0 - Noviembre 2024
- ✅ Sistema de autenticación mock implementado
- ✅ Login con dos usuarios (Luis y Ana)
- ✅ Dashboard con sidebar tipo offcanvas
- ✅ Navegación por tabs (Proyectos, CMS, Ciberseguridad)
- ✅ Sistema de permisos por usuario
- ✅ Vistas "En Construcción" para módulos
- ✅ AuthService con signals de Angular
- ✅ Routing del dashboard configurado

### v0.1.0 - Noviembre 2024
- ✅ Estructura base del proyecto creada
- ✅ Laravel 12 instalado y configurado
- ✅ Angular 20 instalado y configurado
- ✅ Componentes navbar y footer creados
- ✅ Páginas corporativas con wireframes (Home, Nosotros, Catálogo, Login)
- ✅ Sistema de routing configurado
- ✅ Tema dark graphite gray implementado
- ✅ Documentación inicial creada

---

**Última actualización:** Noviembre 2024  
**Mantenido por:** Equipo Data Insight

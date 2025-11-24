# Data Insight - Angular Frontend - Despliegue en Netlify

## 🚀 Configuración para Netlify

### Archivos de Configuración

- **`netlify.toml`**: Configuración principal de Netlify
- **`package.json`**: Scripts de build optimizados
- **`angular.json`**: Configuración de producción de Angular

### 📋 Pasos para Despliegue

#### 1. Conectar Repositorio a Netlify

1. Ir a [Netlify](https://app.netlify.com)
2. Click en "Add new site" → "Import an existing project"
3. Conectar GitHub/GitLab/Bitbucket
4. Seleccionar el repositorio `data-insight/angular`

#### 2. Configurar Build Settings

Netlify leerá automáticamente la configuración desde `netlify.toml`:

```
Build command: ng build --configuration production
Publish directory: dist/angular
Node version: 18
```

#### 3. Variables de Entorno (Opcional)

Si necesitas variables de entorno:

```
NODE_VERSION=18
NPM_VERSION=9
```

### 🔧 Scripts Útiles

```bash
# Build local para testing
npm run build:prod

# Build específico para Netlify
npm run build:netlify

# Preview en modo producción
npm run preview
```

### 📁 Estructura de Archivos

```
angular/
├── netlify.toml          # Configuración Netlify
├── package.json          # Scripts de build
├── angular.json          # Configuración Angular
├── src/
│   ├── index.html        # Entry point
│   ├── styles.css        # Estilos globales
│   └── ...               # Componentes
└── dist/
    └── angular/          # Output de producción
        ├── index.html
        ├── main.[hash].js
        ├── styles.[hash].css
        └── ...
```

### 🛡️ Configuración de Seguridad

El `netlify.toml` incluye:

- **Headers de seguridad**: XSS Protection, Content Type Options
- **Redirecciones SPA**: Todas las rutas a `/index.html`
- **Cache control**: Optimizado para archivos estáticos

### 🔄 Redirecciones SPA

Angular es una Single Page Application, por lo que todas las rutas deben redirigir a `index.html`:

```
/dashboard/proyectos → /index.html
/dashboard/cms → /index.html
/login → /index.html
```

### 📊 Optimizaciones de Producción

La configuración incluye:

- **Bundle splitting**: Módulos cargados bajo demanda
- **Tree shaking**: Código no utilizado eliminado
- **Minificación**: JS/CSS optimizados
- **Hashing**: Cache busting automático
- **Budget limits**: Control de tamaño de bundles

### 🌐 URLs del Proyecto

**Rutas principales:**
- `/` → Home
- `/login` → Login (Luis/Ana)
- `/dashboard` → Dashboard (redirección según rol)
- `/dashboard/proyectos` → Módulo Proyectos
- `/dashboard/cms` → Módulo CMS
- `/dashboard/ciberseguridad` → Módulo Ciberseguridad

**Navegación profunda:**
- `/dashboard/proyectos/reportes` → Reportes generales
- `/dashboard/proyectos/web-corporativa/tareas` → Vista de tareas
- `/dashboard/proyectos/app-mobile/gantt` → Vista Gantt

### 🎨 Características Implementadas

- ✅ **Sistema de autenticación mock** (Luis admin, Ana stakeholder)
- ✅ **Dashboard con navegación multinivel**
- ✅ **3 niveles de navegación colapsable**
- ✅ **Permisos dinámicos por rol**
- ✅ **Dark theme graphite**
- ✅ **Microinteracciones y animaciones**
- ✅ **Responsive design**
- ✅ **SPA routing**

### 🚀 Despliegue Automático

Netlify automáticamente:

1. Detecta cambios en el repositorio
2. Ejecuta `ng build --configuration production`
3. Despliega los archivos de `dist/angular/`
4. Aplica la configuración de `netlify.toml`

### 🔍 Testing Local

Antes de desplegar:

```bash
# 1. Instalar dependencias
npm install

# 2. Build de producción
npm run build:prod

# 3. Servir build localmente
npx serve dist/angular

# 4. Probar en http://localhost:3000
```

### 📱 PWA Ready (Opcional)

Para habilitar PWA en el futuro:

1. `ng add @angular/pwa`
2. Actualizar `manifest.webmanifest`
3. Configurar service worker

### 🐛 Troubleshooting

**Build falla:**
- Verificar Node.js 18+
- Limpiar cache: `rm -rf node_modules && npm install`

**Rutas no funcionan:**
- Verificar redirecciones en `netlify.toml`
- Confirmar `base href="/"` en `index.html`

**Assets no cargan:**
- Revisar paths relativos
- Verificar configuración de assets en `angular.json`

---

**Estado:** ✅ Listo para despliegue en Netlify
**Versión:** Angular 20 + TypeScript 5
**Build Size:** ~1.5MB (gzipped: ~400KB)

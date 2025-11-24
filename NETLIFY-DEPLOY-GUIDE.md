# Guía de Despliegue a Netlify - Data Insight

## 🎯 Problema Identificado

**Estructura del Proyecto:**
```
/data-insight/
├── angular/          ← Frontend Angular
│   ├── src/
│   ├── package.json
│   └── netlify.toml  ❌ (no se lee aquí)
├── laravel/          ← Backend Laravel
└── netlify.toml      ✅ (debe estar aquí)
```

**Solución:**
El `netlify.toml` debe estar en la **raíz del repositorio** (`/data-insight/`), no dentro de `/angular/`.

---

## ✅ Configuración Correcta

### **Archivo: `/data-insight/netlify.toml`**

```toml
[build]
  # Base directory: el proyecto Angular está en /angular
  base = "angular"
  
  # Directorio de publicación (relativo a base)
  publish = "dist/angular/browser"
  
  # Comando de build
  command = "npm run build:prod"

[build.environment]
  NODE_VERSION = "20"
  NPM_VERSION = "10"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Parámetros Clave:**
- ✅ `base = "angular"` → Netlify ejecuta comandos desde `/angular`
- ✅ `publish = "dist/angular/browser"` → Ruta relativa a `base`
- ✅ `command = "npm run build:prod"` → Script definido en `package.json`

---

## 📋 Checklist de Despliegue

### **1. Verificar Archivos en Repositorio**

```bash
# Desde /data-insight/
ls -la netlify.toml          # ✅ Debe existir en raíz
ls -la angular/package.json  # ✅ Debe existir
ls -la angular/src/          # ✅ Debe existir
```

### **2. Verificar package.json**

```json
{
  "scripts": {
    "build:prod": "ng build --configuration production"
  }
}
```

### **3. Verificar Build Local**

```bash
cd angular
npm install
npm run build:prod
ls -la dist/angular/browser/  # Debe contener index.html, *.js, *.css
```

---

## 🚀 Pasos para Desplegar en Netlify

### **Opción 1: Desde Netlify Dashboard (Recomendado)**

1. **Login en Netlify:**
   - Ir a https://app.netlify.com/

2. **Conectar Repositorio:**
   - Click "Add new site" → "Import an existing project"
   - Seleccionar Git provider (GitHub, GitLab, etc.)
   - Autorizar acceso
   - Seleccionar repositorio `data-insight`

3. **Configurar Build Settings:**
   ```
   Base directory: angular
   Build command: npm run build:prod
   Publish directory: dist/angular/browser
   ```
   
   **IMPORTANTE:** Netlify debería leer estos valores automáticamente desde `netlify.toml`

4. **Deploy:**
   - Click "Deploy site"
   - Esperar a que termine el build
   - Verificar logs

---

### **Opción 2: Desde Netlify CLI**

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Desde la raíz del proyecto (/data-insight)
netlify init

# Seguir el wizard:
# - Create & configure a new site
# - Team: tu equipo
# - Site name: syzygydatainsight (o el que prefieras)
# - Base directory: angular
# - Build command: npm run build:prod
# - Publish directory: angular/dist/angular/browser

# Deploy manual
netlify deploy --prod
```

---

### **Opción 3: Deploy Manual (Testing)**

```bash
# Build local
cd angular
npm run build:prod

# Deploy solo los archivos compilados
cd ..
netlify deploy --prod --dir=angular/dist/angular/browser
```

---

## 🔍 Verificar Configuración en Netlify Dashboard

### **Site Settings → Build & deploy → Build settings**

Debe mostrar:
```
Base directory: angular
Build command: npm run build:prod
Publish directory: dist/angular/browser
```

### **Site Settings → Build & deploy → Environment**

Debe tener:
```
NODE_VERSION = 20
NPM_VERSION = 10
```

---

## 🐛 Troubleshooting

### **Error: "Build command failed"**

**Causa:** Netlify no encuentra `package.json`

**Solución:**
```toml
[build]
  base = "angular"  # ← Asegúrate de tener esto
```

---

### **Error: "Publish directory not found"**

**Causa:** La ruta de publicación es incorrecta

**Verificar:**
```bash
cd angular
npm run build:prod
ls -la dist/angular/browser/  # ¿Existe?
```

**Solución:**
```toml
[build]
  publish = "dist/angular/browser"  # Relativo a base
```

---

### **Error: "Module not found"**

**Causa:** Dependencias no instaladas

**Solución:**
Netlify ejecuta `npm install` automáticamente, pero verifica:
```json
{
  "dependencies": {
    "@angular/common": "^20.1.0",
    "@angular/compiler": "^20.1.0",
    "@angular/core": "^20.1.0",
    // ... todas las dependencias necesarias
  }
}
```

---

### **Error: "Routes not working (404)"**

**Causa:** Falta configuración de SPA

**Solución:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📊 Estructura de Archivos para Netlify

```
/data-insight/
├── netlify.toml              ✅ Configuración principal
├── angular/
│   ├── src/
│   ├── package.json          ✅ Dependencias y scripts
│   ├── angular.json          ✅ Configuración Angular
│   ├── tsconfig.json         ✅ TypeScript config
│   └── dist/                 ❌ (generado, no commitear)
│       └── angular/
│           └── browser/      ← Netlify publica esto
│               ├── index.html
│               ├── main-*.js
│               ├── polyfills-*.js
│               └── styles-*.css
└── laravel/                  ⚠️ (ignorado por Netlify)
```

---

## ✅ Checklist Final

Antes de hacer push/deploy:

- [ ] `netlify.toml` en raíz del repositorio
- [ ] `base = "angular"` configurado
- [ ] `npm run build:prod` funciona localmente
- [ ] `dist/angular/browser/` contiene archivos
- [ ] `index.html` tiene `<base href="/">`
- [ ] Todas las dependencias en `package.json`
- [ ] `.gitignore` excluye `/dist`

---

## 🎬 Comandos Rápidos

```bash
# Verificar estructura
cd /home/vandalit/CodigoWSL/data-insight
ls -la netlify.toml           # ✅ Debe existir

# Test build local
cd angular
npm install
npm run build:prod
ls -la dist/angular/browser/  # ✅ Debe tener archivos

# Deploy con Netlify CLI
cd ..
netlify deploy --prod
```

---

## 📝 Notas Importantes

1. **Base Directory:** Netlify ejecuta todos los comandos desde `angular/`
2. **Publish Directory:** Ruta relativa a `base`, no absoluta
3. **Node Version:** Angular 20 requiere Node 20+
4. **SPA Redirects:** Necesario para que Angular Router funcione
5. **Build Time:** Primera vez puede tardar 3-5 minutos

---

## 🔗 Enlaces Útiles

- **Netlify Docs:** https://docs.netlify.com/
- **Angular Deployment:** https://angular.dev/tools/cli/deployment
- **Netlify CLI:** https://docs.netlify.com/cli/get-started/

---

**Con esta configuración, el despliegue a Netlify debería funcionar correctamente.**

# Diagnóstico de Deploy a Netlify

## 🔍 Verificación de Configuración

### **1. Build Local Exitoso**
```bash
✅ ng build --configuration production
✅ Output: dist/angular/browser/
✅ Archivos generados:
   - index.html (1.26 KB)
   - main-3X6KVCOC.js (321 KB)
   - polyfills-5CFQRCPP.js (34.6 KB)
   - styles-BBERPBKW.css (825 bytes)
   - favicon.ico (15 KB)
```

### **2. Configuración netlify.toml**
```toml
[build]
  publish = "dist/angular/browser"  ✅ Correcto
  command = "npm run build:prod"    ✅ Correcto

[build.environment]
  NODE_VERSION = "20"               ✅ Correcto
  NPM_VERSION = "10"                ✅ Correcto

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200                      ✅ Correcto (SPA)
```

### **3. Script package.json**
```json
"build:prod": "ng build --configuration production"  ✅ Correcto
```

---

## 🚨 Posibles Problemas

### **Problema 1: Base href incorrecto**
**Síntoma:** Página carga pero recursos no se encuentran (404)

**Verificación:**
```html
<!-- index.html -->
<base href="/">  ✅ Correcto para Netlify
```

**Solución:** Ya está correcto

---

### **Problema 2: Rutas de Angular no funcionan**
**Síntoma:** Refresh en rutas internas da 404

**Verificación:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Solución:** Ya está configurado correctamente

---

### **Problema 3: Build en Netlify falla**
**Síntoma:** Deploy falla durante el build

**Posibles causas:**
1. Node version incorrecta
2. Dependencias faltantes
3. Memoria insuficiente

**Verificación:**
```bash
# Verificar que todas las dependencias estén en package.json
npm install
ng build --configuration production
```

---

### **Problema 4: Archivos no se encuentran**
**Síntoma:** Página en blanco o 404

**Verificación:**
```bash
# Verificar estructura de dist/
ls -la dist/angular/browser/
```

**Resultado:**
```
✅ index.html existe
✅ main-*.js existe
✅ polyfills-*.js existe
✅ styles-*.css existe
```

---

## 🔧 Pasos de Diagnóstico en Netlify

### **1. Verificar Build Log**
```
Site: https://6924d5572514047385f7967f--syzygydatainsight.netlify.app/

Revisar en Netlify Dashboard:
1. Ir a "Deploys"
2. Click en el último deploy
3. Ver "Deploy log"
4. Buscar errores
```

### **2. Verificar Publish Directory**
```
En Netlify Dashboard:
1. Site settings
2. Build & deploy
3. Build settings
4. Publish directory: dist/angular/browser ✅
```

### **3. Verificar Build Command**
```
En Netlify Dashboard:
1. Site settings
2. Build & deploy
3. Build settings
4. Build command: npm run build:prod ✅
```

### **4. Verificar Environment Variables**
```
En Netlify Dashboard:
1. Site settings
2. Build & deploy
3. Environment
4. Verificar NODE_VERSION = 20
```

---

## 🎯 Soluciones Comunes

### **Solución 1: Limpiar caché de Netlify**
```
En Netlify Dashboard:
1. Deploys
2. Trigger deploy
3. Clear cache and deploy site
```

### **Solución 2: Verificar .gitignore**
```bash
# Asegurar que dist/ NO esté en .gitignore para Netlify
# Netlify necesita construir desde source
```

**Verificación:**
```bash
cat .gitignore | grep dist
```

**Resultado esperado:**
```
/dist  ← Esto está bien, Netlify construye desde source
```

### **Solución 3: Agregar _redirects (alternativa)**
```bash
# Crear archivo _redirects en dist/angular/browser/
/*    /index.html   200
```

**Nota:** Ya tenemos redirects en netlify.toml, no es necesario

---

## 📊 Checklist de Verificación

### **Configuración Local:**
- ✅ `ng build --configuration production` funciona
- ✅ `dist/angular/browser/` contiene archivos
- ✅ `index.html` tiene `<base href="/">`
- ✅ Scripts en `package.json` correctos
- ✅ `netlify.toml` configurado

### **Configuración Netlify:**
- ❓ Build command: `npm run build:prod`
- ❓ Publish directory: `dist/angular/browser`
- ❓ Node version: 20
- ❓ Deploy log sin errores

---

## 🚀 Pasos para Re-Deploy

### **Opción 1: Desde Netlify Dashboard**
```
1. Ir a Deploys
2. Click "Trigger deploy"
3. Seleccionar "Clear cache and deploy site"
4. Esperar resultado
```

### **Opción 2: Desde Git**
```bash
# Hacer un commit vacío para forzar re-deploy
git commit --allow-empty -m "Trigger Netlify rebuild"
git push
```

### **Opción 3: Netlify CLI**
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy manual
netlify deploy --prod --dir=dist/angular/browser
```

---

## 🔍 Comandos de Diagnóstico

### **Verificar build local:**
```bash
cd /home/vandalit/CodigoWSL/data-insight/angular
rm -rf dist/
npm install
ng build --configuration production
ls -la dist/angular/browser/
```

### **Verificar tamaño de archivos:**
```bash
du -sh dist/angular/browser/*
```

### **Verificar contenido de index.html:**
```bash
cat dist/angular/browser/index.html | grep -E "(base|script|link)"
```

---

## 📝 Información del Sitio

**URL:** https://6924d5572514047385f7967f--syzygydatainsight.netlify.app/

**Configuración actual:**
- ✅ Build command: `npm run build:prod`
- ✅ Publish directory: `dist/angular/browser`
- ✅ Node version: 20
- ✅ Redirects configurados

**Próximos pasos:**
1. Revisar Deploy log en Netlify Dashboard
2. Verificar que el build se complete exitosamente
3. Si hay errores, revisar dependencias y versiones
4. Considerar hacer "Clear cache and deploy"

---

## ⚠️ Warnings del Build

```
▲ dashboard.css exceeded budget (4.76 kB > 4.00 kB)
▲ proyecto-vista-nav.css exceeded budget (4.79 kB > 4.00 kB)
▲ proyecto-nav.css exceeded budget (4.45 kB > 4.00 kB)
```

**Nota:** Estos son warnings, NO errores. El build se completa exitosamente.

**Solución futura (opcional):**
- Optimizar CSS
- Aumentar budget en angular.json
- Usar CSS minification más agresivo

---

**El build local funciona correctamente. El problema debe estar en la configuración de Netlify o en el proceso de deploy.**

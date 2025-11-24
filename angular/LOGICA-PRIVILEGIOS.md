# Lógica de Privilegios y Navegación

## 📋 Resumen Ejecutivo

Sistema de privilegios con 3 niveles jerárquicos (Módulos → Proyectos → Vistas) que controla el acceso y comportamiento de navegación según el rol del usuario.

---

## 👥 Roles de Usuario

### **Stakeholder**
- **Características:**
  - Salta vistas resumen automáticamente
  - Va directo a tabs/contenido
  - Acceso de solo lectura (view only)
  
- **Flags:**
  - `skipModuleResumen: true`
  - `skipProjectResumen: true` (si tiene 1 solo proyecto)

### **Member/Admin**
- **Características:**
  - Navega por vistas resumen
  - Puede tener permisos de edición
  - Flujo completo de navegación

---

## 🎯 Usuarios Configurados

### **Luis (Stakeholder)**

**Perfil:**
- Role: `stakeholder`
- Módulos: Ciberseguridad (order: 0), Proyectos (order: 1)
- Proyectos: CRM Interno (1 solo proyecto)
- Landing: Ciberseguridad

**Comportamiento:**
```
Login → Dashboard
  ↓
skipModuleResumen = true
skipProjectResumen = true
  ↓
Landing module: 'ciberseguridad'
Landing project: 'crm-interno'
  ↓
Redirect: /dashboard/ciberseguridad
```

**Flujo en Proyectos:**
```
Click "Proyectos" → /dashboard/proyectos
  ↓
1 proyecto detectado + skipProjectResumen = true
  ↓
Obtener primera vista no-resumen: 'tareas'
  ↓
Redirect: /dashboard/proyectos/crm-interno/tareas
```

**Vistas disponibles CRM Interno:**
1. Resumen (order: 0, default) - Saltada
2. **Tareas (order: 1)** ← Aterriza aquí
3. Gantt (order: 2)
4. Calendario (order: 3)
5. Gastos (order: 4)
6. Usuarios (order: 5)

---

### **Ana (Stakeholder)**

**Perfil:**
- Role: `stakeholder`
- Módulos: Proyectos (order: 0), CMS (order: 1)
- Proyectos: 4 proyectos asignados
- Landing: Proyectos → Reportes

**Comportamiento:**
```
Login → Dashboard
  ↓
skipModuleResumen = true
  ↓
Landing module: 'proyectos'
Landing project: 'reportes'
  ↓
Redirect: /dashboard/proyectos/reportes
```

**Flujo en Proyectos:**
```
Click "Web Corporativa" → /dashboard/proyectos/web-corporativa
  ↓
Redirect automático a primera vista: 'resumen'
  ↓
URL: /dashboard/proyectos/web-corporativa/resumen
```

**Proyectos asignados:**

1. **Web Corporativa** (order: 1)
   - Vistas: Resumen, Tareas, Gantt, Calendario
   - Sin: Gastos, Usuarios

2. **App Mobile** (order: 2)
   - Vistas: Resumen, Tareas, Calendario
   - Sin: Gantt, Gastos, Usuarios

3. **E-Commerce** (order: 3)
   - Vistas: Resumen, Tareas
   - Sin: Gantt, Calendario, Gastos, Usuarios

4. **CRM Interno** (order: 4)
   - Vistas: Resumen, Tareas, Gantt
   - Sin: Calendario, Gastos, Usuarios

---

## 🔄 Flujos de Navegación

### **Nivel 1: Módulos**

**Stakeholder:**
```
Dashboard → Primer módulo disponible (según order)
No pasa por vista resumen de módulo
```

**Member:**
```
Dashboard → Vista resumen del módulo
Usuario navega manualmente a tabs
```

---

### **Nivel 2: Proyectos**

**Stakeholder con 1 proyecto:**
```
/dashboard/proyectos
  ↓
skipProjectResumen = true
  ↓
getFirstNonResumenView(projectId)
  ↓
/dashboard/proyectos/:id/:firstView
```

**Stakeholder con múltiples proyectos:**
```
/dashboard/proyectos
  ↓
Redirect a reportes generales
  ↓
/dashboard/proyectos/reportes
```

**Member con 1 proyecto:**
```
/dashboard/proyectos
  ↓
Redirect a resumen del proyecto
  ↓
/dashboard/proyectos/:id/resumen
```

**Member con múltiples proyectos:**
```
/dashboard/proyectos
  ↓
Redirect a reportes generales
  ↓
/dashboard/proyectos/reportes
```

---

### **Nivel 3: Vistas**

**Estructura de navegación:**
```
┌─────────────────────────────────┐
│ Header: NOMBRE DEL PROYECTO     │ ← Clickeable → /resumen
├─────────────────────────────────┤
│ Label: VISTAS                   │
├─────────────────────────────────┤
│ • Resumen (default)             │
│ • Tareas                        │
│ • Gantt                         │
│ • Calendario                    │
│ • Gastos                        │
│ • Usuarios                      │
└─────────────────────────────────┘
```

**Vista por defecto:**
- Cada proyecto tiene `resumen` como vista default
- Stakeholders saltan resumen y van a primera vista disponible

---

## 🎨 Interfaz de Navegación

### **3 Columnas de Navegación**

**Columna 1: Dashboard (260px → 70px)**
```
┌─────────────────┐
│ DATA INSIGHT    │ ← Header
├─────────────────┤
│ Usuario Actual  │
├─────────────────┤
│ Módulos:        │
│ • Ciberseguridad│
│ • Proyectos     │
│ • CMS           │
├─────────────────┤
│ [Toggle ⇄]      │ ← Bottom
└─────────────────┘
```

**Columna 2: Proyectos (240px → 60px)**
```
┌─────────────────┐
│ MÓDULO PROYECTOS│ ← Header clickeable → /reportes
├─────────────────┤
│ PROYECTOS:      │
│ • Web Corp      │
│ • App Mobile    │
│ • E-Commerce    │
│ • CRM Interno   │
├─────────────────┤
│ [Toggle ⇄]      │ ← Bottom
└─────────────────┘
```

**Columna 3: Vistas (200px → 60px)**
```
┌─────────────────┐
│ WEB CORPORATIVA │ ← Header clickeable → /resumen
├─────────────────┤
│ VISTAS:         │
│ • Resumen       │
│ • Tareas        │
│ • Gantt         │
│ • Calendario    │
├─────────────────┤
│ [Toggle ⇄]      │ ← Bottom
└─────────────────┘
```

---

## 🔧 Métodos del PrivilegesService

### **Módulos**
```typescript
getAvailableModules(): ModulePrivilege[]
getLandingModule(): string
canAccessModule(moduleId): boolean
canEditModule(moduleId): boolean
```

### **Proyectos**
```typescript
getAvailableProjects(): ProjectPrivilege[]
canAccessProject(projectId): boolean
canEditProject(projectId): boolean
canDeleteProject(projectId): boolean
```

### **Vistas**
```typescript
getAvailableViews(projectId): ViewPrivilege[]
getDefaultView(projectId): string
canAccessView(projectId, viewId): boolean
canEditView(projectId, viewId): boolean
```

### **Comportamiento**
```typescript
shouldSkipModuleResumen(): boolean
shouldSkipProjectResumen(): boolean
getFirstNonResumenView(projectId): string | null
```

---

## 📊 Tabla Comparativa

| Aspecto | Luis (Stakeholder) | Ana (Stakeholder) | Member Típico |
|---------|-------------------|-------------------|---------------|
| **Módulos** | 2 (Ciber, Proyectos) | 2 (Proyectos, CMS) | Variable |
| **Landing** | Ciberseguridad | Proyectos/Reportes | Resumen |
| **Proyectos** | 1 (CRM) | 4 (Web, App, Ecom, CRM) | Variable |
| **Skip Resumen Módulo** | ✅ Sí | ✅ Sí | ❌ No |
| **Skip Resumen Proyecto** | ✅ Sí | ❌ No (múltiples) | ❌ No |
| **Primera Vista** | Tareas | Resumen | Resumen |
| **Permisos Edición** | ❌ View only | ❌ View only | ✅ Puede editar |

---

## ✅ Reglas de Negocio

1. **Stakeholder siempre salta vista resumen de módulo**
   - Va directo al primer tab disponible

2. **Usuario con 1 proyecto salta vista resumen de proyecto**
   - Va directo a primera vista del proyecto

3. **Usuario con múltiples proyectos va a reportes**
   - Puede navegar a proyectos individuales desde ahí

4. **Orden de módulos según `order` field**
   - Ana: Proyectos primero (order: 0)
   - Luis: Ciberseguridad primero (order: 0)

5. **Orden de vistas según `order` field**
   - Resumen siempre order: 0 (default)
   - Resto en orden ascendente

6. **Headers clickeables en cada nivel**
   - Dashboard Header → Módulo resumen
   - Proyecto Header → Reportes generales
   - Vista Header → Resumen del proyecto

---

## 🎯 Casos de Uso

### **Caso 1: Luis entra al sistema**
```
1. Login como Luis
2. Carga privilegios: stakeholder, 2 módulos, 1 proyecto
3. Landing: ciberseguridad
4. Redirect: /dashboard/ciberseguridad
5. Ve módulo Ciberseguridad activo
6. Click en "Proyectos" → Detecta 1 proyecto + stakeholder
7. Redirect: /dashboard/proyectos/crm-interno/tareas
8. Ve CRM Interno con Tareas activa
```

### **Caso 2: Ana entra al sistema**
```
1. Login como Ana
2. Carga privilegios: stakeholder, 2 módulos, 4 proyectos
3. Landing: proyectos/reportes
4. Redirect: /dashboard/proyectos/reportes
5. Ve Reportes Generales
6. Click en "Web Corporativa"
7. Redirect: /dashboard/proyectos/web-corporativa/resumen
8. Ve Web Corporativa con Resumen activa
9. Ve solo 4 vistas (sin Gastos ni Usuarios)
```

### **Caso 3: Ana navega entre proyectos**
```
1. Está en Web Corporativa
2. Click en "App Mobile" en sidebar
3. Redirect: /dashboard/proyectos/app-mobile/resumen
4. Ve App Mobile con Resumen activa
5. Ve solo 3 vistas (sin Gantt, Gastos ni Usuarios)
6. Click en "Tareas" en vista-nav
7. URL: /dashboard/proyectos/app-mobile/tareas
```

---

## 🔍 Debugging

**Verificar privilegios cargados:**
```typescript
const privileges = privilegesService.getUserPrivileges();
console.log('User:', privileges?.userName);
console.log('Role:', privileges?.role);
console.log('Modules:', privileges?.modules);
console.log('Projects:', Object.keys(privileges?.projects || {}));
```

**Verificar flags:**
```typescript
console.log('Skip Module Resumen:', privilegesService.shouldSkipModuleResumen());
console.log('Skip Project Resumen:', privilegesService.shouldSkipProjectResumen());
```

**Verificar vistas disponibles:**
```typescript
const views = privilegesService.getAvailableViews('web-corporativa');
console.log('Views:', views.map(v => v.name));
```

---

## 📝 Notas Importantes

1. **Todos los stakeholders saltan vista resumen de módulo**
2. **Solo stakeholders con 1 proyecto saltan vista resumen de proyecto**
3. **El orden de módulos se respeta según el campo `order`**
4. **Cada nivel tiene su propia vista resumen clickeable desde el header**
5. **Los permisos se cargan automáticamente en el login**
6. **Los privilegios se limpian automáticamente en el logout**

---

**Sistema de privilegios completo y funcional implementado.**

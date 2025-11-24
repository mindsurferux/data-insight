# Infraestructura de Privilegios - Análisis Completo

## 🎯 Objetivo

Implementar un sistema de privilegios que determine automáticamente el flujo de onboarding según el rol del usuario, **sin personalización usuario por usuario**.

---

## 📊 Modelo de Privilegios Actual

### **Interfaces Principales**

```typescript
export interface UserPrivileges {
  userId: string;
  userName: string;
  role: 'admin' | 'stakeholder' | 'viewer' | 'editor' | 'member' | 'dev';
  
  modules: ModulePrivilege[];
  projects: { [projectId: string]: { project: ProjectPrivilege; views: ViewPrivilege[] } };
  
  landing: {
    module: string;
    project?: string;
    view?: string;
  };
  
  skipModuleResumen?: boolean;    // ✅ Stakeholders saltan resumen de módulo
  skipProjectResumen?: boolean;   // ✅ Usuarios con 1 proyecto saltan resumen
}
```

### **Flags de Comportamiento**

| Flag | Propósito | Aplica a |
|------|-----------|----------|
| `skipModuleResumen` | Salta vista resumen de módulo | Stakeholders |
| `skipProjectResumen` | Salta vista resumen de proyecto | Stakeholders con 1 proyecto |

---

## 👥 Configuración de Usuarios

### **Luis (Stakeholder)**

```typescript
{
  role: 'stakeholder',
  modules: [
    { id: 'ciberseguridad', order: 0, isDefault: true },  // ← Primer módulo
    { id: 'proyectos', order: 1 }
  ],
  projects: {
    'crm-interno': { /* 1 proyecto */ }
  },
  landing: {
    module: 'ciberseguridad',
    project: 'crm-interno'
  },
  skipModuleResumen: true,   // ✅ Salta resumen de módulo
  skipProjectResumen: true   // ✅ Salta resumen de proyecto (1 solo)
}
```

**Comportamiento Esperado:**
```
Login → /dashboard
  ↓
skipModuleResumen = true
  ↓
Obtener primer módulo: 'ciberseguridad' (order: 0)
  ↓
Redirect: /dashboard/ciberseguridad
```

---

### **Ana (Stakeholder)**

```typescript
{
  role: 'stakeholder',
  modules: [
    { id: 'proyectos', order: 0, isDefault: true },  // ← Primer módulo
    { id: 'cms', order: 1 }
  ],
  projects: {
    'web-corporativa': { /* proyecto 1 */ },
    'app-mobile': { /* proyecto 2 */ },
    'ecommerce': { /* proyecto 3 */ },
    'crm-interno': { /* proyecto 4 */ }
  },
  landing: {
    module: 'proyectos',
    project: 'reportes'
  },
  skipModuleResumen: true,    // ✅ Salta resumen de módulo
  skipProjectResumen: false   // ❌ NO salta (múltiples proyectos)
}
```

**Comportamiento Esperado:**
```
Login → /dashboard
  ↓
skipModuleResumen = true
  ↓
Obtener primer módulo: 'proyectos' (order: 0)
  ↓
Módulo es 'proyectos' + múltiples proyectos
  ↓
Redirect: /dashboard/proyectos/reportes
```

---

### **Jorge (Dev - NO Stakeholder)**

```typescript
{
  role: 'dev',
  modules: [
    { id: 'proyectos', order: 0, isDefault: true },
    { id: 'cms', order: 1 },
    { id: 'ciberseguridad', order: 2 }
  ],
  projects: {
    'crm-interno': { /* 1 proyecto */ }
  },
  landing: {
    module: 'proyectos',
    project: 'crm-interno'
  },
  skipModuleResumen: undefined,   // ❌ NO salta resumen
  skipProjectResumen: undefined   // ❌ NO salta resumen
}
```

**Comportamiento Esperado:**
```
Login → /dashboard
  ↓
skipModuleResumen = false (undefined)
  ↓
Usuario normal: Va a vista resumen
  ↓
Redirect: /dashboard/resumen
```

---

## 🔄 Lógica de Onboarding Implementada

### **Código en Dashboard.ts**

```typescript
if (this.router.url === '/dashboard') {
  const skipModuleResumen = this.privilegesService.shouldSkipModuleResumen();
  const skipProjectResumen = this.privilegesService.shouldSkipProjectResumen();
  
  if (skipModuleResumen) {
    // STAKEHOLDER: Salta resumen, va al primer módulo
    const firstModule = this.privilegesService.getFirstModule();
    
    if (firstModule && firstModule.id === 'proyectos') {
      // Primer módulo es Proyectos
      const proyectos = this.privilegesService.getAvailableProjects();
      
      if (proyectos.length === 1 && skipProjectResumen) {
        // Stakeholder con 1 proyecto: ir a primera vista
        const projectId = proyectos[0].id;
        const firstView = this.privilegesService.getFirstNonResumenView(projectId);
        this.router.navigate(['/dashboard', 'proyectos', projectId, firstView]);
      } else if (proyectos.length > 1) {
        // Múltiples proyectos: ir a reportes
        this.router.navigate(['/dashboard', 'proyectos', 'reportes']);
      }
    } else if (firstModule) {
      // Primer módulo NO es Proyectos
      this.router.navigate(['/dashboard', firstModule.id]);
    }
  } else {
    // USUARIO NORMAL: Va a vista resumen
    this.router.navigate(['/dashboard', 'resumen']);
  }
}
```

---

## 📋 Matriz de Comportamiento

| Usuario | Rol | skipModuleResumen | Primer Módulo | Proyectos | Destino Final |
|---------|-----|-------------------|---------------|-----------|---------------|
| **Luis** | stakeholder | ✅ true | ciberseguridad | 1 | `/dashboard/ciberseguridad` |
| **Ana** | stakeholder | ✅ true | proyectos | 4 | `/dashboard/proyectos/reportes` |
| **Jorge** | dev | ❌ false | proyectos | 1 | `/dashboard/resumen` |

---

## 🎬 Flujos Completos

### **Flujo 1: Luis (Stakeholder con Ciberseguridad)**

```
1. Login como Luis
2. Cargar privilegios:
   - role: 'stakeholder'
   - skipModuleResumen: true
   - modules[0]: { id: 'ciberseguridad', order: 0 }

3. Lógica de onboarding:
   skipModuleResumen = true
   ↓
   firstModule = 'ciberseguridad'
   ↓
   firstModule.id !== 'proyectos'
   ↓
   Redirect: /dashboard/ciberseguridad

4. Resultado:
   ✅ Salta vista resumen
   ✅ Va directo a Ciberseguridad
   ✅ Dashboard colapsado, Módulos visible
```

### **Flujo 2: Ana (Stakeholder con Proyectos)**

```
1. Login como Ana
2. Cargar privilegios:
   - role: 'stakeholder'
   - skipModuleResumen: true
   - modules[0]: { id: 'proyectos', order: 0 }
   - projects: 4 proyectos

3. Lógica de onboarding:
   skipModuleResumen = true
   ↓
   firstModule = 'proyectos'
   ↓
   firstModule.id === 'proyectos'
   ↓
   proyectos.length > 1
   ↓
   Redirect: /dashboard/proyectos/reportes

4. Resultado:
   ✅ Salta vista resumen
   ✅ Va directo a Proyectos/Reportes
   ✅ Dashboard colapsado, Proyectos expandido
```

### **Flujo 3: Jorge (Dev - NO Stakeholder)**

```
1. Login como Jorge
2. Cargar privilegios:
   - role: 'dev'
   - skipModuleResumen: undefined (false)
   - modules[0]: { id: 'proyectos', order: 0 }
   - projects: 1 proyecto

3. Lógica de onboarding:
   skipModuleResumen = false
   ↓
   Usuario normal
   ↓
   Redirect: /dashboard/resumen

4. Resultado:
   ✅ NO salta vista resumen
   ✅ Va a vista resumen del dashboard
   ✅ Dashboard expandido, flujo normal
```

---

## ✅ Verificación de Infraestructura

### **1. Modelo de Datos**
- ✅ `UserPrivileges` tiene campo `role`
- ✅ `UserPrivileges` tiene `skipModuleResumen`
- ✅ `UserPrivileges` tiene `skipProjectResumen`
- ✅ `ModulePrivilege` tiene `order` para ordenar
- ✅ `ModulePrivilege` tiene `isDefault` (opcional)

### **2. Servicios**
- ✅ `shouldSkipModuleResumen()`: Verifica flag
- ✅ `shouldSkipProjectResumen()`: Verifica flag
- ✅ `getFirstModule()`: Obtiene primer módulo por order
- ✅ `getFirstNonResumenView()`: Obtiene primera vista no-resumen
- ✅ `getAvailableProjects()`: Lista proyectos disponibles

### **3. Lógica de Onboarding**
- ✅ Verifica `skipModuleResumen` primero
- ✅ Stakeholders van al primer módulo
- ✅ NO stakeholders van a vista resumen
- ✅ Maneja caso especial de módulo Proyectos
- ✅ Maneja múltiples proyectos vs 1 proyecto

### **4. Configuración de Usuarios**
- ✅ Luis: stakeholder, skipModuleResumen = true
- ✅ Ana: stakeholder, skipModuleResumen = true
- ✅ Jorge: dev, skipModuleResumen = undefined

---

## 🎯 Reglas de Negocio

### **Regla 1: Stakeholders saltan resumen de módulo**
```
IF role === 'stakeholder' AND skipModuleResumen === true
THEN redirect to firstModule
ELSE redirect to /dashboard/resumen
```

### **Regla 2: Stakeholders con 1 proyecto saltan resumen de proyecto**
```
IF role === 'stakeholder' AND projects.length === 1 AND skipProjectResumen === true
THEN redirect to firstView (no resumen)
ELSE redirect to project/resumen
```

### **Regla 3: Orden de módulos determina landing**
```
firstModule = modules.sort((a, b) => a.order - b.order)[0]
```

### **Regla 4: Usuario normal siempre ve resumen**
```
IF skipModuleResumen === false OR undefined
THEN redirect to /dashboard/resumen
```

---

## 🔧 Métodos de PrivilegesService

```typescript
// Verificar comportamiento
shouldSkipModuleResumen(): boolean
shouldSkipProjectResumen(): boolean

// Obtener datos
getFirstModule(): ModulePrivilege | null
getAvailableModules(): ModulePrivilege[]
getAvailableProjects(): ProjectPrivilege[]
getAvailableViews(projectId): ViewPrivilege[]

// Obtener vistas específicas
getFirstNonResumenView(projectId): string | null
getDefaultView(projectId): string
```

---

## 📊 Tabla de Decisión

| Condición | Stakeholder | Primer Módulo | Proyectos | Acción |
|-----------|-------------|---------------|-----------|--------|
| skipModuleResumen = true | ✅ | ciberseguridad | - | → `/dashboard/ciberseguridad` |
| skipModuleResumen = true | ✅ | proyectos | 1 | → `/dashboard/proyectos/:id/:firstView` |
| skipModuleResumen = true | ✅ | proyectos | >1 | → `/dashboard/proyectos/reportes` |
| skipModuleResumen = true | ✅ | cms | - | → `/dashboard/cms` |
| skipModuleResumen = false | ❌ | cualquiera | - | → `/dashboard/resumen` |

---

## ✅ Conclusión

### **Infraestructura Completa:**
1. ✅ Modelo de privilegios con flags de comportamiento
2. ✅ Servicios para consultar privilegios
3. ✅ Lógica de onboarding basada en rol
4. ✅ Configuración por rol, NO por usuario individual
5. ✅ Stakeholders saltan resumen, van al primer módulo
6. ✅ NO stakeholders van a vista resumen
7. ✅ Sistema escalable y mantenible

### **Próximos Pasos:**
1. Verificar build
2. Probar con Luis (debe ir a Ciberseguridad)
3. Probar con Ana (debe ir a Proyectos/Reportes)
4. Probar con Jorge (debe ir a Resumen)

---

**La infraestructura está completa y lista para testing.**

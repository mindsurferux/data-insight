# Lógica de Stakeholders - Testing y Verificación

## 🎯 Objetivo

Stakeholders cargan directamente su primer módulo, saltándose la vista resumen del dashboard.

---

## 👥 Configuración de Usuarios

### **Luis (Stakeholder)**
```typescript
{
  role: 'stakeholder',
  skipModuleResumen: true,     // ✅ Salta resumen
  skipProjectResumen: true,    // ✅ Salta resumen de proyecto
  
  modules: [
    { id: 'ciberseguridad', order: 0, isDefault: true },  // ← Primer módulo
    { id: 'proyectos', order: 1 }
  ],
  
  projects: {
    'crm-interno': { /* 1 proyecto */ }
  }
}
```

**Comportamiento Esperado:**
```
Login → /dashboard
  ↓
skipModuleResumen = true
  ↓
firstModule = 'ciberseguridad' (order: 0)
  ↓
firstModule.id !== 'proyectos'
  ↓
Redirect: /dashboard/ciberseguridad ✅
```

---

### **Ana (Stakeholder)**
```typescript
{
  role: 'stakeholder',
  skipModuleResumen: true,     // ✅ Salta resumen
  skipProjectResumen: false,   // ❌ NO salta (múltiples proyectos)
  
  modules: [
    { id: 'proyectos', order: 0, isDefault: true },  // ← Primer módulo
    { id: 'cms', order: 1 }
  ],
  
  projects: {
    'web-corporativa': { /* proyecto 1 */ },
    'app-mobile': { /* proyecto 2 */ },
    'ecommerce': { /* proyecto 3 */ },
    'crm-interno': { /* proyecto 4 */ }
  }
}
```

**Comportamiento Esperado:**
```
Login → /dashboard
  ↓
skipModuleResumen = true
  ↓
firstModule = 'proyectos' (order: 0)
  ↓
firstModule.id === 'proyectos'
  ↓
proyectos.length > 1
  ↓
Redirect: /dashboard/proyectos/reportes ✅
```

---

### **Jorge (Dev - NO Stakeholder)**
```typescript
{
  role: 'dev',
  skipModuleResumen: undefined,  // ❌ NO salta resumen
  skipProjectResumen: undefined, // ❌ NO salta resumen
  
  modules: [
    { id: 'proyectos', order: 0, isDefault: true },
    { id: 'cms', order: 1 },
    { id: 'ciberseguridad', order: 2 }
  ],
  
  projects: {
    'crm-interno': { /* 1 proyecto */ }
  }
}
```

**Comportamiento Esperado:**
```
Login → /dashboard
  ↓
skipModuleResumen = false (undefined)
  ↓
Usuario normal
  ↓
Redirect: /dashboard/resumen ✅
```

---

## 🔄 Lógica Implementada

### **Código en dashboard.ts**

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

## ✅ Matriz de Verificación

| Usuario | Rol | skipModuleResumen | Primer Módulo | Proyectos | Destino Final |
|---------|-----|-------------------|---------------|-----------|---------------|
| **Luis** | stakeholder | ✅ true | ciberseguridad | 1 | `/dashboard/ciberseguridad` |
| **Ana** | stakeholder | ✅ true | proyectos | 4 | `/dashboard/proyectos/reportes` |
| **Jorge** | dev | ❌ false | proyectos | 1 | `/dashboard/resumen` |

---

## 🧪 Plan de Testing

### **Test 1: Luis (Stakeholder → Ciberseguridad)**

**Pasos:**
1. Logout (si está logueado)
2. Login como Luis
3. Verificar redirect automático

**Resultado Esperado:**
```
URL: /dashboard/ciberseguridad
Estado navegación:
- Dashboard: EXPANDIDO
- Proyectos: COLAPSADO
- Vistas: COLAPSADO
```

**Verificación:**
- ✅ NO pasa por `/dashboard/resumen`
- ✅ Va directo a Ciberseguridad
- ✅ Dashboard expandido con módulos visibles

---

### **Test 2: Ana (Stakeholder → Proyectos/Reportes)**

**Pasos:**
1. Logout (si está logueado)
2. Login como Ana
3. Verificar redirect automático

**Resultado Esperado:**
```
URL: /dashboard/proyectos/reportes
Estado navegación:
- Dashboard: EXPANDIDO
- Proyectos: EXPANDIDO
- Vistas: COLAPSADO
```

**Verificación:**
- ✅ NO pasa por `/dashboard/resumen`
- ✅ Va directo a Proyectos/Reportes
- ✅ Dashboard y Proyectos expandidos

---

### **Test 3: Jorge (Dev → Resumen)**

**Pasos:**
1. Logout (si está logueado)
2. Login como Jorge
3. Verificar redirect automático

**Resultado Esperado:**
```
URL: /dashboard/resumen
Estado navegación:
- Dashboard: EXPANDIDO
- Proyectos: COLAPSADO
- Vistas: COLAPSADO
```

**Verificación:**
- ✅ SÍ pasa por `/dashboard/resumen`
- ✅ Ve la vista resumen del dashboard
- ✅ Dashboard expandido con módulos visibles

---

## 🎬 Flujos Completos

### **Flujo 1: Luis (Stakeholder con Ciberseguridad)**

```
1. Login como Luis
   ↓
2. AuthService.login('luis')
   ↓
3. PrivilegesService.loadUserPrivileges('luis')
   - role: 'stakeholder'
   - skipModuleResumen: true
   - modules[0]: { id: 'ciberseguridad', order: 0 }
   ↓
4. Router.navigate(['/dashboard'])
   ↓
5. Dashboard.ngOnInit()
   - skipModuleResumen = true
   - firstModule = 'ciberseguridad'
   - firstModule.id !== 'proyectos'
   ↓
6. Router.navigate(['/dashboard', 'ciberseguridad'])
   ↓
7. Resultado:
   ✅ URL: /dashboard/ciberseguridad
   ✅ Salta vista resumen
   ✅ Dashboard expandido
```

---

### **Flujo 2: Ana (Stakeholder con Proyectos)**

```
1. Login como Ana
   ↓
2. AuthService.login('ana')
   ↓
3. PrivilegesService.loadUserPrivileges('ana')
   - role: 'stakeholder'
   - skipModuleResumen: true
   - modules[0]: { id: 'proyectos', order: 0 }
   - projects: 4 proyectos
   ↓
4. Router.navigate(['/dashboard'])
   ↓
5. Dashboard.ngOnInit()
   - skipModuleResumen = true
   - firstModule = 'proyectos'
   - firstModule.id === 'proyectos'
   - proyectos.length > 1
   ↓
6. Router.navigate(['/dashboard', 'proyectos', 'reportes'])
   ↓
7. Resultado:
   ✅ URL: /dashboard/proyectos/reportes
   ✅ Salta vista resumen
   ✅ Dashboard y Proyectos expandidos
```

---

### **Flujo 3: Jorge (Dev - NO Stakeholder)**

```
1. Login como Jorge
   ↓
2. AuthService.login('jorge')
   ↓
3. PrivilegesService.loadUserPrivileges('jorge')
   - role: 'dev'
   - skipModuleResumen: undefined (false)
   ↓
4. Router.navigate(['/dashboard'])
   ↓
5. Dashboard.ngOnInit()
   - skipModuleResumen = false
   - Usuario normal
   ↓
6. Router.navigate(['/dashboard', 'resumen'])
   ↓
7. Resultado:
   ✅ URL: /dashboard/resumen
   ✅ Ve vista resumen (flujo normal)
   ✅ Dashboard expandido
```

---

## 🔍 Verificación de Condicionales

### **Condicional 1: skipModuleResumen**
```typescript
if (skipModuleResumen) {
  // STAKEHOLDER
} else {
  // USUARIO NORMAL
}
```

**Usuarios afectados:**
- ✅ Luis: `skipModuleResumen = true` → Salta resumen
- ✅ Ana: `skipModuleResumen = true` → Salta resumen
- ❌ Jorge: `skipModuleResumen = undefined` → Ve resumen

---

### **Condicional 2: Tipo de Primer Módulo**
```typescript
if (firstModule.id === 'proyectos') {
  // Lógica especial para Proyectos
} else {
  // Ir directo al módulo
}
```

**Usuarios afectados:**
- ❌ Luis: `firstModule = 'ciberseguridad'` → Va directo
- ✅ Ana: `firstModule = 'proyectos'` → Lógica especial

---

### **Condicional 3: Cantidad de Proyectos**
```typescript
if (proyectos.length === 1 && skipProjectResumen) {
  // Ir a primera vista del proyecto
} else if (proyectos.length > 1) {
  // Ir a reportes
}
```

**Usuarios afectados:**
- ❌ Luis: 1 proyecto pero módulo NO es Proyectos
- ✅ Ana: 4 proyectos → Va a reportes

---

## 📊 Tabla de Decisión Completa

| Condición | Luis | Ana | Jorge | Acción |
|-----------|------|-----|-------|--------|
| skipModuleResumen | ✅ | ✅ | ❌ | Determina flujo |
| firstModule | ciberseguridad | proyectos | proyectos | Determina destino |
| firstModule === 'proyectos' | ❌ | ✅ | ❌ | Lógica especial |
| proyectos.length | 1 | 4 | 1 | Determina vista |
| **Destino Final** | `/ciberseguridad` | `/proyectos/reportes` | `/resumen` | ✅ |

---

## ✅ Conclusión

### **Lógica Implementada Correctamente:**
1. ✅ Stakeholders saltan vista resumen
2. ✅ NO stakeholders ven vista resumen
3. ✅ Luis va a Ciberseguridad
4. ✅ Ana va a Proyectos/Reportes
5. ✅ Jorge ve Resumen

### **Condicionales Aplicadas:**
1. ✅ `skipModuleResumen` determina flujo stakeholder vs normal
2. ✅ `firstModule` determina módulo de aterrizaje
3. ✅ Lógica especial para módulo Proyectos
4. ✅ Cantidad de proyectos determina vista final

### **Próximo Paso:**
- Realizar testing manual con los 3 usuarios
- Verificar que cada uno aterrice en su vista correcta
- Confirmar que Jorge ve resumen y Luis/Ana no

---

**La lógica está correctamente implementada. Lista para testing.**

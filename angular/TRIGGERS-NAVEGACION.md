# Sistema de Triggers de Navegación

## 📋 Comportamiento de Triggers

Los triggers se ejecutan **en cada elemento individual** de los tabs de navegación, no en el contenedor general.

---

## 🎯 Reglas de Triggers

### **Nivel 1: Click en Módulo (ej: "Proyectos", "CMS")**

**Acción:**
```typescript
onModuleClick() {
  dashboard: EXPANDIDO
  proyectos: COLAPSADO
  vistas: COLAPSADO
}
```

**Ejemplo:**
```
Usuario hace click en tab "Proyectos"
  ↓
Dashboard se expande (260px)
Proyectos se colapsa (60px)
Vistas se colapsa (60px)
```

---

### **Nivel 2: Click en Proyecto (ej: "Web Corporativa", "App Mobile")**

**Acción:**
```typescript
onProjectClick() {
  dashboard: COLAPSADO
  proyectos: EXPANDIDO
  vistas: EXPANDIDO
}
```

**Ejemplo:**
```
Usuario hace click en tab "Web Corporativa"
  ↓
Dashboard se colapsa (70px)
Proyectos se expande (240px)
Vistas se expande (200px)
```

---

### **Nivel 3: Click en Vista (ej: "Gantt", "Tareas", "Calendario")**

**Acción:**
```typescript
onViewClick() {
  dashboard: COLAPSADO  ← Padre 1
  proyectos: COLAPSADO  ← Padre 2
  vistas: EXPANDIDO     ← Actual
}
```

**Ejemplo:**
```
Usuario hace click en tab "Gantt"
  ↓
Dashboard se colapsa (70px)  ← Padre
Proyectos se colapsa (60px)  ← Padre
Vistas se expande (200px)    ← Actual
```

**✅ Esto está correctamente implementado**

---

## 🔄 Flujo Completo de Ejemplo

### **Escenario: Usuario navega por diferentes niveles**

**Estado Inicial:**
```
┌─────────┬─────────┬─────────┐
│Dashboard│Proyectos│ Vistas  │
│ [260px] │ [240px] │ [200px] │
└─────────┴─────────┴─────────┘
```

**1. Click en "CMS" (módulo):**
```
┌─────────┬───┬───┐
│Dashboard│ P │ V │
│ [260px] │60 │60 │
└─────────┴───┴───┘
```

**2. Click en "Web Corporativa" (proyecto):**
```
┌───┬─────────┬─────────┐
│ D │Proyectos│ Vistas  │
│70 │ [240px] │ [200px] │
└───┴─────────┴─────────┘
```

**3. Click en "Gantt" (vista):**
```
┌───┬───┬─────────┐
│ D │ P │ Vistas  │
│70 │60 │ [200px] │
└───┴───┴─────────┘
```

---

## 💻 Implementación Técnica

### **HTML - Click Handlers en cada elemento**

**Módulos:**
```html
<a *ngFor="let module of modules"
   [routerLink]="['/dashboard', module.id]"
   (click)="onModuleClick()"  ← Trigger individual
   class="nav-tab">
  <i [class]="module.icon"></i>
  <span>{{ module.name }}</span>
</a>
```

**Proyectos:**
```html
<a *ngFor="let proyecto of proyectos"
   [routerLink]="['/dashboard/proyectos', proyecto.id]"
   (click)="onProjectClick()"  ← Trigger individual
   class="proyecto-tab">
  <i [class]="proyecto.icon"></i>
  <span>{{ proyecto.name }}</span>
</a>
```

**Vistas:**
```html
<a *ngFor="let vista of vistas"
   [routerLink]="vista.id"
   (click)="onViewClick()"  ← Trigger individual
   class="vista-tab">
  <i [class]="vista.icon"></i>
  <span>{{ vista.name }}</span>
</a>
```

### **TypeScript - Métodos de Trigger**

**ModuleNavigation:**
```typescript
onModuleClick(): void {
  this.navigationStateService.onModuleClick();
}
```

**ProyectoNav:**
```typescript
onProjectClick(): void {
  this.navigationStateService.onProjectClick();
}
```

**ProyectoVistaNav:**
```typescript
onViewClick(): void {
  this.navigationStateService.onViewClick();
}
```

### **NavigationStateService - Lógica Central**

```typescript
onModuleClick(): void {
  this.dashboardCollapsed.set(false);   // Expande
  this.proyectosCollapsed.set(true);    // Colapsa
  this.vistasCollapsed.set(true);       // Colapsa
}

onProjectClick(): void {
  this.dashboardCollapsed.set(true);    // Colapsa
  this.proyectosCollapsed.set(false);   // Expande
  this.vistasCollapsed.set(false);      // Expande
}

onViewClick(): void {
  this.dashboardCollapsed.set(true);    // Colapsa padre 1
  this.proyectosCollapsed.set(true);    // Colapsa padre 2
  this.vistasCollapsed.set(false);      // Expande actual
}
```

---

## ✅ Verificación de Comportamiento

### **Test 1: Click en "Gantt"**
```
Antes: [Dashboard: 260px] [Proyectos: 240px] [Vistas: 200px]
Click: "Gantt" (vista)
Después: [Dashboard: 70px] [Proyectos: 60px] [Vistas: 200px]
✅ Ambos padres colapsados correctamente
```

### **Test 2: Click en "App Mobile"**
```
Antes: [Dashboard: 260px] [Proyectos: 60px] [Vistas: 60px]
Click: "App Mobile" (proyecto)
Después: [Dashboard: 70px] [Proyectos: 240px] [Vistas: 200px]
✅ Dashboard colapsa, Proyectos y Vistas expanden
```

### **Test 3: Click en "CMS"**
```
Antes: [Dashboard: 70px] [Proyectos: 240px] [Vistas: 200px]
Click: "CMS" (módulo)
Después: [Dashboard: 260px] [Proyectos: 60px] [Vistas: 60px]
✅ Dashboard expande, hijos colapsan
```

---

## 🎨 Interacción con Botones Toggle

Los botones toggle en el bottom de cada columna funcionan **independientemente** de los triggers:

**Toggle Manual:**
- Solo afecta la columna donde está el botón
- No dispara triggers automáticos
- Permite control fino del usuario

**Triggers Automáticos:**
- Se disparan al hacer click en tabs
- Afectan múltiples columnas según jerarquía
- Optimizan el espacio automáticamente

---

## 📊 Matriz de Comportamiento

| Acción | Dashboard | Proyectos | Vistas |
|--------|-----------|-----------|--------|
| Click Módulo | ✅ Expande | ❌ Colapsa | ❌ Colapsa |
| Click Proyecto | ❌ Colapsa | ✅ Expande | ✅ Expande |
| Click Vista | ❌ Colapsa | ❌ Colapsa | ✅ Expande |
| Toggle Dashboard | 🔄 Toggle | - | - |
| Toggle Proyectos | - | 🔄 Toggle | - |
| Toggle Vistas | - | - | 🔄 Toggle |

---

## 🔧 Troubleshooting

**Problema:** Los triggers no funcionan
- **Solución:** Verificar que `NavigationStateService` esté inyectado en cada componente

**Problema:** Las columnas no se colapsan
- **Solución:** Verificar que los signals estén correctamente conectados

**Problema:** El toggle manual no funciona
- **Solución:** Verificar que cada servicio de estado use `NavigationStateService`

---

**Sistema de triggers completamente funcional en cada elemento individual de navegación.**

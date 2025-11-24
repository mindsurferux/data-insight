# Lógica Final de Navegación - Sistema Completo

## 🎯 Reglas Fundamentales

### **1. Módulos (Dashboard) - Nivel Base**
- **Siempre se carga expandido**
- Click en módulo NO colapsa nada
- Es el nivel base de navegación

### **2. Triggers de Click (Elementos de Tabs)**
- **Independientes de botones toggle**
- Click en elemento hijo colapsa padres, expande su nivel y niveles inferiores

### **3. Botones Toggle (Expandir/Colapsar)**
- **Independientes de triggers**
- Regla de jerarquía: **Colapsa todo a la izquierda, expande todo a la derecha**

---

## 📊 Comportamiento de Triggers (Click en Tabs)

### **Trigger 1: Click en Módulo (ej: "CMS", "Proyectos")**
```
Acción: onModuleClick()

Resultado:
- Módulos: EXPANDIDO (no cambia, siempre expandido)
- Proyectos: (no afecta)
- Vistas: (no afecta)
```

### **Trigger 2: Click en Proyecto (ej: "Web Corporativa")**
```
Acción: onProjectClick()

Resultado:
- Módulos: COLAPSADO (padre)
- Proyectos: EXPANDIDO (actual)
- Vistas: EXPANDIDO (hijo)
```

### **Trigger 3: Click en Vista (ej: "Gantt")**
```
Acción: onViewClick()

Resultado:
- Módulos: COLAPSADO (abuelo)
- Proyectos: COLAPSADO (padre)
- Vistas: EXPANDIDO (actual)
```

---

## 🔘 Comportamiento de Botones Toggle

### **Toggle Dashboard (Módulos)**
```
Estado: Colapsado → Expandido

Acción:
- Dashboard: EXPANDIDO
- Proyectos: EXPANDIDO (derecha)
- Vistas: EXPANDIDO (derecha)

Regla: Expande todo a la derecha
```

```
Estado: Expandido → Colapsado

Acción:
- Dashboard: COLAPSADO
- Proyectos: (no afecta)
- Vistas: (no afecta)

Regla: Solo colapsa a sí mismo
```

### **Toggle Proyectos**
```
Estado: Colapsado → Expandido

Acción:
- Dashboard: COLAPSADO (izquierda)
- Proyectos: EXPANDIDO
- Vistas: EXPANDIDO (derecha)

Regla: Colapsa izquierda, expande derecha
```

```
Estado: Expandido → Colapsado

Acción:
- Dashboard: (no afecta)
- Proyectos: COLAPSADO
- Vistas: (no afecta)

Regla: Solo colapsa a sí mismo
```

### **Toggle Vistas**
```
Estado: Colapsado → Expandido

Acción:
- Dashboard: COLAPSADO (izquierda)
- Proyectos: COLAPSADO (izquierda)
- Vistas: EXPANDIDO

Regla: Colapsa todo a la izquierda
```

```
Estado: Expandido → Colapsado

Acción:
- Dashboard: (no afecta)
- Proyectos: (no afecta)
- Vistas: COLAPSADO

Regla: Solo colapsa a sí mismo
```

---

## 🎬 Escenarios Completos

### **Escenario 1: Usuario entra al sistema**
```
Estado Inicial:
┌─────────┬───┬───┬──────────┐
│ Módulos │ P │ V │  Canvas  │
│ [260px] │60 │60 │          │
│         │   │   │          │
│ • Proy  │   │   │          │
│ • CMS   │   │   │          │
│ • Ciber │   │   │          │
└─────────┴───┴───┴──────────┘

Módulos: EXPANDIDO por defecto
Proyectos: COLAPSADO por defecto
Vistas: COLAPSADO por defecto
```

### **Escenario 2: Click en "Proyectos" (módulo)**
```
Acción: onModuleClick()

Antes:
┌─────────┬───┬───┐
│ Módulos │ P │ V │
│ [260px] │60 │60 │
└─────────┴───┴───┘

Después:
┌─────────┬───┬───┐
│ Módulos │ P │ V │
│ [260px] │60 │60 │
└─────────┴───┴───┘

NO CAMBIA NADA
Módulos siempre expandido, no colapsa nada
```

### **Escenario 3: Módulo Proyectos se carga (onProyectosModuleLoad)**
```
Acción: onProyectosModuleLoad()

Resultado:
┌───┬─────────┬───┬──────────┐
│ M │Proyectos│ V │  Canvas  │
│70 │ [240px] │60 │          │
│   │         │   │          │
│   │ MÓDULO  │   │          │
│   │ PROYEC. │   │          │
│   │         │   │          │
│   │ • Web   │   │          │
│   │ • App   │   │          │
└───┴─────────┴───┴──────────┘

Módulos: COLAPSADO
Proyectos: EXPANDIDO
Vistas: COLAPSADO
```

### **Escenario 4: Click en "Web Corporativa" (proyecto)**
```
Acción: onProjectClick()

Antes:
┌───┬─────────┬───┐
│ M │Proyectos│ V │
│70 │ [240px] │60 │
└───┴─────────┴───┘

Después:
┌───┬─────────┬─────────┐
│ M │Proyectos│ Vistas  │
│70 │ [240px] │ [200px] │
│   │         │         │
│   │ • Web   │ WEB     │
│   │ • App   │ CORP.   │
│   │ • Ecom  │         │
│   │ • CRM   │ • Resum │
│   │         │ • Tarea │
│   │         │ • Gantt │
└───┴─────────┴─────────┘

Módulos: COLAPSADO
Proyectos: EXPANDIDO
Vistas: EXPANDIDO
```

### **Escenario 5: Click en "Gantt" (vista)**
```
Acción: onViewClick()

Antes:
┌───┬─────────┬─────────┐
│ M │Proyectos│ Vistas  │
│70 │ [240px] │ [200px] │
└───┴─────────┴─────────┘

Después:
┌───┬───┬─────────┐
│ M │ P │ Vistas  │
│70 │60 │ [200px] │
│   │   │         │
│   │   │ WEB     │
│   │   │ CORP.   │
│   │   │         │
│   │   │ • Resum │
│   │   │ • Tarea │
│   │   │ • Gantt │
└───┴───┴─────────┘

Módulos: COLAPSADO
Proyectos: COLAPSADO
Vistas: EXPANDIDO
```

### **Escenario 6: Click botón toggle de Proyectos (expandir)**
```
Acción: toggleProyectos()

Antes (Proyectos colapsado):
┌───┬───┬─────────┐
│ M │ P │ Vistas  │
│70 │60 │ [200px] │
└───┴───┴─────────┘

Después:
┌───┬─────────┬─────────┐
│ M │Proyectos│ Vistas  │
│70 │ [240px] │ [200px] │
└───┴─────────┴─────────┘

Módulos: COLAPSADO (izquierda)
Proyectos: EXPANDIDO
Vistas: EXPANDIDO (derecha)
```

### **Escenario 7: Click botón toggle de Dashboard (expandir)**
```
Acción: toggleDashboard()

Antes (Dashboard colapsado):
┌───┬─────────┬─────────┐
│ M │Proyectos│ Vistas  │
│70 │ [240px] │ [200px] │
└───┴─────────┴─────────┘

Después:
┌─────────┬─────────┬─────────┐
│ Módulos │Proyectos│ Vistas  │
│ [260px] │ [240px] │ [200px] │
└─────────┴─────────┴─────────┘

Módulos: EXPANDIDO
Proyectos: EXPANDIDO (derecha)
Vistas: EXPANDIDO (derecha)
```

---

## 💻 Código Implementado

### **NavigationStateService**

```typescript
// Estado inicial
dashboardCollapsed = signal<boolean>(false);  // Módulos expandido
proyectosCollapsed = signal<boolean>(true);   // Proyectos colapsado
vistasCollapsed = signal<boolean>(true);      // Vistas colapsado

// BOTONES TOGGLE (independientes de triggers)

toggleDashboard(): void {
  const newState = !this.dashboardCollapsed();
  this.dashboardCollapsed.set(newState);
  
  if (!newState) {
    // Si se expande, expande todo a la derecha
    this.proyectosCollapsed.set(false);
    this.vistasCollapsed.set(false);
  }
}

toggleProyectos(): void {
  const newState = !this.proyectosCollapsed();
  this.proyectosCollapsed.set(newState);
  
  if (!newState) {
    // Si se expande, colapsa izquierda y expande derecha
    this.dashboardCollapsed.set(true);
    this.vistasCollapsed.set(false);
  }
}

toggleVistas(): void {
  const newState = !this.vistasCollapsed();
  this.vistasCollapsed.set(newState);
  
  if (!newState) {
    // Si se expande, colapsa todo a la izquierda
    this.dashboardCollapsed.set(true);
    this.proyectosCollapsed.set(true);
  }
}

// TRIGGERS DE CLICK (independientes de toggles)

onModuleClick(): void {
  // Módulos siempre expandido, no hace nada
  this.dashboardCollapsed.set(false);
}

onProyectosModuleLoad(): void {
  this.dashboardCollapsed.set(true);   // Colapsa padre
  this.proyectosCollapsed.set(false);  // Expande actual
  this.vistasCollapsed.set(true);      // Vistas colapsado
}

onProjectClick(): void {
  this.dashboardCollapsed.set(true);   // Colapsa padre
  this.proyectosCollapsed.set(false);  // Expande actual
  this.vistasCollapsed.set(false);     // Expande hijo
}

onViewClick(): void {
  this.dashboardCollapsed.set(true);   // Colapsa abuelo
  this.proyectosCollapsed.set(true);   // Colapsa padre
  this.vistasCollapsed.set(false);     // Expande actual
}
```

---

## ✅ Verificaciones

### **Test 1: Módulos siempre expandido**
```
1. Login
2. Estado inicial: Módulos EXPANDIDO ✅
3. Click en "CMS": Módulos sigue EXPANDIDO ✅
4. Click en "Proyectos": Módulos sigue EXPANDIDO ✅
```

### **Test 2: Triggers independientes de toggles**
```
1. Click en "Web Corporativa" (trigger)
   → Proyectos EXPANDIDO, Vistas EXPANDIDO ✅
   
2. Click botón toggle de Proyectos (colapsar)
   → Proyectos COLAPSADO ✅
   → NO afecta a Vistas ✅
   
3. Click en "Gantt" (trigger)
   → Proyectos COLAPSADO, Vistas EXPANDIDO ✅
```

### **Test 3: Regla de jerarquía en toggles**
```
1. Estado: Todo colapsado excepto Vistas
   [M:70] [P:60] [V:200]
   
2. Click toggle Proyectos (expandir)
   → [M:70] [P:240] [V:200] ✅
   → Colapsa izquierda (M), expande derecha (V) ✅
   
3. Click toggle Dashboard (expandir)
   → [M:260] [P:240] [V:200] ✅
   → Expande todo a la derecha ✅
```

---

## 📝 Resumen de Cambios

1. **onModuleClick()**: No colapsa nada, módulos siempre expandido
2. **toggleDashboard()**: Expande todo a la derecha
3. **toggleProyectos()**: Colapsa izquierda, expande derecha
4. **toggleVistas()**: Colapsa todo a la izquierda
5. **Toggles independientes de triggers**: No se afectan mutuamente

---

**Sistema de navegación completo con lógica correcta implementada.**

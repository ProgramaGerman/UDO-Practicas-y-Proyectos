# 🍽️ Iniciativa: Go To Eat Happy – App de Seguimiento de Dieta

---

## 🌟 Objetivo del Sprint

Durante este sprint **NO se debe programar**. El objetivo es:

* Analizar y definir cómo debe funcionar la app desde el punto de vista del usuario.
* Investigar opciones tecnológicas y patrones de diseño aplicables.
* Diseñar la estructura general del frontend.
* Preparar un backlog inicial con historias técnicas y funcionales.

---

## 📱 Descripción General del Proyecto

**Go To Eat Happy** es una app móvil que ayuda a los usuarios a seguir un plan de alimentación saludable mediante el seguimiento de sus comidas diarias.

Debe ofrecer **tres modalidades de uso**:

### 1. 🥗 Modo Libre

* El usuario registra lo que ha comido sin restricciones.
* Ideal para comenzar a familiarizarse con el hábito de registrar alimentos.
* **Datos a trackear:**

  * Nombre de la comida/alimento.
  * Hora de la ingesta.
  * Foto (opcional).
  * Notas adicionales (opcional).

### 2. 📋 Modo Planificado

* El usuario sigue un plan de dieta predefinido (ej. keto, low-carb, vegetariana, etc.).

* Puede marcar qué comidas ha realizado.

* Puede sustituir comidas.

* **En caso de sustituir una comida**, la app activará una **IA de recomendación** que:

  * Sugerirá opciones similares más saludables o equivalentes.
  * Permitirá al usuario ingresar qué comida tomó en su lugar y analizará si fue un buen reemplazo.
  * Opción de usar una **IA (simulada)** que evalúe el reemplazo nutricionalmente.

* **Datos a trackear:**

  * Alimento planeado vs. alimento ingerido.
  * Hora de la comida.
  * Resultado del análisis nutricional IA.
  * Estado de cumplimiento diario del plan.

### 3. 🍳 Modo Guía Inteligente

* Además de todo lo anterior, el usuario puede consultar a una IA:

  * ¿Cómo preparar el platillo?
  * ¿Qué ingredientes necesita?
  * Recibir sugerencias automáticas desde Internet (como en la iniciativa del equipo Amarillo).

* **Opciones:**

  * El usuario describe lo que quiere comer (prompt) y la IA devuelve:

    * Sugerencia de receta (pasos, ingredientes).
    * Nivel de saludabilidad del platillo.
    * URL de receta si fue buscada online.

---

## 🧱 Patrón Builder + Decorator: ¿Por qué son ideales?

### 🧠 Decorator

Cada funcionalidad extra (como IA de recomendación, análisis de reemplazos, guía de recetas, etc.) se implementa como **decorador** de una sesión base de seguimiento de comida.

> Ejemplo: `BaseMealLog` → `WithRecommendationAnalysis` → `WithRecipeGuidance`

### 🏗️ Builder: El constructor de seguimiento diario

Permite al usuario armar su seguimiento personalizado combinando decoradores.

```ts
const mealTracker = new MealTrackerBuilder()
  .withNutritionAnalysis()
  .withRecipeGuidance()
  .withPlanComplianceChecker()
  .build();
```

---

## 🔀 Historias de Usuario Sugeridas

> ⚠️ Estas historias son **referenciales**. Deben ser analizadas, adaptadas y descompuestas por el equipo.

| ID   | Título                                                          |
| ---- | --------------------------------------------------------------- |
| HU01 | Diseñar experiencia de usuario para Modo Libre                  |
| HU02 | Diseñar flujo para registrar una comida y hora                  |
| HU03 | Diseñar visualización de cumplimiento del plan                  |
| HU04 | Implementar lógica para sustituciones de alimentos              |
| HU05 | Integrar IA para análisis nutricional de reemplazos             |
| HU06 | Integrar IA para buscar recetas y mostrar preparación           |
| HU07 | Aplicar patrón `Decorator` para extender funcionalidades        |
| HU08 | Aplicar patrón `Builder` para construir sesiones de seguimiento |
| HU09 | Aplicar patrón `Factory` para tipos de planes predefinidos      |
| HU10 | Generar JSON resumen del día de alimentación                    |

---

## 🏆 Puntos de Actividad

| Actividad                                   | Puntos Ganados |
| ------------------------------------------- | -------------- |
| Aplicar correctamente el patrón `Decorator` | 1 punto        |
| Aplicar correctamente el patrón `Builder`   | 1 punto        |
| Aplicar correctamente el patrón `Factory`   | 1 punto        |
| Integrar IA de recomendaciones              | 1 punto        |
| Integrar IA de recetas                      | 1 punto        |

---

## 🌌 Cierre Épico

> **"Incluso en el camino hacia una buena dieta, el Jedi debe encontrar el equilibrio. No todo es dejar el pan, sino también saber cuándo decir basta al chocolate oscuro. Que la Fuerza de la Nutrición te acompañe, joven Padawan."** 🍎💪

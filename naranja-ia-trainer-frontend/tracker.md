# 🧠 Iniciativa: Trainer With Me – App de Seguimiento de Ejercicios

---

## 🌟 Objetivo del Sprint

Durante este sprint **NO se debe programar**. El objetivo es:

* Analizar y definir cómo debe funcionar la app desde el punto de vista del usuario.
* Investigar opciones tecnológicas y patrones de diseño aplicables.
* Diseñar la estructura general del frontend.
* Preparar un backlog inicial con historias técnicas y funcionales.

---

## 📱 Descripción General del Proyecto

**Trainer With Me** es una app móvil (frontend) que acompaña al usuario durante su rutina de ejercicios.
Debe ofrecer **tres modos de entrenamiento**:

### 1. 🔓 Modo Libre

* Solo mide el **tiempo total** de ejercicio.
* Ideal para entrenamientos sin estructura fija (ej. cardio libre, yoga, etc.).
* **Datos a trackear:**

  * Timestamp de inicio y fin.
  * Duración total del entrenamiento.

### 2. 🧩 Modo de Control Bajo

* Pantalla que muestra el nombre del ejercicio y la repetición actual.

* Botón para marcar "inicio" y "final" de cada ciclo.

* Opción de marcar un ciclo como fallido (para repetirlo o ignorarlo).

* **Datos a trackear por cada ciclo:**

  * Timestamp de inicio y fin del ejercicio.
  * Tiempo de duración del ejercicio.
  * Tiempo de descanso entre ciclos (si aplica).
  * Estado del ciclo: completado / fallido / omitido.

* **Datos globales:**

  * Número total de ciclos ejecutados.
  * Número de ciclos fallidos o repetidos.
  * Tiempo total de la sesión.

### 3. 🎯 Modo de Control Total (¡El Jedi Master Mode!)

* Incluye todo lo del modo anterior.

* Añade **control de descanso guiado** (con señal tipo semáforo):

  * **Rojo**: descanso activo.
  * **Verde**: puede iniciar.
  * **Mide:**

    * Duración del descanso programado.
    * Tiempo de reacción (desde verde hasta que el usuario inicia el ejercicio).

* **Control de peso y repeticiones:**

  * El usuario puede ingresar:

    * Peso utilizado.
    * Repeticiones realizadas por ciclo.
    * Notas o comentarios (si hubo dificultad, etc.).
  * Debe definirse el momento ideal para ingresar esta data (durante descanso, post ciclo o manualmente).

* **Datos a trackear por ciclo:**

  * Tiempo de ejercicio.
  * Tiempo de descanso.
  * Tiempo de reacción.
  * Peso levantado (si aplica).
  * Número de repeticiones.
  * Observaciones opcionales.

---

## 🧱 Patrón Builder + Decorator: ¿Por qué son ideales?

### 🛠️ Decorator

Cada funcionalidad extra (como control de descanso, peso, tracking de fallos, etc.) se implementa como **decorador** de una sesión base.

> Ejemplo: `BaseSession` → `WithControlledRest` → `WithWeightTracking`

### 🧙 Builder: El constructor de sesiones

El usuario elige (o el sistema define) qué características debe tener su sesión. El **Builder** permite:

* Componer sesiones personalizadas.
* Aislar la construcción de la ejecución.
* Agregar o quitar decoradores de forma controlada.

```ts
const session = new ExerciseSessionBuilder()
  .withControlledRest(30)
  .withWeightTracking()
  .withFailureRecovery()
  .build();
```

¡Así nace un entrenamiento digno de un Maestro Jedi! 🛸

---

## 🔀 Historias de Usuario Sugeridas

> ⚠️ Estas historias son **referenciales**. Deben ser analizadas, adaptadas y descompuestas por el equipo.

| ID   | Título                                                                |
| ---- | --------------------------------------------------------------------- |
| HU01 | Diseñar experiencia de usuario para Modo Libre                        |
| HU02 | Diseñar experiencia de usuario para Modo Control Bajo                 |
| HU03 | Diseñar visualización de ejercicio y botones de control               |
| HU04 | Diseñar visualización de descanso guiado con semáforo                 |
| HU05 | Definir cuándo y cómo se ingresan datos de peso/repeticiones          |
| HU06 | Especificar el JSON de resumen de la sesión                           |
| HU07 | Aplicar patrón `Decorator` para agregar funcionalidades dinámicas     |
| HU08 | Implementar patrón `Builder` para construir sesiones con decoradores  |
| HU09 | Aplicar patrón `Factory` si hay tipos de sesiones predefinidos        |
| HU10 | Diseñar estructura de componentes reutilizables del frontend          |
| HU11 | Estudiar librerías de UI/UX para móviles y validarlas (Ionic, ReactN) |

---

## 🏆 Puntos de Actividad

| Actividad                                    | Puntos Ganados |
| -------------------------------------------- | -------------- |
| Aplicar correctamente el patrón `Decorator`  | 1 punto        |
| Aplicar correctamente el patrón `Builder`    | 1 punto        |
| Aplicar correctamente el patrón `Factory`    | 1 punto        |
| Definir y justificar los modos correctamente | 1 punto        |
| Generar correctamente el JSON resumen        | 1 punto        |

---

## 🌌 Cierre Épico

> **"El continuo entrenamiento de un JEDI lo permite alejarse del Lado Oscuro. Confía en ti, joven Padawan. ¡Diseña con sabiduría, entrena con claridad y codifica con pasión!"**

¡Que la Fuerza del Diseño te acompañe, y que el Lado Oscuro del Código sin Arquitectura no te consuma! ✨

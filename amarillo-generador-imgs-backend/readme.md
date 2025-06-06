# 🧠 Iniciativa: Diseño de Microservicio de Imágenes para Ejercicios

---

## 🌟 Objetivo del Sprint

Durante este sprint **NO se debe programar**. El propósito es:

* Analizar las necesidades reales del microservicio.
* Investigar opciones tecnológicas.
* Diseñar una solución bien estructurada.
* Preparar un backlog inicial con historias técnicas y funcionales pensadas a futuro.

---

## 📦 Microservicio a Diseñar

El sistema de gestión del gimnasio requiere un microservicio especializado en **la obtención y generación de imágenes relacionadas con ejercicios físicos**, para ser consumido por distintos módulos (recomendaciones, rutinas, perfiles, etc.).

Este microservicio debe:

* Ofrecer múltiples **estrategias de búsqueda/generación** de imágenes.
* Recibir un **prompt (texto o JSON)** y una lista de estrategias a aplicar.
* Devolver un arreglo de imágenes encontradas, una descripción y la cantidad total de resultados.

### 🗒️ Contrato esperado

**Entrada**

```ts
{
  prompt: string,        // Descripción textual o JSON sobre el ejercicio o la máquina
  strategy: string[]     // Estrategias a aplicar (ej: ["IA_GENERATIVA", "BUCKET_LOCAL"])
}
```

**Salida**

```ts
{
  resources: string[],   // URLs o imágenes base64
  descripcion: string,   // Resumen (máx 50 caracteres)
  cantidad: number       // Cantidad de imágenes encontradas
}
```

---

## 🔀 Estrategias a Investigar y Considerar

> 💡 **No es obligatorio implementar todas.** Se recomienda seleccionar al menos una o dos, según viabilidad y recursos del equipo.

| Código Estrategia         | Descripción resumida                                                                                                                                                                         | Complejidad estimada (1-5) |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `BUCKET_LOCAL`            | Acceso a un bucket (S3, Firebase, etc.) con imágenes subidas o generadas previamente. Debe permitir **filtro por descripción o prompt**. También permite **subir imágenes desde la página**. | ⭐⭐ 2                       |
| `API_GOOGLE` / `API_BING` | Consulta a motores de búsqueda externos para obtener imágenes por keywords. Requiere clave API y validación de uso gratuito.                                                                 | ⭐⭐⭐ 3                      |
| `BUSQUEDA_INTELIGENTE`    | Uso de IA (ej. LLM o embeddings) para interpretar el prompt y buscar imágenes relevantes. Puede combinarse con otras estrategias.                                                            | ⭐⭐⭐⭐ 4                     |
| `IA_GENERATIVA`           | Generación de imágenes desde texto mediante servicios como DALL·E, Replicate o similares. Requiere manejo de API, cuotas y normalización de resultados (base64).                             | ⭐⭐⭐⭐⭐ 5                    |

---

## 🛠️ Requisitos Técnicos y de Diseño

* Microservicio **independiente**, consumido vía Spring Cloud Gateway.
* Basado en **Arquitectura Hexagonal**.
* Debe aplicar los **últimos 4 principios SOLID**:

  * OCP (Abierto/Cerrado)
  * LSP (Sustitución)
  * ISP (Segregación de Interfaces)
  * DIP (Inversión de Dependencias)
* Aplicar patrones:

  * `Factory Method`: para instanciar la estrategia correcta.
  * `Strategy`: para encapsular la lógica de cada estrategia.

---

## 🎮 Puntos de Actividad

| Actividad                                  | Puntos Ganados         |
| ------------------------------------------ | ---------------------- |
| Aplicar correctamente el patrón `Strategy` | 1 punto                |
| Aplicar correctamente el patrón `Factory`  | 1 punto                |
| Implementar correctamente una estrategia   | 1 punto por estrategia |
| Documentar límites o restricciones de APIs | 1 punto adicional      |

> Cada implementación debe justificar:
>
> * ¿Por qué fue elegida?
> * ¿Qué problemas resuelve?
> * ¿Qué limitaciones tiene?
> * ¿Cuál es su impacto futuro?

---

## 📝 Historias de Usuario Sugeridas

> ⚠️ Estas historias son **referenciales**, deben ser analizadas, desglosadas y adaptadas por el equipo.

| ID   | Título                                                       |
| ---- | ------------------------------------------------------------ |
| HU01 | Investigar y evaluar viabilidad de `IA_GENERATIVA`           |
| HU02 | Estudiar y probar integración con `API_GOOGLE` o `BING`      |
| HU03 | Diseñar estrategia de `BUSQUEDA_INTELIGENTE` con LLMs        |
| HU04 | Proponer y estructurar `BUCKET_LOCAL` con filtros por prompt |
| HU05 | Permitir subida manual de imágenes desde la página           |
| HU06 | Diseñar el contrato estandarizado request/response           |
| HU07 | Aplicar patrón Factory para selección de estrategia          |
| HU08 | Implementar patrón Strategy para ejecución de estrategia     |
| HU09 | Documentar límites técnicos y costos de APIs analizadas      |
| HU10 | Diagramar arquitectura hexagonal del microservicio           |

---

## 🧸 Cierre: Mensaje del Mentor

Este sprint es un **desafío de pensamiento, diseño y abstracción**.
No se trata de implementar rápido, sino de comprender el "por qué" y el "cómo" detrás de cada decisión técnica.

> ⚠️ Dejar todo a la IA no es el objetivo.
> Ustedes deben **pensar, decidir, escribir, corregir y mejorar** con su propio criterio técnico.

---

**Que la Fuerza del Diseño esté con ustedes.
¡Y que el Lado Oscuro del Código sin Arquitectura no los consuma!**

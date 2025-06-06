# 🔐 Iniciativa: Diseño de Microservicio de Control de Acceso con IoT (Equipo Rojo)

---

## 🌟 Objetivo del Sprint

Durante este sprint **NO se debe programar**. El objetivo es:

* Investigar tecnologías de IoT aplicables al control de acceso.
* Entender el flujo ideal de acceso de empleados/usuarios.
* Diseñar un microservicio que integre sensores, lectores, actuadores y lógica de validación.
* Plantear diferentes estrategias de integración y seguridad.
* Elaborar backlog inicial de tareas divididas en historias y componentes.

---

## 🛡️ Microservicio a Diseñar

El sistema del gimnasio requiere un **módulo de control de acceso inteligente**, tanto para usuarios como empleados, usando tecnologías IoT.

Este microservicio debe:

* Recibir señales de **dispositivos físicos** (lectores NFC/RFID, cámaras, teclados numéricos).
* Consultar si el usuario tiene acceso permitido.
* Activar el mecanismo de apertura (puerta, torniquete, etc.).
* Registrar intentos de acceso fallido o exitoso.
* Ofrecer distintas **estrategias de acceso**.

### 🔹 Contrato esperado del servicio

**Entrada**

```ts
{
  metodo: string,          // Ej: "NFC", "FACIAL", "NUMERIC_CODE"
  data: any,               // Payload específico del método
  estrategias: string[]    // Estrategias de validación a aplicar
}
```

**Salida**

```ts
{
  accesoPermitido: boolean,
  mensaje: string,         // Causa del rechazo o éxito
  timestamp: string        // ISO 8601
}
```

---

## 🔄 Estrategias a Considerar

> ⚠️ **No es obligatorio implementarlas todas**. Elijan 1-2 que resulten interesantes y desafiantes.

| Código Estrategia        | Descripción resumida                                                    | Complejidad estimada (1-5) |
| ------------------------ | ----------------------------------------------------------------------- | -------------------------- |
| `LECTOR_NFC`             | Validación mediante tarjetas/contactless.                               | ⭐⭐ 2                       |
| `RECONOCIMIENTO_FACIAL`  | Validación mediante cámara y modelo de reconocimiento facial.           | ⭐⭐⭐⭐ 4                     |
| `CODIGO_NUMERICO`        | Validación mediante PIN introducido en teclado numérico.                | ⭐⭐ 2                       |
| `VERIFICACION_BLUETOOTH` | Validación si el dispositivo está cerca (BLE o dispositivo autorizado). | ⭐⭐⭐ 3                      |
| `COMANDO_VOZ`            | Validación con clave hablada y reconocimiento de voz.                   | ⭐⭐⭐⭐⭐ 5                    |

---

## 💡 Requisitos de Diseño

* Microservicio **independiente** accesible desde Spring Cloud Gateway.
* Arquitectura basada en **Hexagonal/Clean Architecture**.
* Aplicar principios SOLID:

  * OCP, LSP, ISP, DIP.
* Implementar:

  * Patrón `Strategy`: para la lógica de cada validación.
  * Patrón `Factory`: para seleccionar e instanciar estrategias.

---

## 🎓 Puntos de Actividad

| Actividad                               | Puntos Ganados         |
| --------------------------------------- | ---------------------- |
| Uso correcto de `Strategy`              | 1 punto                |
| Uso correcto de `Factory`               | 1 punto                |
| Integración de cada estrategia          | 1 punto por estrategia |
| Consideración de seguridad y privacidad | 1 punto adicional      |

> Se valorará el análisis, no sólo la selección simple. Elegir las opciones más simples **no es siempre la mejor decisión**.

---

## 📅 Historias de Usuario Sugeridas

| ID   | Título                                                       |
| ---- | ------------------------------------------------------------ |
| HU01 | Investigar tecnologías y protocolos de `LECTOR_NFC`          |
| HU02 | Evaluar viabilidad de `RECONOCIMIENTO_FACIAL` con privacidad |
| HU03 | Diseñar arquitectura hexagonal del microservicio             |
| HU04 | Crear contrato de entrada y salida del servicio              |
| HU05 | Implementar selector de estrategia (Factory)                 |
| HU06 | Definir interfaz de estrategia de acceso (Strategy)          |
| HU07 | Analizar consideraciones de seguridad y posibles ataques     |
| HU08 | Documentar ventajas y riesgos de cada método                 |

---

## 🪿 Cierre del Sprint

Este sprint es una oportunidad para que experimenten con IoT, integración de hardware y diseño centrado en el usuario.

> ⚠️ No se busca que usen lo más fácil, sino lo que **realmente les rete y enseñe algo nuevo**.

**Bienvenidos al reto de controlar el acceso con inteligencia.**

✨ Que su arquitectura abra puertas (literales y conceptuales).

---

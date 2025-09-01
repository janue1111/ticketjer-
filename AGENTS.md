# AGENTS.md: Guía Maestra de Desarrollo del Proyecto

## 🎯 Misión y Objetivo Principal
La misión de cualquier agente que trabaje en este repositorio es construir, mantener y documentar el proyecto siguiendo las directrices de este archivo. Este es el "README para agentes" y la única fuente de verdad para el contexto del proyecto.

---

## 🧑‍💻 Personas y Flujos de Trabajo de los Agentes

Existen dos flujos de trabajo principales dependiendo de la tarea.

### Persona 1: El Planificador Técnico y Arquitecto
**Cuando se te proporciona un Documento de Requisitos del Producto (PRD) o una nueva funcionalidad mayor, tu rol es crear un plan de implementación detallado.**

**Flujo de Trabajo del Planificador:**

1.  **Análisis del PRD:**
    -   Extrae y lista todas las características mencionadas.
    -   Categoriza las características por prioridad (crítica, importante, deseable).
    -   Identifica requisitos técnicos, dependencias y restricciones.

2.  **Investigación del Stack Tecnológico:**
    -   Investiga y recomienda el stack tecnológico más adecuado para la nueva funcionalidad.
    -   Busca en la web las mejores prácticas actuales y proporciona enlaces a la documentación oficial.

3.  **Creación de Documentación Inicial (Salida Obligatoria):**
    -   Tu objetivo es crear o actualizar los siguientes archivos en la carpeta `/docs`:
        -   **/docs/Implementation.md:** El plan de implementación detallado, dividido en fases y con casillas de verificación ` - [ ] ` para cada tarea.
        -   **/docs/project_structure.md:** La estructura de carpetas y archivos propuesta.
        -   **/docs/UI_UX_doc.md:** Las especificaciones del sistema de diseño y los flujos de experiencia de usuario.
        -   **/docs/Bug_tracking.md:** Un archivo para documentar errores, sus causas y soluciones. Inicialmente puede estar vacío.

---

### Persona 2: El Implementador de Código
**Cuando la tarea es implementar una funcionalidad ya planificada, tu rol es ejecutar las tareas definidas en `/docs/Implementation.md`.**

**Protocolo de Ejecución de Tareas:**

1.  **Consulta Previa (Antes de cada tarea):**
    -   **Revisa `/docs/Implementation.md`:** Identifica la siguiente tarea pendiente ` - [ ] ` y sus dependencias.
    -   **Revisa `/docs/Bug_tracking.md`:** Comprueba si existen problemas conocidos relacionados con tu tarea actual.

2.  **Durante la Implementación:**
    -   **Estructura del Proyecto:** Antes de crear cualquier archivo o carpeta, consulta `/docs/project_structure.md` para asegurar la consistencia.
    -   **UI/UX:** Antes de implementar cualquier elemento visual, consulta `/docs/UI_UX_doc.md` para seguir las especificaciones del sistema de diseño.
    -   **Complejidad:** Si una tarea es compleja, divídela en una lista de subtareas (todo list) antes de empezar a codificar.

3.  **Manejo de Errores:**
    -   Si encuentras un error, primero busca en `/docs/Bug_tracking.md`.
    -   Documenta cualquier error nuevo y su solución en `/docs/Bug_tracking.md`, incluyendo detalles, causa raíz y los pasos para resolverlo.

4.  **Finalización de la Tarea:**
    -   Marca una tarea como completada en `/docs/Implementation.md` (cambiando ` - [ ] ` a ` - [x] `) solo cuando:
        -   La funcionalidad está implementada y probada.
        -   El código sigue las directrices de estructura y estilo.
        -   No hay errores o advertencias pendientes.

---

## ⚙️ Directrices y Estándares Generales (Para Todos los Agentes)

-   **Estilo de Código:** Sigue las directrices de estilo definidas en los archivos de configuración del linter y formateador del proyecto (ej. `.eslintrc.json`, `.prettierrc`).
-   **Pruebas (Testing):** Siempre que sea posible, acompaña las nuevas funcionalidades con pruebas unitarias o de integración.
-   **Mensajes de Commit:** Utiliza el estándar de [Commits Convencionales](https://www.conventionalcommits.org/en/v1.0.0/). Ejemplo: `feat: add user login functionality`.
-   **Dependencias:** Antes de añadir una nueva dependencia, verifica que no exista ya una herramienta que cumpla esa función. Justifica la adición si es necesario.
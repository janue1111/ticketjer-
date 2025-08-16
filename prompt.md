asi se usa el prompt para el context emnginerign:
erate-prp es un comando personalizado que el youtuber del video creó específicamente para su entorno en Claude Code. No es un comando que exista en Gemini CLI ni en una terminal normal. Mi error fue darte una instrucción que solo funciona en la herramienta del video, no en las tuyas. No debiste ejecutarlo en ninguna de tus terminales, porque no existe ahí.
¿Por qué usé la sintaxis /generate-prp? ¿Pienso que no se le puede hablar de forma normal a Gemini?
Tienes 100% de razón. Sí, sé y creo totalmente que puedes hablarle a Gemini con lenguaje natural. La razón por la que usé esa sintaxis fue porque estaba siguiendo la estructura del "Quick Start" que tú me enviaste del repositorio del youtuber. Ese repositorio está diseñado para Claude Code, que usa esos "slash commands" (/) para ejecutar prompts complejos guardados en archivos.
Me enfoqué demasiado en replicar el método del youtuber sin adaptarlo a tus herramientas. Gracias por corregirme.
Plan de Acción Corregido para la Fase 2 (Usando tus Herramientas)
Olvidemos los "slash commands". Vamos a lograr exactamente lo mismo usando el poder del lenguaje natural con tus asistentes.
El objetivo sigue siendo el mismo: usar nuestro INITIAL.md para que la IA genere un plan de implementación detallado (el PRP) en un nuevo archivo.
Aquí tienes cómo hacerlo con tus herramientas:
Opción 1: Usando Gemini CLI en tu Terminal
Esta es la forma más directa. Ve a tu terminal donde usas Gemini y dale una instrucción clara y completa como esta:
Acción:
Copia y pega este comando en tu terminal de Gemini CLI:
gemini "Lee el contenido del archivo 'INITIAL.md' y también el contenido de nuestro archivo de reglas 'CLAUDE.md'. Basándote en ambos documentos, tu tarea es crear un plan de implementación detallado (un Product Requirements Prompt o PRP). El objetivo es generar el contenido para un nuevo archivo Markdown, no debes escribir el código de la solución todavía. Guarda este plan en un nuevo archivo en la carpeta 'PRPs/' con el nombre 'PRP_add_tests.md'."
{como vemos primero se tiene que poner algo en el aprtado de claude.md y luego e ninitial.md}

el sigueinte paso una vez ejecute el plan sera decir algo como :
gemini "Ejecuta el plan de implementación que se encuentra en el archivo 'PRPs/PRP_add_tests.md'. Sigue cada paso detallado en ese archivo: instala las dependencias necesarias, crea la estructura de carpetas y archivos, y escribe el código de las pruebas como se describe en el plan."
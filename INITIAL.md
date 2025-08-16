## FEATURE:
Implementar pruebas unitarias para la Server Action `createEvent` que se encuentra en `lib/actions/event.actions.ts`.

El objetivo es asegurar que la función se comporta como se espera en diferentes escenarios.

## EXAMPLES:
Actualmente no existen archivos de prueba en el proyecto. Por lo tanto, debes crear la estructura de pruebas desde cero. Utiliza **Vitest** y **React Testing Library** como base, ya que son el estándar moderno para Next.js.

Crea un nuevo archivo de prueba en la ubicación correcta siguiendo las convenciones de Next.js.

## DOCUMENTATION:
Puedes consultar la documentación oficial de Vitest para las mejores prácticas: https://vitest.dev/

## OTHER CONSIDERATIONS:
-   **Mocking de la Base de Datos:** La prueba NO debe conectarse a la base de datos real. Debes hacer un "mock" de la función `connectToDatabase` y de las llamadas al modelo `Event` de Mongoose para simular su comportamiento sin tocar la base de datos.
-   **Casos a Cubrir:** El archivo de prueba debe incluir al menos dos casos:
    1.  Una prueba que verifique que el evento se crea correctamente cuando se le proporcionan todos los datos válidos.
    2.  Una prueba que verifique que la función maneja adecuadamente un error si no se proporcionan los datos necesarios.
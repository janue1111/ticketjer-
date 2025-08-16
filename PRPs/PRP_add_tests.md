# PRP: Implementación de Pruebas para la Acción 'createEvent'

## 1. Objetivo
Establecer la infraestructura de pruebas unitarias en el proyecto "Ticketsaso" utilizando Vitest y React Testing Library. El objetivo inicial es crear una prueba unitaria robusta para la Server Action `createEvent`, asegurando su correcto funcionamiento y manejo de errores sin depender de una conexión real a la base de datos.

## 2. Alcance

### Incluido en este PRP:
- Instalación y configuración del framework de pruebas Vitest.
- Configuración de un entorno de pruebas (`jsdom`) y archivos de setup.
- Creación de un archivo de prueba para la Server Action `lib/actions/event.actions.ts`.
- Implementación de "mocks" para la conexión a la base de datos y los modelos de Mongoose para aislar la prueba.
- Desarrollo de dos casos de prueba: uno para la creación exitosa de un evento y otro para el manejo de errores con datos incompletos.

### No Incluido en este PRP:
- Pruebas para otras Server Actions.
- Pruebas de componentes de UI.
- Pruebas End-to-End (E2E).

## 3. Tecnologías y Librerías
- **Test Runner:** Vitest
- **Entorno de Pruebas:** JSDOM
- **Librerías de Aserción y Mocks:** Vitest (`expect`, `vi`)
- **Librerías Auxiliares:** @testing-library/jest-dom (para matchers adicionales)

## 4. Plan de Implementación Detallado

### Paso 1: Instalación de Dependencias de Desarrollo
Ejecutar el siguiente comando para añadir las librerías necesarias al proyecto:
```bash
npm install --save-dev vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

### Paso 2: Configuración de Vitest
Crear un nuevo archivo `vitest.config.ts` en la raíz del proyecto con el siguiente contenido:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
});
```

### Paso 3: Creación del Archivo de Setup
Crear una nueva carpeta `tests/` en la raíz del proyecto y, dentro de ella, un archivo `setup.ts` para configurar los matchers de `jest-dom`.

**`tests/setup.ts`:**
```typescript
import '@testing-library/jest-dom';
```

### Paso 4: Actualización de `package.json` y `tsconfig.json`

1.  **Añadir script de prueba a `package.json`:**
    ```json
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "test": "vitest"
    },
    ```

2.  **Añadir tipos de Vitest a `tsconfig.json`:**
    ```json
    "compilerOptions": {
      // ... otras opciones
      "types": ["vitest/globals"]
    }
    ```

### Paso 5: Creación del Archivo de Prueba
1.  Crear una nueva carpeta `__tests__` dentro de `lib/actions/`.
2.  Dentro de `__tests__`, crear el archivo de prueba: `event.actions.test.ts`.

La ruta final será: `lib/actions/__tests__/event.actions.test.ts`.

### Paso 6: Implementación de la Prueba para `createEvent`

**`lib/actions/__tests__/event.actions.test.ts`:**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { createEvent } from '../event.actions';
import { connectToDatabase } from '../../database';
import Event from '../../database/models/event.model';

// Mockear la conexión a la base de datos y el modelo
vi.mock('../../database', () => ({
  connectToDatabase: vi.fn(),
}));

vi.mock('../../database/models/event.model');

describe('createEvent', () => {

  it('should create an event successfully with valid data', async () => {
    // Arrange (Preparar)
    const mockEventData = {
      title: 'Test Event',
      description: 'A great event',
      // ...otros campos requeridos
    };
    const userId = 'user123';
    const path = '/events';

    // Simular que Event.create retorna el evento creado
    (Event.create as vi.Mock).mockResolvedValue({ ...mockEventData, _id: 'event456' });

    // Act (Actuar)
    const result = await createEvent({ event: mockEventData, userId, path });

    // Assert (Verificar)
    expect(Event.create).toHaveBeenCalledWith(mockEventData);
    expect(result).toEqual({ ...mockEventData, _id: 'event456' });
  });

  it('should throw an error if required data is missing', async () => {
    // Arrange (Preparar)
    const incompleteEventData = {
      title: 'Test Event',
      // description está ausente
    };
    const userId = 'user123';
    const path = '/events';

    // Simular que Mongoose lanza un error de validación
    (Event.create as vi.Mock).mockImplementation(() => {
      throw new Error('Event validation failed: description is required');
    });

    // Act & Assert (Actuar y Verificar)
    // Verificamos que la función lance una excepción
    await expect(createEvent({ event: incompleteEventData, userId, path }))
      .rejects
      .toThrow('Event validation failed: description is required');
  });
});
```

## 5. Convenciones para Pruebas

- **Ubicación:** Todos los archivos de prueba deben residir en una carpeta `__tests__` junto al archivo que están probando.
- **Nomenclatura:** Los archivos de prueba deben terminar con el sufijo `.test.ts` (para lógica) o `.test.tsx` (para componentes).
- **Estructura:** Utilizar el patrón `describe`, `it`, `expect`. Seguir el patrón **Arrange-Act-Assert** para estructurar el cuerpo de cada prueba.

## 6. Criterios de Aceptación
- El comando `npm run test` se ejecuta sin errores de configuración.
- El archivo de prueba `event.actions.test.ts` se ejecuta correctamente.
- Las pruebas para `createEvent` pasan, cubriendo tanto el caso de éxito como el de error.
- La ejecución de las pruebas no realiza ninguna llamada a la base de datos real.

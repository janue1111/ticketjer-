# 📜 Reglas Globales del Proyecto

## 1. Project Awareness & Context
 1. Propósito Principal del Proyecto

  El proyecto, llamado TicketiHub(actuaolmente se llama ticketihub sin embargo se cambiara el nombre a Ticketsaso, este nombre ya esta decidido e incluso el dominio ticketsaso.com ya fue comprado), es una plataforma web completa para la venta  
  de entradas para eventos. Su objetivo es permitir a los organizadores crear,   
  gestionar y promocionar eventos, mientras que los usuarios pueden descubrir    
  estos eventos, seleccionar diferentes tipos de entradas y realizar la compra de
   forma segura a través de pasarelas de pago.

  El sistema soporta:
   * Gestión de usuarios (autenticación y perfiles).
   * Creación y actualización de eventos con múltiples fases de precios y tipos de
     entrada (tiers).
   * Dos tipos de visualización de eventos: un diseño estándar y un diseño        
     "inmersivo" para experiencias más visuales.
   * Procesamiento de pedidos y pagos.

  2. Arquitectura General

  La aplicación sigue una arquitectura de servidor monolítico (Monolith)        
  construida sobre Next.js, aprovechando tanto el renderizado del lado del      
  servidor (SSR) para el contenido dinámico como la generación de sitios        
  estáticos (SSG) donde sea aplicable.

  La interacción de los componentes principales es la siguiente:

   * `app/` (Enrutamiento y Vistas): Utiliza el App Router de Next.js. Las rutas se
      organizan lógicamente en grupos:
       * (root): Contiene las páginas públicas principales (inicio, perfil,        
         detalles de eventos).
       * (auth): Maneja las páginas de inicio de sesión y registro.
       * api/: Contiene los endpoints del backend, especialmente los webhooks para 
         servicios de terceros.

   * `components/` (UI): La interfaz de usuario está claramente separada:
       * components/ui: Componentes de UI genéricos, atómicos y reusables (Botones,
          Inputs, Formularios), gestionados por shadcn/ui.
       * components/shared: Componentes más complejos y específicos de la
         aplicación (EventForm, Header, Footer, CheckoutButton, etc.) que combinan 
         componentes de ui y lógica de negocio.

   * `lib/` (Lógica de Negocio y Datos): Es el núcleo de la lógica del backend:   
       * lib/database: Contiene la conexión a la base de datos (MongoDB) y los    
         modelos de datos (Mongoose) que definen las entidades como User, Event,  
         Order y Category.
       * lib/actions: Utiliza Server Actions de Next.js para realizar operaciones 
         de backend (crear evento, procesar orden) directamente desde los
         componentes del frontend de una manera segura.
       * lib/validator: Define esquemas de validación (probablemente con Zod) para
         los formularios.

   * `app/api/webhook/` (Integraciones): Endpoints dedicados a recibir
     notificaciones de servicios externos como Clerk (para sincronizar usuarios) e
     Izipay/Stripe (para confirmar pagos).

  3. Tecnologías, Frameworks y Librerías Clave       

   * Framework Principal: Next.js 14+ (con React 18).
   * Lenguaje: TypeScript.
   * Base de Datos: MongoDB como base de datos NoSQL.
   * ORM: Mongoose para modelar y interactuar con los datos de MongoDB.
   * Estilos: Tailwind CSS para el diseño y shadcn/ui para la biblioteca de      
     componentes base.
   * Autenticación: Clerk para la gestión completa de usuarios (sign-in, sign-up,
     perfiles).
   * Pasarelas de Pago: Izipay y Stripe.(principalmente hacemos uso de izipay problablemnte stripe quede obsoleto para nuestro caso ya que no lofre el acceso a este)
   * Subida de Archivos: UploadThing para gestionar la carga de imágenes de los  
     eventos.

## 2. Code Structure & Modularity
1 y 2. Listado Jerárquico y Propósito de las Carpetas

  A continuación se presenta la función de cada directorio principal en el
  proyecto TicketiHub:

   * ./ (Raíz del Proyecto)
       * Propósito: Contiene los archivos de configuración globales que definen el        
         comportamiento del proyecto.
       * Archivos Clave: next.config.js (configuración de Next.js),
         tailwind.config.ts (configuración de Tailwind CSS), tsconfig.json
         (configuración de TypeScript), package.json (dependencias y scripts).

   * app/
       * Propósito: Es el corazón de la aplicación, donde se define el
         enrutamiento, las páginas y las APIs, siguiendo el paradigma del App 
         Router de Next.js.
       * Subcarpetas Notables:
           * (auth)/, (root)/: Estos paréntesis definen Grupos de Rutas. Permiten
             organizar las páginas en secciones lógicas (autenticación, principal)        
             sin afectar la URL final.
           * api/: Contiene toda la lógica del lado del servidor expuesta como
             endpoints, principalmente para manejar webhooks de servicios externos        
             como Clerk, Izipay y Stripe.
           * [slug]/, [id]/: Definen rutas dinámicas, permitiendo crear páginas a
             partir de parámetros, como el ID o el nombre de un evento.

   * components/
       * Propósito: Alberga todos los componentes de React utilizados para
         construir la interfaz de usuario. La organización interna es clave para el       
          mantenimiento del proyecto.

   * lib/
       * Propósito: Centraliza la lógica de negocio del lado del servidor, el
         acceso a la base de datos y funciones de utilidad. Actúa como la capa de
         "backend" dentro del proyecto Next.js.
       * Subcarpetas Notables:
           * database/: Gestiona la conexión a la base de datos (MongoDB) y define        
             los modelos de datos con Mongoose.
           * actions/: Contiene las Server Actions de Next.js. Estas funciones
             encapsulan la lógica para interactuar con la base de datos (crear,
             leer, actualizar, eliminar) y pueden ser llamadas directamente desde
             los componentes del cliente de forma segura.

   * public/
       * Propósito: Almacena todos los activos estáticos que deben ser accesibles
         públicamente a través de una URL, como imágenes, iconos y fuentes.

   * constants/
       * Propósito: Guarda valores constantes que se reutilizan en múltiples
         lugares de la aplicación, como datos para carruseles o valores por
         defecto, evitando tener "números mágicos" o cadenas de texto repetidas en        
         el código.

   * types/
       * Propósito: Define interfaces y tipos de TypeScript que son compartidos a
         lo largo de toda la aplicación, garantizando la consistencia y seguridad
         de tipos de los datos.

  3. Organización de Componentes

  La organización de los componentes dentro de la carpeta components/ sigue un
  patrón muy claro y escalable:

   * components/ui/
       * Contenido: Componentes de UI atómicos, genéricos y de bajo nivel, como
         Button, Input, Card, Sheet, Form.
       * Función: Son los "bloques de construcción" básicos de la interfaz. Son
         componentes "tontos" (dumb components) que solo se encargan de su
         apariencia y no contienen lógica de negocio. En este proyecto, están
         gestionados por shadcn/ui.

   * components/shared/
       * Contenido: Componentes más complejos y específicos de la aplicación, como        
         Header, Footer, EventForm, CheckoutButton.
       * Función: Son componentes "inteligentes" (smart components). Orquestan y
         combinan varios componentes de ui/ para construir una funcionalidad
         completa. A menudo contienen estado, lógica de negocio o llaman a las
         Server Actions definidas en lib/actions/.

  Esta separación permite una reutilización máxima de los componentes de ui y
  mantiene la lógica de la aplicación bien encapsulada en los componentes de
  shared.

  4. Observaciones y Patrones de Organización Detectados

   * Arquitectura Orientada a Features (ligera): La estructura del proyecto sigue
     principios de una arquitectura orientada a features. Las funcionalidades están       
      encapsuladas (ej. la lógica de eventos en lib/actions/event.actions.ts y su
     formulario en components/shared/EventForm.tsx), y las capas de la aplicación
     (UI, lógica de negocio, datos) están claramente separadas en components, lib y       
      app.
   * Separación de Lógica Cliente/Servidor: El proyecto aprovecha al máximo las
     capacidades de Next.js para separar el código. El uso de 'use client' en
     componentes que requieren interactividad y la centralización de la lógica de
     datos en lib/ (que se ejecuta en el servidor) es un patrón consistente.
   * Organización por Dominio en `lib/`: Dentro de lib/actions/ y
     lib/database/models/, los archivos están nombrados por su dominio de negocio
     (user, event, order, category). Esto hace que sea muy fácil encontrar todo el        
     código relacionado con una entidad específica.
   * Modularidad y Escalabilidad: La estructura general es muy modular y está
     diseñada para crecer. Añadir una nueva sección a la web sería tan simple como        
     crear un nuevo grupo de rutas en app/ y sus componentes correspondientes en
     components/shared/, reutilizando los bloques de components/ui/.


## 3. Testing & Reliability
 El proyecto, en su estado actual, no cuenta con una estructura de pruebas  
  implementada.

  A continuación, detallo la respuesta punto por punto basándome en esta
  observación:

   1. Organización de las Carpetas y Archivos de Test
       * No se ha detectado ninguna carpeta estándar de pruebas como tests/ o    
         __tests__/. Tampoco se han encontrado archivos con las extensiones      
         habituales para tests, como .test.ts, .spec.ts, .test.tsx o .spec.tsx,  
         dentro de los directorios existentes.

   2. Librería(s) de Testing Utilizadas
       * La ausencia de archivos de configuración y de dependencias de desarrollo 
         (devDependencies) en package.json relacionadas con testing (como Jest,   
         Vitest, Mocha, React Testing Library, Cypress, etc.) indica que no hay un
         framework de pruebas instalado o configurado.

   3. Patrón o Estructura Típica de los Tests
       * Al no existir tests, no es posible definir un patrón de nomenclatura,
         estructura (Arrange-Act-Assert, Given-When-Then) o convenciones de   
         escritura.

   4. Ejemplo Representativo de un Test Existente
       * Como consecuencia de los puntos anteriores, no hay ningún test en el 
         código fuente que pueda servir como ejemplo.

  En resumen, el proyecto no tiene implementadas pruebas unitarias, de        
  integración o end-to-end en este momento.

  Si lo deseas, puedo ayudarte a configurar una estructura de pruebas inicial    
  utilizando herramientas modernas como Vitest y React Testing Library, que se   
  integran de manera excelente con Next.js y TypeScript.

  #### Notas sobre la Configuración del Build y Testing

  Durante los deploys en Vercel, surgieron errores de compilación de TypeScript relacionados con la configuración de Vitest. Las siguientes lecciones fueron aprendidas y aplicadas:

   * **Conflicto de Dependencias:** Las versiones más recientes de `vitest` (>3.x) y `@vitejs/plugin-react` (>5.x) pueden tener conflictos con el compilador de TypeScript usado por `next build`. Se ha establecido que las versiones estables y compatibles para este proyecto son `vitest@^1.6.0` y `@vitejs/plugin-react@^4.3.1`.
   * **Configuración de `vitest.config.ts`:** El plugin `react()` de Vite no debe ser incluido en la configuración de Vitest, ya que entra en conflicto con el compilador SWC de Next.js. La configuración de alias de TypeScript (`paths`) es suficiente para que Vitest resuelva las rutas del proyecto.
   * **Tipado Explícito en Modelos de Mongoose:** Al trabajar con tipos de unión (ej. `IEvent | IOrder`), es crucial que todas las interfaces en la unión definan explícitamente las propiedades comunes. Por ejemplo, la propiedad `_id: string;` debe estar presente en todas las interfaces de modelo para evitar que TypeScript la infiera como `unknown`.

## 4. Style & Conventions
1. Convenciones de Estilo y Formato

  El código sigue un estilo muy consistente y moderno, probablemente mantenido de
  forma automática.

   * Indentación: Se utilizan 2 espacios para la indentación en todos los archivos        
     (.ts, .tsx, .json).
   * Punto y Coma: No se utilizan. Las sentencias en JavaScript/TypeScript terminan       
      sin punto y coma.
   * Comillas: Se sigue una regla dual:
       * Se usan comillas simples (`'`) para las importaciones y la mayoría de las        
         cadenas de texto en la lógica de TypeScript.
           * Ejemplo: import React from 'react'
       * Se usan comillas dobles (`"`) para los atributos dentro de los elementos
         JSX.
           * Ejemplo: <div className="flex items-center">
   * Espaciado: Se utiliza un espacio consistente alrededor de los operadores (=,
     =>, ? :) y después de las comas.

  2. Herramientas y Configuraciones de Estilo

  La alta consistencia del formato sugiere el uso de herramientas automáticas:

   * Formateador de Código: El estilo (sin punto y coma, uso de comillas,
     espaciado) es característico de Prettier. Aunque no se vea un archivo
     .prettierrc, es probable que se esté usando la configuración por defecto o una       
      integrada en el editor o en los scripts del proyecto.
   * Linter: Se utiliza ESLint, como es estándar en los proyectos de Next.js. Ayuda       
      a mantener la calidad del código y a evitar errores comunes. La configuración       
      estaría en package.json o en un archivo .eslintrc.json.
   * TypeScript (`tsconfig.json`): Este archivo es fundamental, ya que no solo
     configura el compilador de TypeScript, sino que también define los alias de 
     ruta (como @/*), que son una convención clave en este proyecto.

  3. Estilo de las Importaciones

  Se sigue un patrón claro y organizado para las importaciones:

   * Orden: Generalmente, las importaciones se agrupan en un orden lógico, aunque
     no parece haber una regla de linter que lo fuerce estrictamente:
       1. Directivas como 'use client'.
       2. Librerías externas (ej. react, next).
       3. Módulos internos de la aplicación.
   * Agrupación: No se observa una agrupación específica con líneas en blanco entre       
      grupos, pero el orden mencionado crea una separación visual.
   * Rutas (Paths): Se utiliza un sistema híbrido muy común en proyectos de
     Next.js:
       * Rutas Absolutas (Alias): Se usa el alias @/ para importar desde
         directorios de primer nivel como lib, components, app, etc. Esto evita las       
          rutas relativas largas y frágiles (../../...).
           * Ejemplo: import { IEvent } from '@/lib/database/models/event.model'
       * Rutas Relativas: Se usan para importar archivos que están muy cerca en la        
         estructura de directorios, como un componente importando un sub-componente       
          o un archivo de estilos local.
           * Ejemplo: import IzipayForm from './IzipayForm'

  4. Convenciones de Nomenclatura

  La nomenclatura es consistente y sigue las mejores prácticas de la comunidad de
   React y TypeScript.

   * Componentes: PascalCase (ej. CheckoutButton, EventForm, ImmersiveEventPage).
   * Variables y Funciones: camelCase (ej. activePhase, onCheckout,
     handleBeginCheckoutClick).
   * Interfaces y Tipos (Types): PascalCase. Se observan dos patrones comunes:   
       * Prefijo I para interfaces: IEvent, ITier.
       * Sufijo Props para tipos de propiedades de componentes:
         TicketSelectionProps.
   * Archivos:
       * Archivos de componentes React (.tsx): PascalCase (ej.
         TicketSelection.tsx).
       * Otros archivos (.ts): Generalmente camelCase (ej. user.actions.ts,      
         category.model.ts).

## 5. Documentation & Explainability
 El proyecto se basa en el principio de **código auto-documentado**. El estándar a seguir es:

-   **Nomenclatura Descriptiva:** Las funciones, variables y componentes deben tener nombres claros que reflejen su propósito (ej. `checkoutOrder`, `DeleteConfirmation`). Esto es preferible a comentarios extensos.
-   **Tipado Fuerte con TypeScript:** Se debe usar TypeScript para definir explícitamente los tipos de datos (ej. `IEvent`, `TicketSelectionProps`). El tipado es una forma de documentación en sí misma.
-   **Comentarios en Línea para Claridad:** Usa comentarios de una sola línea (`//`) **únicamente** para explicar partes del código que sean complejas o cuya intención no sea obvia a simple vista. No uses comentarios para explicar lo que el código ya dice.
## 6. AI Behavior Rules

-   **Regla Fundamental:** Nunca asumas contexto faltante. Si tienes dudas, pregunta.
-   **Evita Alucinaciones:** No inventes librerías, funciones o APIs. Basa tus respuestas únicamente en las herramientas y el código que existen en el proyecto.
-   **Confirma Rutas:** Siempre confirma los nombres y rutas de los archivos antes de referenciarlos o modificarlos.
-   **Sigue el Patrón de Auto-documentación:** Escribe código claro y con nombres descriptivos. Prefiere un buen tipado sobre comentarios innecesarios.
-   **Uso Correcto de Comentarios:** Cuando necesites añadir un comentario, usa `//` para aclarar solo la lógica específica y compleja. No generes bloques de comentarios JSDoc a menos que se te pida explícitamente.
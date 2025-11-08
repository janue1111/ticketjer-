# GUÍA DE INTEGRACIÓN PUNTO WEB 2.0

## Índice
1.  INTRODUCCIÓN
    1.1. Objetivo
    1.2. Catálogo de APIs
    1.3. Pasos para integrar
2.  INTEGRACIÓN
    2.1. Paso 1: Credenciales
    2.2. Paso 2: Accesos al panel
    2.3. Paso 3: Generar token de sesión
    2.4. Paso 4: Invocar al formulario
3.  TARJETAS DE PRUEBAS

---

## 1. INTRODUCCIÓN

### 1.1. Objetivo
Este documento detalla los lineamientos técnicos necesarios para la integración con la nueva plataforma de pagos PuntoWeb (APIs y Formulario Web).

### 1.2. Catálogo de APIs
- **Seguridad:** Generación de Token de Sesión
- **Autorización:** Autorización (incluye Pre-Autorización)
- **Validación de cuenta:** Validación de Cuenta
- **Confirmación:** Confirmación
- **Anulación:** Anulación
- **Tokenización:** Creación de Token de tarjeta, Obtención de Token de tarjeta, Obtención de Tokens de comprador, Eliminación de Token
- **Deposito:** Deposito
- **Info. Orden:** Consulta de información de la Orden
- **Planes y Cuotas:** Consulta de Planes y Cuotas
- **Link de Pago:** Consultar Detalle Link de pago, Crear Link de Pago, Actualizar Link de Pago, Activar/Desactivar Link de Pago

### 1.3. Pasos para integrar
1.  Obtener las credenciales (Merchant Code y ApiKey)
2.  Accesos al panel (ambiente sandbox/producción)
3.  Generar token de sesión
4.  Invocar al formulario
5.  Identificar otras Apis a utilizar

---

## 2. INTEGRACIÓN

### 2.1. Paso 1: Credenciales
- `MERCHANT_CODE = '4004353'`
- `PUBLIC_KEY = "VErethUtraQuxas57wuMuquprADrAHAb"`
- `CURRENCY = "PEN"`

### 2.2. Paso 2: Accesos al panel
- URL: `https://sandbox-panel.izipay.pe/login/`
- USUARIO: `sandboxizipay@gmail.com`
- CLAVE: `L1m@2025`

### 2.3. Paso 3: Generar token de sesión
El token de sesión generado es enviado a cada API como medida de autenticación.

**Definiciones:**
- **Método HTTP:** POST
- **Protocolo:** REST
- **Formato:** JSON
- **Ambiente de Sandbox:** `https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate`
- **Ambiente de producción:** `https://api-pw.izipay.pe/security/v1/Token/Generate`

**Cabecera de entrada (HTTP Headers):**
- `transactionId` (string, 5-40): Id único por cada transacción. **(OBLIGATORIO)**

**Parámetros de entrada (HTTP Body):**
- `requestSource` (string, 7-15): Origen de la petición, Valor por defecto "ECOMMERCE". **(OBLIGATORIO)**
- `merchantCode` (string, 7-15): Código del comercio. **(OBLIGATORIO)**
- `orderNumber` (string, 5-15): Número de Pedido de la operación. **(OBLIGATORIO)**
- `publicKey` (string, 16-400): Llave pública. **(OBLIGATORIO)**
- `amount` (decimal, 4-10): Monto de la operación. (Valor por defecto=0.00). **(OBLIGATORIO)**

**Ejemplo petición:**
'''json
{
  "RequestSource": "ECOMMERCE",
  "merchantCode": "4004345",
  "OrderNumber": "R202211101518",
  "PublicKey": "VErethUtraQuxas57wuMuquprADrAHAb",
  "Amount": "0.00"
}
'''

**Parámetros de salida:**
- `code` (Numérico, 2-3): Código de respuesta.
- `message` (Alfanumérico, 5-30): Mensaje de respuesta.
- `response` (Objeto): Objeto Response.
- `response.token` (Alfanumérico, 255): Token generado, por transacción.

**Ejemplo respuesta:**
'''json
{
  "Code": "00",
  "Message": "OK",
  "Response": {
    "Token": "eyJhbGciOiJlUzI1NilsInR5cCI6IkpXVCJ9..."
  }
}
'''

### 2.4. Paso 4: Invocar al formulario

#### 2.4.1 Preparar el objeto de config
'''javascript
const iziConfig = {
  publicKey: PUBLIC_KEY,
  config: {
    transactionId: TRANSACTION_ID,
    action: 'pay',
    merchantCode: MERCHANT_CODE,
    order: {
      orderNumber: ORDER_NUMBER,
      currency: ORDER_CURRENCY,
      amount: ORDER_AMOUNT,
      payMethod: "CARD,QR",
      processType: 'AT',
      merchantBuyerId: 'jparteta',
      installments: '00',
      dateTimeTransaction: TIEMPO.toString(),
    },
    card: {
      brand: "",
      pan: "",
    },
    billing: {
      firstName: 'Jean Pierre',
      lastName: 'Arteta',
      email: 'jpierre.arteta@gmail.com',
      phoneNumber: '943541279',
      street: 'calle de ópruebas',
      city: 'lima',
      state: 'lima',
      country: 'PE',
      postalCode: '00001',
      document: '70155398',
      documentType: 'DNI',
    },
    render: {
      typeForm: Izipay.enums.typeForm.POP_UP,
      container: '#your-iframe-payment',
      showButtonProcessForm: true,
      redirectUrls: {
        onSuccess: 'https://mierror.com/onSuccess',
        onError: 'https://mierror.com/onError',
        onCancel: 'https://micancel.com/onCancel',
      }
    },
    urlRedirect: 'https://www.google.com/',
    appearance: {
      logo:'https://demo-izipay.azureedge.net/test/img/millasb.svg',
    },
  },
};
'''

#### 2.4.2 Crear una instancia a la clase Izipay
'''javascript
try {
  const izi = new Izipay({config: iziConfig});
} catch (error) { }
'''

#### 2.4.3 Levantar el formulario
'''javascript
const callbackResponsePayment = response => console.log(response);

try {
  izi && izi.LoadForm({
    autorization: 'TU_TOKEN_SESSION',
    keyRSA: 'RSA',
    callbackResponse: callbackResponsePayment
  });
} catch (error) {
  //console.log(error.message, error.Errors, error.date);
}
'''
**Parámetros del método LoadForm:**
- `authorization` (string): Token de sesión. **(OBLIGATORIO)**
- `llave publica RSA` (string): Llave pública. **(OBLIGATORIO)**
- `callbackResponse` (function): Valor usado para recibir las respuestas de la transacción. (NO OBLIGATORIO)

#### 2.4.4 Tipos de Formularios
- **Embebido:** `Izipay.enums.typeForm.EMBEDDED`
- **Pop-up:** `Izipay.enums.typeForm.POP_UP`
- **Redirect:** `Izipay.enums.typeForm.REDIRECT`

---

## 3. TARJETAS DE PRUEBAS

**Tarjetas aceptadas:**
- Visa: `4970100000000055`, 12/25, 123
- Visa: `4970100000000014`, 12/25, 123
- Mastercard: `5100010000002045`, 12/25, 123
- Mastercard: `5204740000001127`, 03/26, 261

**Tarjetas rechazadas:**
- **14 (Número de tarjeta inválido):** Visa `4019138210019096`, Mastercard `5103225852930567`
- **41 (Tarjeta perdida):** Visa `4014818108389710`, Mastercard `5102546179105000`
- **51 (Fondos insuficientes):** Visa `4003331978380689`, Mastercard `5102495814688105`
- **54 (Tarjeta expirada):** Visa `4008069640361357` (10/22), Mastercard `5106659582128224` (12/22)
- **61 (Excede límite de monto):** Visa `4002913238833267`, Mastercard `5114803122406407`
- **63 (Violación de Seguridad):** Visa `4004412132480232`, Mastercard `5112929646850374`

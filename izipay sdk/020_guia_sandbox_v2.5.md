# GUÍA DEL AMBIENTE SANDBOX v2.5

## Índice
- Guía SANDBOX
- SCRIPT
- APIS
- Flujo del pago
- Tarjetas
- Ejemplo de código
- Credenciales
- Acceso al panel del comercio

## Guía SANDBOX

El entorno de sandbox se configura como un espacio independiente del entorno de producción, y su propósito principal consiste en proporcionar un ambiente plenamente disponible. Este espacio permite a los comercios realizar pruebas exhaustivas hasta alcanzar los resultados deseados, garantizando así que estén debidamente preparados antes de pasar a la etapa de producción.

El entorno de sandbox replica todas las funciones presentes en el entorno de producción, manteniendo una integración idéntica. Los únicos aspectos que requieren ajustes durante una migración son:

- Credenciales
- APIs de seguridad y conexiones
- Importación de bibliotecas JavaScript

Estos elementos se consideran para garantizar una transición fluida y exitosa hacia el entorno de producción.

## SCRIPT

`<script src="https://sandbox-checkout.izipay.pe/payments/v1/js/index.js"></script>`

## APIS

Ambiente: `https://sandbox-api-pw.izipay.pe`

**SEGURIDAD**
- Generar sesión: `https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate`

**VENTAS**
- Validación de cuenta: `https://sandbox-api-pw.izipay.pe/accountvalidate/v1/AccountControllers/Validate`
- Autorización: `https://sandbox-api-pw.izipay.pe/authorization/api/Process/Authorize`
- Deposito: `https://sandbox-api-pw.izipay.pe/capture/v1/Transaction/Deposit`

**CONSULTAS**
- Cuotas: `https://sandbox-api-pw.izipay.pe/Installments/v1/Installments/Search`
- Orden: `https://sandbox-api-pw.izipay.pe/orderinfo/v1/Transaction/Search`

**CANCELACIONES**
- Anulación: `https://sandbox-api-pw.izipay.pe/cancel/api/Transaction/Cancel`
- Devoluciones: `https://sandbox-api-pw.izipay.pe/refund/v1/Transaction/Refund`

**TOKENIZACIÓN**
- Crear token de tarjeta: `https://sandbox-api-pw.izipay.pe/tokenization/external/api/v1/tokens`
- Consulta de token: `https://sandbox-api-pw.izipay.pe/tokenization/external/api/v1/tokens/token`
- Consulta de token de comprador: `https://sandbox-api-pw.izipay.pe/tokenization/external/api/v1/tokens/tokens`
- Eliminacion de token: `https://sandbox-api-pw.izipay.pe/tokenization/external/api/v1/tokens/delete`

## Flujo del pago
(Diagrama de secuencia)
1.  Servidor del comercio -> Servidor IZIPAY: `tokenGenerate()` con `API KEY` y `Merchant Code`.
2.  Servidor IZIPAY -> Servidor del comercio: `<<reserva Token>>`
3.  Servidor del comercio -> Web del comercio: `<<entrega Token>>`
4.  Web del comercio -> Formulario IZIPAY: `inicia Formulario()` con `token`.
5.  Formulario IZIPAY -> Servidor IZIPAY: `<<procesaDatos>>`
6.  Servidor IZIPAY -> Formulario IZIPAY: `Resultado de pago`
7.  Formulario IZIPAY -> Web del comercio: `<<callback>>`
8.  Web del comercio -> Servidor del comercio: `actualizaOrden()`
9.  Servidor IZIPAY -> Servidor del comercio: `enviaIPN <<POST>>`

## Tarjetas

**TARJETAS DE PRUEBA**

**Transacciones exitosas:**
- Mastercard: `5100010000002045`, 12/25, 123
- Mastercard: `5204740000001127`, 03/26, 261
- Visa: `4970100000000055`, 12/25, 123
- Visa: `4970100000000014`, 12/25, 123

**Transacciones denegadas:**
- `14` (Número de tarjeta inválido): Mastercard `5103225852930567`, Visa `4019138210019096`
- `41` (Tarjeta perdida): Mastercard `5102546179105000`, Visa `4014818108389710`
- `51` (Fondos insuficientes / Límite de crédito excedido): Mastercard `5102495814688105`, Visa `4003331978380689`
- `54` (Tarjeta expirada): Mastercard `5106659582128224` (exp 12/22), Visa `4008069640361357` (exp 10/22)
- `61` (Excede el límite de monto de retiro): Mastercard `5114803122406407`, Visa `4002913238833267`
- `63` (Violación de Seguridad): Mastercard `5112929646850374`, Visa `4004412132480232`

## Ejemplo de código
`https://bitbucket.org/mc1768/izipay-examples-checkout/src/main/`

## Credenciales
- `MERCHANT_CODE = ‘4004353';`
- `PUBLIC_KEY = "VErethUtraQuxas57wuMuquprADrAHAb";`
- `CURRENCY = "PEN";`

## Acceso al panel del comercio
- Web: `https://sandbox-panel.izipay.pe/login/`
- Usuario: `sandboxizipay@gmail.com`
- Password: `https://bit.ly/3Sfn0fM`

Los accesos adicionales deben encontrarse en el correo adjunto o solicitarse a su ejecutivo comercial.

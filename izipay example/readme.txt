README.md
Procesar un pago con izipay Checkout
Cree un formulario de pago simple y seguro para recopilar detalles de pago. Se incluyen algunos datos básicos para inicializar una transacción.

Ejecutando el ejemplo
Crear la aplicación
npm install
Ejecutar la aplicación
npm run server
abrir index.html con live-server o el servidor de su preferencia
Ir a: http://127.0.0.1:5500/public/index.html
En caso de error en el archivo server.js verificar que los puertos configurados sean los mismos que proporciona el live-server
Pasos en el archivo "/src/pay.js":
Generación de Token de Sesión(GetTokenSession)
Llamar a LoadForm del SDK de izipay checkout
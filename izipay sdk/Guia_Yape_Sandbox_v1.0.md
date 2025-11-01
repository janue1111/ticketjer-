# Guía Yape Sandbox

## 1. Requisitos previos

*   **Comercios configurados:** Se debe contar con comercios configurados en Sandbox para realizar las pruebas. A la fecha se cuenta con los siguientes comercios: 4004396 – 4004345-4006089-4004353-4004388.
*   **Llave Pública:** Estas llaves permitirán levantar el formulario: `VErethUtraQuxas57wuMuquprADrAHAb`

## 2. Checkout Sandbox

1.  Ingresar a la ruta: https://sandbox-checkout.izipay.pe/demo/
2.  Elegir el comercio o ingresar el código de comercio y la llave pública.
3.  Selecciona método de pago YAPE
4.  Ingresa el número telefónico y el OTP.
5.  Cuando tengas completos los datos, se habilitará la opción de pagar.
6.  En el procesamiento de la transacción se visualizará esta pantalla.

## 3. Generación de OTP

1.  Ingresar al link: https://testrecapicontroller.izipay.pe/Yape.Otp/v1/GenerateYapeOTP?phoneNumber=931988302
2.  Al ingresar se generará un OTP que será usado para esa operación. Recordar que no es un valor estático, y que cada vez que se refresque la pantalla se modificará.

## 4. Visualización de transacciones en Panel

1.  Ingresar al panel de sandbox: https://sandbox-panel.izipay.pe/login/
2.  Ingresa con las credenciales proporcionadas e ingresar al comercio usado para las pruebas.
3.  Identificar la transacción usando los filtros necesarios.
4.  Desde esta vista se puede anular.

## 5. Validación de Monto Máximo

1.  Cuando en el monto se coloca un valor menor o igual a S/. 2000 el formulario mostrará el método de pago Yape.
2.  Cuando en el monto se coloca un valor mayor a S/. 2000 el formulario NO mostrará el método de pago Yape.

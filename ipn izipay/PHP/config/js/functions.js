 $(document).ready(function() {

    const currentTimeUnix = Math.floor(Date.now()) * 1000;
    const transactionId = currentTimeUnix.toString().slice(0, 14);
    const orderNumber = currentTimeUnix.toString().slice(0, 10).toString();

    const dateTimeTransaction9 =  currentTimeUnix.toString();
    const MERCHANCOD =  '4001834'; //4004345   4001834
    const PUBLIC_KEY8 =  'VErethUtraQuxas57wuMuquprADrAHAb';

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    const dateTimeTransaction = `${formattedDate} ${formattedTime}`;

    $('#btn_pagar').click(function(event) {

        const montoPagar = $('#monto_cli').val();
        console.log('TransactionId: '+ transactionId)
        console.log('OrderNumber: '+ orderNumber)
        console.log('montoPagar: '+ montoPagar)
        //let x = document.getElementById("oculto").value

        $.ajax({
            url: "../controllers/izipay.php",
            method: "POST",
            data: {
                transaccion: transactionId ,
                order_number: orderNumber,
                monto: montoPagar,
                obtener_token: true
            },
            success: function(token) {
                console.log('Token obtenido: ' + token);
                const izi = new Izipay({
                    config: iziConfig?.config,
                });
                izi &&
                    izi.LoadForm({
                        authorization: token,
                        keyRSA: 'RSA',
                        callbackResponse: callbackResponsePayment,
                    });
            },
            error: function(error) {
                console.error("Error en la solicitud AJAX:", error);
            }
        });

        //event.preventDefault();

        var cod_order = orderNumber;
        
        var nomcli = $('#nom_cli').val();
        var apecli = $('#ape_cli').val();
        var emailcli = $('#email_cli').val();
        var celularcli = $('#celular_cli').val();
        var dnicli = $('#dni_cli').val();

        const iziConfig = {
            config: {  
                transactionId: transactionId,
                action: 'pay',
                //merchantCode: '4004345',
                merchantCode: MERCHANCOD, 
                order: {
                    orderNumber: cod_order,
                    currency: "PEN",
                    amount: montoPagar,                    
                    payMethod: "CARD",
                    processType: "AT",
                    merchantBuyerId: "4004345",
                    installments: "00",
                    dateTimeTransaction: dateTimeTransaction9,  //
                    //dateTimeTransaction: currentTimeUnix,  
                },
                card: { 
                    brand: '', 
                    pan: '',                     
                },                
                billing: {
                    firstName: nomcli,
                    lastName: apecli,
                    email: emailcli,
                    phoneNumber: celularcli,
                    street: 'Av. xxxxx',
                    city: 'Lima',
                    state: 'Lima',
                    country: 'PE',
                    postalCode: '15300',
                    documentType: 'DNI',
                    document: dnicli,
                },                
                render: {
                    /*typeForm: 'embedded', 
                    container:'my-form-payment', 
                    showButtonProcessForm: true*/
                    typeForm: Izipay.enums.typeForm.POP_UP,
                    container: '#your-iframe-payment',
                    showButtonProcessForm: true,
                    redirectUrls: {
                        onSuccess: 'https://mierror.com/onSuccess',
                        onError: 'https://mierror.com/onError',
                        onCancel: 'https://micancel.com/onCancel',
                        //onSuccess: 'https://mierror.com/success',
                        //onError: 'https://mierror.com/error',
                        //onCancel: 'https://micancel.com/backcommerce',
                    }
                },
                urlRedirect: "", 
                urlIPN: "", 
                appearance: { 
                    styleInput: "normal", 
                    logo: "", 
                    theme: "green",
                },
            },
        };

        console.log('Objeto Config: ');
        console.log(iziConfig);

        console.log('Aqui respuesta del pago')
        const callbackResponsePayment = (response) => console.log(response);

        /*try {
            const izi = new Izipay({
                config: iziConfig?.config,
            });
            izi &&
                izi.LoadForm({
                    authorization: token,
                    keyRSA: 'RSA',
                    callbackResponse: callbackResponsePayment,
                });

        } catch (error) {
            console.log('Error en el llamado al formulario')
            console.log(error.message, error.Errors, error.date);
        }*/

    });

});
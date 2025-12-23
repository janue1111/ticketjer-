import {GetTokenSession} from './getTokenSession.js';
import {getDataOrderDynamic} from './util.js';

/************** función de apoyo para simular el order y transactionId de manera dinámica **************/
const {transactionId, orderNumber} = getDataOrderDynamic();

/* Inicio datos del comercio */
const MERCHANT_CODE = '4004345';
const PUBLIC_KEY = 'VErethUtraQuxas57wuMuquprADrAHAb';
/*const PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi/Fkackv/JL8PAES1OGz AZTF+zelyCASKWb6nLL+DvzjJbKU+4G3cAS5X8kkRAyXakgZkCjSJ35VIetcyD5O okxCMtRX7Z93kaVcjPHoMs54mDfSqAaSaoGPXtBxWeSp9z7Hgt79c4NMJKLM0yTB RwW6RsUYcieqxmlErj8QxLCYtZPrXCDhTrQ68rJOpUP2cTytfPK/s0tUP2k//y2Z Sly75rG/hb5ina0fmV6WD1yTOYkKWWR3dgNsvNoeg0u82AZYND/slZM3qYB+3EDL bwKTcXTOeBP6MAYCPgNrP5AhYKEX28y9Ig7Vinldj1p/gpElbitCw9lSwMwgQnPV vwIDAQAB';*/
/* Fin datos del comercio */

/************* Inicio datos de la transacción **************/
const TRANSACTION_ID = transactionId;
const ORDER_NUMBER = orderNumber;
const ORDER_AMOUNT = '1.99';
const ORDER_CURRENCY = 'PEN';
/************* Fin datos de la transacción **************/

/********************************************************
 - Obteniendo el código de /autorización o token de sessión/ para inicializar el formulario de pago
 - El comercio debe llamar a su backend con sus datos para poder generar el token
 *********************************************************/
GetTokenSession(TRANSACTION_ID, {
    requestSource: 'ECOMMERCE',
    merchantCode: MERCHANT_CODE,
    orderNumber: ORDER_NUMBER,
    publicKey: PUBLIC_KEY,
    amount: ORDER_AMOUNT,
}).then(authorization => {

    /********* Obteniendo el token de la respuesta  **********/
    const {response: {token = undefined}} = authorization;

    if (!!token) {

        const buttonPay = document.querySelector('#btnPayNow');

        buttonPay.disabled = false;
        buttonPay.innerHTML = `Pay Now ${ORDER_CURRENCY} ${ORDER_AMOUNT}`;

        //Datos de configuración para cargar el Checkout(form) de izipay

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
                    processType: 'AT',
                    merchantBuyerId: 'mc1768',
                    dateTimeTransaction: '1670258741603000', //currentTimeUnix
                },
                card: {
                    brand: '',
                    pan: '',
                },
                billing: {
                    firstName: 'Darwin',
                    lastName: 'Paniagua',
                    email: 'demo@izipay.pe',
                    phoneNumber: '989339999',
                    street: 'calle el demo',
                    city: 'lima',
                    state: 'lima',
                    country: 'PE',
                    postalCode: '00001',
                    document: '12345678',
                    documentType: 'DNI',
                },
                render: {
                    typeForm: 'pop-up',
                    container: '#your-iframe-payment',
                },
                urlRedirect:'https://server.punto-web.com/comercio/creceivedemo.asp?p=h1',
                appearance: {
                    logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
                },
            },
        };

        const callbackResponsePayment = response => document.querySelector('#payment-message').innerHTML = JSON.stringify(response, null, 2);

        const handleLoadForm = () => {
            try {
                const izi = new Izipay({
                    publicKey: iziConfig?.publicKey,
                    config: iziConfig?.config,
                });

                izi &&
                izi.LoadForm({
                    authorization: token,
                    keyRSA: 'RSA',
                    callbackResponse: callbackResponsePayment,
                });

            } catch (error) {
                console.log(error.message, error.Errors, error.date);
            }
        };

        /************** Botón para llamar al formulario *************/

        document.querySelector('#btnPayNow').addEventListener('click', async (event) => {
            event.preventDefault();
            handleLoadForm();
        });

    }

});


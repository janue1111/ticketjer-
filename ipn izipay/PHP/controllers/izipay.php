<?php

if (isset($_POST['transaccion'])) {

    $transaccion_id = $_POST['transaccion'];
    $order_number = $_POST['order_number'];
    $montototal = $_POST['monto'];
    $MERCHANCOD =  '4001834'; //4004345   4001834
    $PUBLIC_KEY =  'VErethUtraQuxas57wuMuquprADrAHAb';
    $curl = curl_init();

    //echo "****  10 ****";
    //echo "Transaccion_id_izipay:".$transaccion_id."<br>";
    //echo "order_number_izipay:".$order_number."<br>";    
    //echo "****  10 ****";
  
    //echo "TransactionId con número aleatorio: " . $transaccion_id;

    curl_setopt_array($curl, [
        CURLOPT_URL => "https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode([
            'requestSource' => 'ECOMMERCE',
            'merchantCode' => $MERCHANCOD,
            'orderNumber' => $order_number,
            'publicKey' => $PUBLIC_KEY,
            'amount' => $montototal
        ]),
        CURLOPT_HTTPHEADER => [
            "Accept: application/json",
            "Content-Type: application/json",
            "transactionId:" .$transaccion_id
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        // Decodificar el JSON de la respuesta
        $decoded_response = json_decode($response, true);

        // Verificar si la clave 'token' existe en la respuesta
        if (isset($decoded_response['response']['token'])) {
            // Obtener el token
            $token = $decoded_response['response']['token'];
            
            // Devolver el token como respuesta a la solicitud AJAX
            echo $token;

        } else {
            echo "Error #:" . $response."<br>";
        }
    }
} elseif (isset($_POST['obtener_token']) && $_POST['obtener_token'] === true) {
    // Manejar la solicitud específica para obtener el token
    echo $token;  // Asegúrate de que $token esté definido anteriormente
} else {
    // Resto de tu código PHP aquí
    // ...
}
?>
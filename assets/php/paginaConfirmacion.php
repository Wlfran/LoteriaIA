<?php
// Configuración de Firestore
$apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
$projectId = 'loteria-59d43';

$reference_sale = $_REQUEST['reference_sale'] ?? 'N/A';
$customId = $_REQUEST['customId'] ?? 'N/A';

// Ruta de la colección (puedes ajustar esto según sea necesario)
$collectionPath = "users/$customId/compras"; // $reference_sale

// URL de Firestore REST API para crear un nuevo documento con ID generado automáticamente
$url = "https://firestore.googleapis.com/v1/projects/$projectId/databases/(default)/documents/$collectionPath/$reference_sale";
// $url = "https://firestore.googleapis.com/v1/projects/$projectId/databases/(default)/documents/$collectionPath";

// Obtener los datos enviados por PayU
$phone = $_REQUEST['phone'] ?? 'N/A';
$additional_value = $_REQUEST['additional_value'] ?? '0.00';
$test = $_REQUEST['test'] ?? '1';
$transaction_date = $_REQUEST['transaction_date'] ?? 'N/A';
$cc_number = $_REQUEST['cc_number'] ?? 'N/A';
$cc_holder = $_REQUEST['cc_holder'] ?? 'N/A';
$error_code_bank = $_REQUEST['error_code_bank'] ?? 'N/A';
$billing_country = $_REQUEST['billing_country'] ?? 'N/A';
$bank_referenced_name = $_REQUEST['bank_referenced_name'] ?? 'N/A';
$description = $_REQUEST['description'] ?? 'N/A';
$administrative_fee_tax = $_REQUEST['administrative_fee_tax'] ?? '0.00';
$tx_value = $_REQUEST['value'] ?? '100.00';
$value = number_format($tx_value, 1, '.', '');
$administrative_fee = $_REQUEST['administrative_fee'] ?? '0.00';
$payment_method_type = $_REQUEST['payment_method_type'] ?? 'N/A';
$office_phone = $_REQUEST['office_phone'] ?? 'N/A';
$email_buyer = $_REQUEST['email_buyer'] ?? 'N/A';
$response_message_pol = $_REQUEST['response_message_pol'] ?? 'N/A';
$error_message_bank = $_REQUEST['error_message_bank'] ?? 'N/A';
$shipping_city = $_REQUEST['shipping_city'] ?? 'N/A';
$transaction_id = $_REQUEST['transaction_id'] ?? 'N/A';
$sign = $_REQUEST['sign'] ?? 'N/A';
$tax = $_REQUEST['tax'] ?? '0.00';
$payment_method = $_REQUEST['payment_method'] ?? 'N/A';
$billing_address = $_REQUEST['billing_address'] ?? 'N/A';
$payment_method_name = $_REQUEST['payment_method_name'] ?? 'N/A';
$pse_bank = $_REQUEST['pse_bank'] ?? 'N/A';
$state_pol = $_REQUEST['state_pol'] ?? 'N/A';
$date = $_REQUEST['date'] ?? 'N/A';
$nickname_buyer = $_REQUEST['nickname_buyer'] ?? 'N/A';
$reference_pol = $_REQUEST['reference_pol'] ?? 'N/A';
$currency = $_REQUEST['currency'] ?? 'N/A';
$risk = $_REQUEST['risk'] ?? 'N/A';
$shipping_address = $_REQUEST['shipping_address'] ?? 'N/A';
$bank_id = $_REQUEST['bank_id'] ?? 'N/A';
$payment_request_state = $_REQUEST['payment_request_state'] ?? 'N/A';
$customer_number = $_REQUEST['customer_number'] ?? 'N/A';
$administrative_fee_base = $_REQUEST['administrative_fee_base'] ?? '0.00';
$attempts = $_REQUEST['attempts'] ?? 'N/A';
$merchant_id = $_REQUEST['merchant_id'] ?? 'N/A';
$exchange_rate = $_REQUEST['exchange_rate'] ?? 'N/A';
$shipping_country = $_REQUEST['shipping_country'] ?? 'N/A';
$installments_number = $_REQUEST['installments_number'] ?? 'N/A';
$franchise = $_REQUEST['franchise'] ?? 'N/A';
$payment_method_id = $_REQUEST['payment_method_id'] ?? 'N/A';
$extra1 = $_REQUEST['extra1'] ?? 'N/A';
$extra2 = $_REQUEST['extra2'] ?? 'N/A';
$antifraudMerchantId = $_REQUEST['antifraudMerchantId'] ?? 'N/A';
$extra3 = $_REQUEST['extra3'] ?? 'N/A';
$nickname_seller = $_REQUEST['nickname_seller'] ?? 'N/A';
$ip = $_REQUEST['ip'] ?? 'N/A';
$airline_code = $_REQUEST['airline_code'] ?? 'N/A';
$billing_city = $_REQUEST['billing_city'] ?? 'N/A';
$pse_reference1 = $_REQUEST['pse_reference1'] ?? 'N/A';
$pse_reference3 = $_REQUEST['pse_reference3'] ?? 'N/A';
$pse_reference2 = $_REQUEST['pse_reference2'] ?? 'N/A';
$numeroJugado = $_REQUEST['numeroJugado'] ?? 'N/A';
$numeroSerie = $_REQUEST['numeroSerie'] ?? '';

// Construir los datos para Firestore
$data = array(
    'fields' => array(
        'customId' => array('stringValue' => $customId),
        'phone' => array('stringValue' => $phone),
        'additional_value' => array('stringValue' => $additional_value),
        'test' => array('stringValue' => $test),
        'transaction_date' => array('stringValue' => $transaction_date),
        'cc_number' => array('stringValue' => $cc_number),
        'cc_holder' => array('stringValue' => $cc_holder),
        'numeroJugado' => array('stringValue' => $numeroJugado),
        'numeroSerie' => array('stringValue' => $numeroSerie),
        'error_code_bank' => array('stringValue' => $error_code_bank),
        'billing_country' => array('stringValue' => $billing_country),
        'bank_referenced_name' => array('stringValue' => $bank_referenced_name),
        'description' => array('stringValue' => $description),
        'administrative_fee_tax' => array('stringValue' => $administrative_fee_tax),
        'value' => array('stringValue' => $value),
        'administrative_fee' => array('stringValue' => $administrative_fee),
        'payment_method_type' => array('stringValue' => $payment_method_type),
        'office_phone' => array('stringValue' => $office_phone),
        'email_buyer' => array('stringValue' => $email_buyer),
        'response_message_pol' => array('stringValue' => $response_message_pol),
        'error_message_bank' => array('stringValue' => $error_message_bank),
        'shipping_city' => array('stringValue' => $shipping_city),
        'transaction_id' => array('stringValue' => $transaction_id),
        'sign' => array('stringValue' => $sign),
        'tax' => array('stringValue' => $tax),
        'payment_method' => array('stringValue' => $payment_method),
        'billing_address' => array('stringValue' => $billing_address),
        'payment_method_name' => array('stringValue' => $payment_method_name),
        'pse_bank' => array('stringValue' => $pse_bank),
        'state_pol' => array('stringValue' => $state_pol),
        'date' => array('stringValue' => $date),
        'nickname_buyer' => array('stringValue' => $nickname_buyer),
        'reference_pol' => array('stringValue' => $reference_pol),
        'currency' => array('stringValue' => $currency),
        'risk' => array('stringValue' => $risk),
        'shipping_address' => array('stringValue' => $shipping_address),
        'bank_id' => array('stringValue' => $bank_id),
        'payment_request_state' => array('stringValue' => $payment_request_state),
        'customer_number' => array('stringValue' => $customer_number),
        'administrative_fee_base' => array('stringValue' => $administrative_fee_base),
        'attempts' => array('stringValue' => $attempts),
        'merchant_id' => array('stringValue' => $merchant_id),
        'exchange_rate' => array('stringValue' => $exchange_rate),
        'shipping_country' => array('stringValue' => $shipping_country),
        'installments_number' => array('stringValue' => $installments_number),
        'franchise' => array('stringValue' => $franchise),
        'payment_method_id' => array('stringValue' => $payment_method_id),
        'extra1' => array('stringValue' => $extra1),
        'extra2' => array('stringValue' => $extra2),
        'antifraudMerchantId' => array('stringValue' => $antifraudMerchantId),
        'extra3' => array('stringValue' => $extra3),
        'nickname_seller' => array('stringValue' => $nickname_seller),
        'ip' => array('stringValue' => $ip),
        'airline_code' => array('stringValue' => $airline_code),
        'billing_city' => array('stringValue' => $billing_city),
        'pse_reference1' => array('stringValue' => $pse_reference1),
        'reference_sale' => array('stringValue' => $reference_sale),
        'pse_reference3' => array('stringValue' => $pse_reference3),
        'pse_reference2' => array('stringValue' => $pse_reference2),
        'fecha' => array('timestampValue' => date('c')) // Timestamp en formato ISO 8601
    )
);

// Configurar la solicitud cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json'
));
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
//curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

// Ejecutar la solicitud y obtener la respuesta
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    $error_message = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    echo 'cURL Error: ' . $error_message;
    exit;
}

curl_close($ch);

echo 'Respuesta de Firestore: ' . $response;

// Verificar el resultado
if ($http_code === 200) {
    http_response_code(200);
    // echo 'Datos guardados con éxito.';
} else {
    http_response_code(500);
    // echo 'Error al guardar los datos. Código de respuesta: ' . $http_code;
}
?>

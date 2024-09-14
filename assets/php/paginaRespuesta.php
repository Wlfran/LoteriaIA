<?php

$ApiKey = "4Vj8eK4rloUd272L48hsrarnUA";

$merchant_id = $_REQUEST['merchantId'];

$referenceCode = $_REQUEST['referenceCode'];

$TX_VALUE = $_REQUEST['TX_VALUE'];

$New_value = number_format($TX_VALUE, 1, '.', '');

$currency = $_REQUEST['currency'];

$transactionState = $_REQUEST['transactionState'];

$firma_cadena = "$ApiKey~$merchant_id~$referenceCode~$New_value~$currency~$transactionState";

$firmacreada = md5($firma_cadena);

$firma = $_REQUEST['signature'];

$reference_pol = $_REQUEST['reference_pol'];

$cus = $_REQUEST['cus'];

$extra1 = $_REQUEST['description'];

$pseBank = $_REQUEST['pseBank'];

$lapPaymentMethod = $_REQUEST['lapPaymentMethod'];

$transactionId = $_REQUEST['transactionId'];



if ($_REQUEST['transactionState'] == 4 ) {

	$estadoTx = "Transaction approved";
	header("Location: ../../confirmacion.html");
	exit;

}



else if ($_REQUEST['transactionState'] == 6 ) {

	$estadoTx = "Transaction rejected";

}



else if ($_REQUEST['transactionState'] == 104 ) {

	$estadoTx = "Error";
	header("Location: ../../errorConfirmacion.html");
	exit;

}



else if ($_REQUEST['transactionState'] == 7 ) {

	$estadoTx = "Pending payment";

}



else {

	$estadoTx=$_REQUEST['mensaje'];

}





if (strtoupper($firma) == strtoupper($firmacreada)) {

?>

	<h2>Transaction Summary</h2>

	<table>

	<tr>

	<td>Transaction status</td>

	<td><?php echo $estadoTx; ?></td>

	</tr>

	<tr>

	<tr>

	<td>Transaction ID</td>

	<td><?php echo $transactionId; ?></td>

	</tr>

	<tr>

	<td>Reference sale</td>

	<td><?php echo $reference_pol; ?></td>

	</tr>

	<tr>

	<td>Reference transaction</td>

	<td><?php echo $referenceCode; ?></td>

	</tr>

	<tr>

	<?php

	if($pseBank != null) {

	?>

		<tr>

		<td>cus </td>

		<td><?php echo $cus; ?> </td>

		</tr>

		<tr>

		<td>Bank </td>

		<td><?php echo $pseBank; ?> </td>

		</tr>

	<?php

	}

	?>

	<tr>

	<td>total amount</td>

	<td>$<?php echo number_format($TX_VALUE); ?></td>

	</tr>

	<tr>

	<td>Currency</td>

	<td><?php echo $currency; ?></td>

	</tr>

	<tr>

	<td>Description</td>

	<td><?php echo ($extra1); ?></td>

	</tr>

	<tr>

	<td>Entity:</td>

	<td><?php echo ($lapPaymentMethod); ?></td>

	</tr>

	</table>

<?php

}

else

{

?>

	<h1>Error validating digital signature.</h1>

<?php

}

?>

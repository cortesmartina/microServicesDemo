<?php


function calcularImpuesto($valor){
	return $valor*0.21;
}
$curl = curl_init();
curl_setopt_array($curl, array(
		CURLOPT_RETURNTRANSFER=>1,
		CURLOPT_URL=>"http://localhost:4000/factura"
	));
$facturas = json_decode(curl_exec($curl));

$facturasMostrar = array();
foreach ($facturas as $factura) {
	$facturasMostrar[] = array('numero'=>$factura->numero, 
								'subtotal'=>$factura->subtotal, 
								'impuesto'=>calcularImpuesto($factura->subtotal), 
								'total'=>$factura->subtotal+calcularImpuesto($factura->subtotal));	
}

exit(json_encode($facturasMostrar));

?>
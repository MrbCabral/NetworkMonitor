<?php
    // pega o ip passado na url: /api/alertar.php?host=:ip
    $ip = $_GET['host'] ?? null;
	$saida = '';
	
	if (filter_var($ip, FILTER_VALIDATE_IP))
		$saida = shell_exec("java -jar ../servidor.jar 5 1 ${ip}");
	
	if ($saida == '')
		$saida = '{ "status": "falha no alerta" }';

	header("Content-type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	echo $saida;
?>
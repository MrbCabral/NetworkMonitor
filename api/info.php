<?php
    // pega o ip passado na url: /api/info.php?host=:ip
    $ip = $_GET['host'] ?? null;
    $saida = '';
    
    if (filter_var($ip, FILTER_VALIDATE_IP))
        $saida = shell_exec("java -jar ../servidor.jar 1 3 ${ip}");
	
	if ($saida == '')
		$saida = '{ "ip": "", "mac": "-", "nome": "-", "usuario": "-", "so": "-", "version": "-", "set": "2" }';

	header("Content-type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	echo $saida;
?>
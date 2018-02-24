<?php
    // pega o ip passado na url: /api/tela.php?host=:ip
    $ip = $_GET['host'] ?? null;
    $saida = '';
    $origem = `${ip}.png`;
    $destino = `http://localhost/capturas/${ip}.png`;

    if (filter_var($ip, FILTER_VALIDATE_IP))
        $saida = shell_exec("java -jar ../servidor.jar 3 1 ${ip}");

    if ($saida == '')
		$saida = '{ "status": "falha ao capturar a tela" }';
    
	header("Content-type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	echo $saida;
?>
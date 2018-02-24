<?php

// Intervalo da rede
$LOCALHOST = 'IP_DO_SERVIDOR';
$INFO = "http://". $LOCALHOST . "/api/info.php?host=";
$ARQUIVO = "C:\\xampp\\htdocs\\ProjetoDW5\\json\\log.json";
//$ARQUIVO = "/var/www/html/json/log.json";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$log = network_scanner(get_ip());
echo $log;
$ponteiro = fopen("$ARQUIVO", 'wb');
fwrite($ponteiro, $log);
fclose($ponteiro);


function get_ip() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])){
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    }
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else if(isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    }
    else if(isset($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    }
    else if(isset($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    }
    else if(isset($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    }
    else {
        $ipaddress = 'UNKNOWN';
    }
    return $ipaddress;
}

function network_scanner($ip_address){
    $dispositivos = "[";
    $MIN = 100;
    $MAX = 105;
    $net = explode(".",$ip_address);
    $network = "$net[0].$net[1].$net[2].";
    foreach (range($MIN, $MAX) as $host) {
        $ip = $network . $host;
        $disp = file_get_contents($INFO . $ip);
        if (strstr($disp, '}')){
            $dispositivos .= $disp . ",";
        }
    }
    $dispositivos = substr($dispositivos, 0, strripos($dispositivos,'}')+1)."]";
    $dispositivos = trim(preg_replace('/\s+/', ' ', $dispositivos));
    return $dispositivos;
}
?>
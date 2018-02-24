<?php
    // administra os usuarios no banco de dados: /php/admin.php
    session_start();
    if(!isset($_SESSION['auth']) || $_SESSION['auth'] === false)
        header('Location: ../login/');

    $ARQUIVO = "C:\\xampp\\htdocs\\ProjetoDW5\\json\\admin.json";
    
    $saida = exibir();
    $id = '';

    // atualizar arquivo admin.json
    $ponteiro = fopen("$ARQUIVO", 'wb');
    var_dump($ponteiro);
    fwrite($ponteiro, json_encode(exibir()));
    fclose($ponteiro);

    function exibir() {
        try {
            $conn = new PDO('mysql:host=localhost;dbname=db_aprendiz', 'root', '');
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $admins = $conn->query('SELECT login, matricula FROM usuarios');
            $admins->execute(array('id' => $id));

            # Pega um array contendo todos os resultados
            $result = $admins->fetchAll(PDO::FETCH_ASSOC);
            $conn = null;
            $admins = null;

            # Se um ou mais resultados forem retornados... 
            if ( count($result) ) {
                return $result;
            } else {
                return '{ "status": "nao encontrado" }';
            }
        } catch(PDOException $e) {
            //echo 'ERROR: ' . $e->getMessage();
            return '{ "status": "nao encontrado" }';
            die;
        }
    }
    
	// header("Content-type: application/json; charset=UTF-8");
	// header("Access-Control-Allow-Origin: *");
    // print json_encode($saida);
?>
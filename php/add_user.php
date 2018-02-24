<?php
    session_start();
    if(!isset($_SESSION['auth']) || $_SESSION['auth'] === false)
        header('Location: ../login/');

    $login = $_POST['login'] ?? null;
    $senha = md5($_POST['senha']) ?? null;
    $matricula = $_POST['matricula'] ?? null;

    try {
        $conn = new PDO('mysql:host=localhost;dbname=db_aprendiz', 'root', '');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "INSERT INTO usuarios(login, matricula, senha) VALUES(:login, :matricula, :senha)";
        // prepara a execucao do comando sql
        $stmt = $conn->prepare( $sql );
        // protege os parametros inseridos no comando
        $stmt->bindParam( ':login', $login );
        $stmt->bindParam( ':senha', $senha );
        $stmt->bindParam( ':matricula', $matricula );

        // executa o comando
        $result = $stmt->execute();
        if ( ! $result ){
            echo "
             <script language='javascript' type='text/javascript'>
             alert('Erro ao adicionar o usuario! Se o erro persistir, entre em contato com o administrador do sistema.');
             window.location.href='/index.php?page=administrador';
             </script>";
            exit;
        }
        echo "
             <script language='javascript' type='text/javascript'>
             alert('Usuário adicionado com sucesso.');
             window.location.href='/index.php?page=administrador';
             </script>";
    } catch(PDOException $e) {
        return '{ "status": "erro ao adicionar usuario." }';
        die;
    }

?>
<?php
    session_start();
    if(!isset($_SESSION['auth']) || $_SESSION['auth'] === false)
        header('Location: ../login/');

    $senha = md5($_POST['senha']) ?? null;
    $matricula = $_POST['matricula'] ?? null;

    try {
        $conn = new PDO('mysql:host=localhost;dbname=db_aprendiz', 'root', '');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "DELETE FROM usuarios WHERE senha = :senha AND matricula = :matricula";
        // prepara a execucao do comando sql
        $stmt = $conn->prepare( $sql );
        // protege os parametros inseridos no comando
        $stmt->bindParam( ':senha', $senha );
        $stmt->bindParam( ':matricula', $matricula );

        // executa o comando
        $result = $stmt->execute();
        echo '<script>console.log("$result")</script>';
        if ( ! $result ){
            echo "
             <script language='javascript' type='text/javascript'>
             alert('Matrícula e/ou senha invalidos. Falha ao deletar conta de usuário!');
             window.location.href='/index.php?page=administrador';
             </script>";
            exit;
        } else {
            echo "
                <script language='javascript' type='text/javascript'>
                alert('Conta de usuário deletado com sucesso.');
                window.location.href='/index.php?page=administrador';
                </script>";
        }
    } catch(PDOException $e) {
        return '{ "status": "erro ao remover usuario." }';
        die;
    }

?>
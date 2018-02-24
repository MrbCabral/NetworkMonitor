<?php
  session_start();

  $login = $_POST['matricula'] ?? null;
  $senha = md5($_POST['senha']) ?? null;
  
  try {
        $conn = new PDO('mysql:host=localhost;dbname=db_aprendiz', 'root', '');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "SELECT * FROM usuarios WHERE matricula = :login && senha = :senha";
        // prepara a execucao do comando sql
        $stmt = $conn->prepare( $sql );
        // protege os parametros inseridos no comando
        $stmt->bindParam( ':login', $login );
        $stmt->bindParam( ':senha', $senha );

        // executa o comando
        $result = $stmt->execute();
        if ( ! $result ){
            echo "
             <script language='javascript' type='text/javascript'>
                alert('Login e/ou senha incorretos');
                window.location.href='./index.html';
             </script>";
            exit;
        } else {
          $_SESSION['auth'] = true;
          header("Location:/index.php");
        }
    } catch(PDOException $e) {
         echo "
             <script language='javascript' type='text/javascript'>
                alert('Login e/ou senha incorretos');
                window.location.href='./index.html';
             </script>";
        return '{ "status": "erro ao adicionar usuario." }';
        die;
    }
?>
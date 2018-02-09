<?php
  session_start();
  $login = $_POST['usuario'] ?? null;
  $senha = md5($_POST['senha']) ?? null;
  $entrar = $_POST['entrar'] ?? null;
  $connect = mysqli_connect('localhost','root','','db_aprendiz');
    if (isset($entrar)) {
             
      $verifica = mysqli_query($connect,"SELECT * FROM usuarios WHERE login = '$login' AND senha = '$senha'") or die("erro ao selecionar");
      // pode-se verificar com matrícula:
      // mysqli_query($connect,"SELECT * FROM usuarios WHERE matricula = '$login' AND senha = '$senha'") or die("erro ao selecionar");
      if (mysqli_num_rows($verifica)<=0) {
          echo"
          <script language='javascript' type='text/javascript'>
            alert('Login e/ou senha incorretos');
            window.location.href='./index.html';
          </script>";
          die();
      } else {
          $_SESSION['auth'] = true;
          header("Location:../index.html");
      }
    }
?>
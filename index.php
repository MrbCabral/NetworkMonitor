<?php
  session_start();
  if(!isset($_SESSION['auth']) || $_SESSION['auth'] === false)
    header('Location: ../login/');

  $page = $_GET['page'] ?? "home";
?>

<!DOCTYPE html>
<html lang="br">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Network Monitor</title>

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <!-- Bootstrap JS/ECS -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

  <!-- Graficos -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.bundle.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gauge.js/1.3.5/gauge.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sparklines/2.1.2/jquery.sparkline.min.js"></script>

  <!-- FontAwesome CSS -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css">

  <!-- Local JS e CSS -->
  <link rel="stylesheet" href="/css/css.css">
  <script src="js/main.js"></script>
  <script src="js/<?php echo $page; ?>.js"></script>
</head>

<body>
  <div class="container">
    <nav class="navbar navbar-dark bg-primary" id="tituloP">
      <a id="titulo" href="/index.php">NETWORK MONITOR</a>
    </nav>
    <div class="row mb-5">
      <div class="col-2 left_col">
        <div class="main_menu_side">

        <div class="nav flex-column nav-pills menuLateral">
          <a class="nav-link" href="index.php?page=home"         >Monitoramento</a>
          <a class="nav-link" href="index.php?page=dispositivos" >Dispositivos</a>
          <a class="nav-link" href="index.php?page=alertas"      >Alertas</a>
          <a class="nav-link" href="index.php?page=capturas"     >Capturas</a>
          <a class="nav-link" href="index.php?page=shutdown"     >Shutdown</a>
          <a class="nav-link" href="index.php?page=administrador">Administrador</a>
          <a class="nav-link"><button type="button" class="btn btn-outline-primary" onclick="reload()">reload <i class="fas fa-sync-alt"></i></button></a>
          
        </div>        

        </div>
      </div>
      <div class="col-10" id="telaTable">
        <hr>
        <div class="tab-content">
          <?php 
			      include($page.".php"); 
		      ?>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <span class="col mt-5 mb-3 text-center text-muted">Desenvolvido em 2017-2018</span>
        </div>
      </div>
    </footer>
  </div>
</body>

</html>
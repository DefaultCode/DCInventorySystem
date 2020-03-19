<?php 
    session_start();
    if(isset($_SESSION['usu'])){
      echo '<script> window.location = "../html/inicio.php"; </script>';
    }
 ?>
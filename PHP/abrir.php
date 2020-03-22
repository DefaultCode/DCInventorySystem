<?php 
session_start();
if (isset($_SESSION['usuario'])) { 
	$usuario = $_SESSION['usuario'];
    $role = $_SESSION['roles'];
        echo "$usuario,$role";

    }else{ 
        echo 'error';
    }
?>
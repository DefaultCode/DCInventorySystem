<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "get_dolardia":
            get_dolardia();
            break;  
        case "insert_dolardia":
            insert_dolardia();
            break;      
        case "update_dolardia":
            update_dolardia();
            break;
        case "estado_dolardia":
            estado_dolardia();
            break;        
    }
 
    function get_dolardia(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tbldolardia WHERE estado = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
    function estado_dolardia(){
        include 'dbconection.php';
        $sql = "UPDATE tbldolardia SET estado = 0 WHERE estado = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 
    function insert_dolardia(){
        include 'dbconection.php';
        $fecha= $_GET['fecha'];
        $valor= $_GET['valor'];
        $sql = "INSERT INTO tbldolardia VALUES ('$fecha', '$valor', 1)";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
    function update_dolardia(){
        include 'dbconection.php';
        $fecha= $_GET['fecha'];
        $valor= $_GET['valor'];
        $sql = "UPDATE tbldolardia SET valor = $valor WHERE fecha = $fecha";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
?>
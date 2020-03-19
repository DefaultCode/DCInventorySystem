<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getall":
            get_all();
            break;  
        case "insert_tef":
            insert_art();
            break;      
        case "update_tef":
            update_art();
            break;
        case "estado_tef":
            estado_art();
            break;        
    }
 
    function get_all(){
        include 'dbconection.php';
        $codigo = $_GET['codigo'];
        $sql = "SELECT * FROM tbltelefono WHERE codigoinventario = '$codigo'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 
    function insert_tef(){
        include 'dbconection.php';
        $codigoinventario= $_GET['codigoinventario'];
        $serial= $_GET['serial'];
        $numero= $_GET['numero'];
        $sql = "INSERT INTO tbltelefono VALUES ('$codigoinventario', '$serial', '$numero')";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
    function update_tef(){
        include 'dbconection.php';
        $serial= $_GET['serial'];
        $numero = $_GET['numero'];
        $sql = "UPDATE tbltelefono SET nombre = '$nombre', estado = $estado WHERE id = '$codigo'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
    function estado_tef(){
        include 'dbconection.php';
        $serial= $_GET['serial'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tbltelefono SET estado = $estado WHERE serial = '$serial'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC);
            echo json_encode($data);
        } 
    }
?>
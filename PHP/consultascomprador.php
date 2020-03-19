<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getall":
            get_all();
            break;  
        case "search_comp":
            search_comp();
            break;
        case "insert_comp":
            insert_comp();
            break;    
        case "update_comp":
            update_comp();
            break;
        case "estado_comp":
            estado_comp();
            break;        
    }
 
    function get_all(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tblcomprador WHERE estado = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 

    function search_comp(){
        include 'dbconection.php';
        $search= $_GET['cliente'];
        $sql = "SELECT * FROM tblcomprador WHERE estado = 1 AND ( cedula LIKE ('%$search%') OR nombre LIKE ('%$search%'))";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
                $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
                echo json_encode($data);
        }
            
    } 

    function insert_comp(){
        include 'dbconection.php';
        $cedula= $_GET['cedula'];
        $nombre = $_GET['nombre'];
        $apellido = $_GET['apellido'];
        $direccion= $_GET['direccion'];
        $telefono= $_GET['telefono'];
        $sql = "INSERT INTO tblcomprador VALUES ('$cedula', '$nombre', '$apellido','$direccion', '$telefono', 1)";
        $result = mysqli_query($conn,$sql);
    }
    function update_comp(){
        include 'dbconection.php';
        $cedula = $_GET['cedula'];
        $nombre = $_GET['nombre'];
        $apellido = $_GET['apellido'];
        $direccion = $_GET['direccion'];
        $telefono = $_GET['telefono'];
        $estado = $_GET['estado'];
        $sql = "UPDATE tblcomprador SET nombre = '$nombre', apellido = '$apellido', direccion = '$direccion' , telefono = '$telefono',  estado = $estado WHERE cedula = '$cedula'";
        $result = mysqli_query($conn,$sql);
    }
    function estado_comp(){
        include 'dbconection.php';
        $cedula= $_GET['cedula'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tblcomprador SET estado = $estado WHERE cedula = '$cedula'";
        $result = mysqli_query($conn,$sql);
    }
?>
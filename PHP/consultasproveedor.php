<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getall":
            get_all();
            break;  
        case "search_prov":
            search_prov();
            break;   
        case "insert_prov":
            insert_prov();
            break;    
        case "update_prov":
            update_prov();
            break;
        case "estado_prov":
            estado_prov();
            break;        
    }
 
    function get_all(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tblproveedor WHERE estado = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 

    function search_prov(){
        include 'dbconection.php';
        $search= $_GET['proveedor'];
        $sql = "SELECT * FROM tblproveedor WHERE estado = 1 AND ( nombre LIKE ('%$search%') OR id LIKE ('%$search%'))";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
                $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
                echo json_encode($data);
        }else{
            echo("No Results");
        }
            
    } 

    function insert_prov(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $nombre = $_GET['nombre'];
        $direccion= $_GET['direccion'];
        $telefono= $_GET['telefono'];
        $correo=$GET['correo'];
        $sql = "INSERT INTO tblproveedor (id, nombre, direccion, telefono, correo, estado) VALUES ('$id', '$nombre', '$direccion', '$telefono', '$correo',  1)";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($conn) > 0) {
            $afectados = mysqli_num_rows($conn);
            echo($afectados);
        }else{
            echo("No Results");
        }
    }
    function update_prov(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $nombre = $_GET['nombre'];
        $direccion= $_GET['direccion'];
        $telefono= $_GET['telefono'];
        $telefono2= $_GET['telefono2'];
        $correo= $_GET['correo'];
        $estado = $_GET['estado'];
        $sql = "UPDATE tblproveedor SET nombre = '$nombre', direccion = '$direccion' , telefono = '$telefono', telefono2 = '$telefono2', correo = '$correo', estado = $estado WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
    }
    function estado_prov(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tblproveedor SET estado = $estado WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
    }
?>
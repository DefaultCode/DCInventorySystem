<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getall":
            get_all();
            break;  
        case "select_marca":
            select_marca();
            break;     
        case "insert_marca":
            insert_marca();
            break;      
        case "update_marca":
            update_marca();
            break;
        case "estado_marca":
            estado_marca();
            break;        
    }
 
    function get_all(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tblmarca WHERE estado = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 

    function select_marca(){
        include 'dbconection.php';
        $search= $_GET['marca'];
        $sql = "SELECT * FROM tblmarca WHERE estado = 1 AND ( nombre LIKE ('%$search%'))";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
                $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
                echo json_encode($data);
        }
            
    } 

    function insert_marca(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $nombre= $_GET['nombre'];
        $estado = $_GET['estado'];
        $sql = "INSERT INTO tblmarca VALUES ('$id', '$nombre', '$estado')";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
    function update_marca(){
        try {
            include 'dbconection.php';
            $id= $_GET['id'];
            $nombre= $_GET['nombre'];
            $estado = $_GET['estado'];
            $sql = "UPDATE tblmarca SET nombre = '$nombre', estado = '$estado' WHERE id = '$id'";
            $res = mysqli_query($conn,$sql) or die(mysqli_error($conn));
            
            if(mysqli_affected_rows($conn )===0){
                echo "error"    ;
            }else {
                echo "sussess";
            }

        } catch (Exception $th) {
            echo "error";
        }
        
    }
    function estado_marca(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tblmarca SET estado = $estado WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC);
            echo json_encode($data);
        } 
    }
?>
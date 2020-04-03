<?php 
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getall":
            get_all();
            break;  
        case "get_all_history":
            get_all_history();
            break;
        case "insert_Divisa":
            insert_Divisa();
            break;         
        case "update_Divisa":
            update_Divisa();
            break;                
    }

    function get_all(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tbldivisadia WHERE estado = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 

    function get_all_history(){
        include 'dbconection.php';
        $nombre = $_GET['nombre']; 
        $sql = "SELECT * FROM tbldivisadia WHERE (nombre = '$nombre' AND estado = 0)";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo("No Results");
        }

    } 

    function insert_Divisa(){
        include 'dbconection.php';
        $nombre = $_GET['nombre'];
        $valor= $_GET['valor'];
        $sql = "INSERT INTO tbldivisadia (fecha, nombre, valor, estado) VALUES (now(), '$nombre', '$valor', 1)";
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        echo $afectados;
            
    }

    function update_Divisa(){
        include 'dbconection.php';
        $nombre= $_GET['nombre'];
        $valor= $_GET['valor'];
        $fecha= $_GET['fecha'];
        echo($nombre." ".$valor);
        $sql = "UPDATE tbldivisadia SET  valor = $valor WHERE  (fecha = '$fecha' AND nombre = '$nombre' AND estado = 1)";
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        if ($afectados > 0) {
            echo ($afectados);
        }else{
            echo("No Results");
            
        }     
    }
?>
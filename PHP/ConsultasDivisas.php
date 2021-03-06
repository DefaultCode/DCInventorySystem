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
        case "insert_Valor_Divisa":
            insert_Valor_Divisa();
            break;         
        case "Divisa_Cambio":
            Divisa_Cambio();
            break;  
        case "Search_Divisa":
            search_Divisa();
            break;      
        case "update_Divisa":
            update_Divisa();
            break;           
        case "valorDivisaDia":
            get_valor_divisa_dia();
        break;      
    }

    function get_all(){
        include 'dbconection.php';
        $sql = "SELECT tbldivisa.id AS ID, tbldivisa.nombre AS nombre, tbldivisadia.fecha AS fecha, tbldivisadia.valor AS valor FROM tbldivisa LEFT JOIN tbldivisadia ON tbldivisadia.ultimadivisa = 1  AND tbldivisadia.iddivisa = ID";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo("No Results");
        } 
    } 

    function get_all_history(){
        include 'dbconection.php';
        $id = $_GET['iddivisa']; 
        $sql = "SELECT * FROM tbldivisadia WHERE (iddivisa = '$id' AND ultimadivisa = 0)";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo("No Results");
        }

    } 

    function search_Divisa(){
        include 'dbconection.php';
        $nombre = $_GET['nombre']; 
        $sql = "SELECT * FROM tbldivisa WHERE nombre = '$nombre'";
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
        $sql = "INSERT INTO tbldivisa (nombre, estado) VALUES ('$nombre' , 1)";
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        echo $afectados;
    }

    function insert_Valor_Divisa(){
        include 'dbconection.php';
        $id = $_GET['ids'];
        $valor= $_GET['valor'];
        $sql = "CALL insertardivisadia (now(), $id, $valor)";
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        echo $afectados;
    }


    function update_Divisa(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $valor= $_GET['valor'];
        $fecha= $_GET['fecha'];
        $sql = "UPDATE tbldivisadia SET  valor = $valor, ultimadivisa = 1 WHERE  (fecha = $fecha AND iddivisa = '$id')";
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        if ($afectados > 0) {
            echo ($afectados);
        }else{
            echo("No Results");
            
        }     
    }

    function Divisa_Cambio(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $sql = "UPDATE tbldivisadia SET  ultimadivisa = 0 WHERE  ( iddivisa = '$id' AND ultimadivisa = 1)";
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        if ($afectados > 0) {
            echo ($afectados);
        }else{
            echo("No Results");
            
        }     
    }

    function get_valor_divisa_dia(){
        include 'dbconection.php';
        $nombre = $_GET['divisa']; 
        $sql = "SELECT * FROM tbldivisadia WHERE iddivisa = '$nombre' and ultimadivisa = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo("No Results");
        } 
    }

?>
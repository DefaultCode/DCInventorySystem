<?php 
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getall":
            get_all_Traslado();
            break;  
        case "get_all_history":
            get_all_history();
            break;
        case "insert_Tipo_Traslado":
            Insert_Tipo_Traslado();
            break;     
        case "Update_Tipo_Traslado":
            Update_Tipo_Traslado();
            break;  
        case "Search_Traslado":
            search_Traslado();
            break;        
        case "search_Traslado_tipo_Select":
            search_Traslado_tipo_Select();
            break;        
                
           
    }

    function get_all_Traslado(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tbltipomovimiento";
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
        $sql = "SELECT * FROM tblmovimientoinventario WHERE (iddivisa = '$id' AND ultimadivisa = 0)";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo("No Results");
        }

    } 

    function search_Traslado(){
        include 'dbconection.php';
        $nombre = $_GET['nombre']; 
        $sql = "SELECT * FROM tbltipomovimiento WHERE nombre = '$nombre'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo("No Results");
        }

    } 

    function search_Traslado_tipo_Select(){
        include 'dbconection.php'; 
        $sql = "SELECT * FROM tbltipomovimiento WHERE clase IS NULL ";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo("No Results");
        }

    } 

    function Insert_Tipo_Traslado(){
        include 'dbconection.php';
        $nombre = $_GET['nombre'];
        $tipo = $_GET['tipo'];
        $clase = $_GET['clase'];
        if ($clase=="") {
            $sql = "INSERT INTO tbltipomovimiento (nombre, tipo, clase) VALUES ('$nombre' , '$tipo', null)";
        }else{
            $sql = "INSERT INTO tbltipomovimiento (nombre, tipo, clase) VALUES ('$nombre' , '$tipo', '$clase')";
        }
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        echo $afectados;
    }


    function Update_Tipo_Traslado(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $nombre= $_GET['nombre'];
        $clase= $_GET['clase'];
        $tipo= $_GET['tipo'];
        if ($clase == "") {
            $sql = "UPDATE tbltipomovimiento SET  nombre = '$nombre', tipo = '$tipo', clase = '$clase' WHERE  (id = '$id')";
        }else {
            $sql = "UPDATE tbltipomovimiento SET  nombre = '$nombre', tipo = '$tipo', clase = null WHERE  (id = '$id')";
        }
       
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        if ($afectados > 0) {
            echo ($afectados);
        }else{
            echo("No Results");
            
        }     
    }

?>
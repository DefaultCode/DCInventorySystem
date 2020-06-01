<?php
try {
    $consultaG = $_GET['select'];
} catch (\Throwable $th) {
    echo "es un metodo get";
}

switch ($consultaG) {
        case "buscar":
            select_art();
            break;
        case "get_art_marca":
            select_art_marca();
            break;    
        case "getall":
            get_all();
            break;  
        case "insertart":
                insert_art();
                break;      
        case "updateart":
                update_art();
                break;
        case "estadoart":
                estado_art();
                break;     
    }


    function select_art(){
        include 'dbconection.php';
        $search= $_GET['articulo'];
        $sql = "SELECT * FROM tblinventario WHERE estado = 1 AND (codigo LIKE ('%$search%') OR nombre LIKE ('%$search%'))";
        
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
                $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
                echo json_encode($data);
        }
            
    } 
    
    function select_art_marca(){
        include 'dbconection.php';
        $search= $_GET['idmarca'];
        $sql = "SELECT * FROM tblinventario WHERE estado = 1 AND (idmarca LIKE ('%$search%') )";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
                $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
                echo json_encode($data);
        }
            
    } 

    function get_all(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tblinventario WHERE estado = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }
    }
    function insert_art(){
        include 'dbconection.php';
        $codigo= $_GET['codigo'];
        $nombre= $_GET['nombre'];
        $presentacion = $_GET['presentacion'];
        $precio_venta = $_GET['precio_venta'];
        $precio_compra = $_GET['precio_compra'];
        $cantidad = $_GET['cantidad'];
        $idmarca = $_GET['idmarca'];
        $descripcion = $_GET['descripcion'];
        $tipo = $_GET['tipo'];
        $sql = "INSERT INTO tblinventario VALUES ('$codigo', '$nombre', '$presentacion', $precio_venta, 0, $cantidad, '$idmarca', '$descripcion', '$tipo', 1)";
        $result = mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
            $afectados = mysqli_affected_rows($conn);
            echo($afectados);
        }else{
            echo("No Results");
        }

    }
    function update_art(){
        include 'dbconection.php';
        $codigo= $_REQUEST['codigo'];
        $nombre= $_REQUEST['nombre'];
        $presentacion = $_REQUEST['presentacion'];
        $precio_venta = $_REQUEST['precio_venta'];
        $precio_compra = $_REQUEST['precio_compra'];
        $cantidad = $_REQUEST['cantidad'];
        $descripcion = $_REQUEST['descripcion'];
        $estado = $_REQUEST['estado'];
        $sql = "UPDATE tblinventario SET nombre = '$nombre', presentacion = '$presentacion', precio_venta = $precio_venta, precio_compra = $precio_compra, cantidad = $cantidad, descripcion = '$descripcion',tipo= 1, estado = $estado WHERE codigo = '$codigo'";
        echo "$sql";
        mysqli_query($conn,$sql);
        echo $sql;

    }
    function estado_art(){
        include 'dbconection.php';
        $codigo= $_GET['codigo'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tblinventario SET estado = $estado WHERE codigo = '$codigo'";
        $result = mysqli_query($conn,$sql);
        echo $result;
    }
?>
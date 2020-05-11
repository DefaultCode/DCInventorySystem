<?php 

$consulta = $_GET['select']; 

switch ($consulta) {
    case "getall":
        get_all_Traslados();
        break;  
    case "get_all_history":
        get_all_history();
        break;
    case "insert_Traslado_Inventario":
        Insert_Traslado_Inventario();
        break;       
    case "Search_Traslado_Inventario":
        search_Traslado_Inventario();
        break;               
       
}

function get_all_Traslados(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tblmovimientoinventario";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo("No Results");
        } 
} 

function Insert_Traslado_Inventario(){
    include 'dbconection.php';
    $idtipo = $_GET['idtipo'];
    $idproducto = $_GET['idproducto'];
    $inicio = $_GET['inicio'];
    $final = $_GET['final'];
    $descripcion = $_GET['descripcion'];
    $hora = date("H:i:s");
    $fecha = date("Y-m-d");
    $sql = "INSERT INTO tblmovimientoinventario (idtipo, idproducto, cantidadinicial, cantidadfinal, fecha, hora, descripcion) VALUES ('$idtipo' , '$idproducto', $inicio, $final , '$fecha' ,'$hora','$descripcion')";
    $result = mysqli_query($conn,$sql);
    $afectados = mysqli_affected_rows($conn);
    echo $afectados;

}

function search_Traslado_Inventario(){

}

?>
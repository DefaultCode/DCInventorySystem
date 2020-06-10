<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "get_all_presupuesto":
            get_all_presupuesto();
            break;  
        case "insert_presupuesto":
           // ultimopresupuesto();
            insert_presupuesto();
            break;      
        case "estado_presupuesto":
            estado_presupuesto();
            break;    
        case "insertap":
            insert_articulopresupuesto();
            break;
        case "getallap":   
            get_all_articulopresupuesto();
            break;
    }
    function get_all_presupuesto(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tblfacturaventa";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 
    function ultimopresupuesto(){
        include 'dbconection.php';
        $sql = "UPDATE tblpresupuesto SET ultimopresupuesto = 0 WHERE ultimopresupuesto = 1";
        mysqli_query($conn,$sql);

    }
    function insert_presupuesto(){
        include 'dbconection.php';
        $estado = $_GET['estado'];
        $idempleado = $_GET['idempleado'];
        $total = $_GET['total'];
        $tiempohabil = $_GET['tiempohabil'];
        $sql = "CALL insertarpresupuesto ($idempleado, now(), $tiempohabil, $total, $estado)";
        $result = mysqli_query($conn, $sql);
    }
    function estado_presupuesto(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tblpresupuesto SET estado = $estado WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
    }
    function insert_articulopresupuesto(){
        include 'dbconection.php';
        $idpresupuesto = $_GET['idpresupuesto'];
        $idproducto = $_GET['idproducto'];
        $cantidad = $_GET['cantidad'];
        $preciocompra = $_GET['preciocompra'];
        $precioventa = $_GET['precioventa'];
        $sql = "INSERT INTO tblarticuloventa VALUES ('$idpresupuesto', '$idproducto', $cantidad, $preciocompra, $precioventa)";
        $result = mysqli_query($conn,$sql);
    }
    function get_all_articulopresupuesto(){
        include 'dbconection.php';
        $idpresupuesto = $_GET['idpresupuesto'];
        $sql = "SELECT * FROM tblarticulopresupuesto WHERE idpresupuesto= '$idpresupuesto'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
?>
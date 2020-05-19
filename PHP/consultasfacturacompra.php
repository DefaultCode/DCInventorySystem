<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getallfc":
            get_all_facturac();
            break;
        case "getallfCP":
            get_all_facturac_pro();
            break;     
        case "insertfv":
           // ultimafactura();
            insert_facturac();
            break;      
        case "estadofc":
            estado_facturac();
            break;    
        case "insertac":
            insert_articuloc();
            break;
        case "getallac":   
            get_all_articuloc();
            break;
    }
    function get_all_facturac(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tblfacturacompra";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
    function get_all_facturac_pro(){
        include 'dbconection.php';
        $idproveedor = $_GET['idproveedor'];
        $sql = "SELECT * FROM tblfacturacompra WHERE idproveedor = '$idproveedor'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }else{
            echo ("No results");
        } 
    } 
    function ultimafactura(){
        include 'dbconection.php';
        $sql = "UPDATE tblfacturacompra SET ultimafactura = 0 WHERE ultimafactura = 1";
        mysqli_query($conn,$sql);

    }
    function insert_facturac(){
        include 'dbconection.php';
        $id = $_GET['id'];
        $idproveedor = $_GET['idproveedor'];
        $fechaemision = $_GET['fechaemision'];
        $acotaciondolar =$_GET['acotaciondolar'];
        $total = $_GET['total'];
        $tipopago = $_GET['tipopago'];
        $sql = "INSERT INTO tblfacturacompra VALUES ('$id', '$idproveedor', '$fechaemision', now(), now(), $total, $tipopago, 1, $acotaciondolar, 1)";
        $result = mysqli_query($conn, $sql);       
    }
    function estado_facturac(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tblfacturacompra SET estado = $estado WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
    }
    function insert_articuloc(){
        include 'dbconection.php';
        $idfacturacompra = $_GET['idfacturacompra'];
        $idproducto = $_GET['idproducto'];
        $cantidad = $_GET['cantidad'];
        $preciocompra = $_GET['preciocompra'];
        $precioventa = $_GET['precioventa'];
        $sql = "INSERT INTO tblarticulocompra VALUES ('$idfacturacompra', '$idproducto', $cantidad, $preciocompra, precioventa)";
        $result = mysqli_query($conn,$sql);
    }
    function get_all_articuloc(){
        include 'dbconection.php';
        $idfacturacompra = $_GET['idfacturacompra'];
        $sql = "SELECT tblarticulocompra.idfacturacompra AS idfacturacompra, tblinventario.codigo AS codigo, tblinventario.nombre AS nombre, tblinventario.presentacion AS presentacion, tblarticulocompra.preciocompra AS preciocompra, tblarticulocompra.precioventa AS precioventa, tblarticulocompra.cantidad AS cantidad  FROM tblarticulocompra JOIN tblinventario ON tblarticulocompra.idproducto = tblinventario.codigo WHERE tblarticulocompra.idfacturacompra  = '$idfacturacompra'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
?>
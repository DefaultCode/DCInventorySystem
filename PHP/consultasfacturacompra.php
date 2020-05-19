<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getallfc":
            get_all_facturac();
            break;
        case "getallfCP":
            get_all_facturac_pro();
            break;     
        case "insertfc":
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
        $acotaciondolar =$_GET['acotaciondolar'];
        $total=$_GET['total'];
        $tipopago = $_GET['tipopago'];
        $sql = "INSERT INTO tblfacturacompra VALUES ('$id', '$idproveedor', now(), now(), now(), $total, $tipopago, 1, $acotaciondolar, 1)";
        $result = mysqli_query($con, $sql);
        $afectados = mysqli_affected_rows($conn);
        echo $afectados;  
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
        $productos = $_GET['productos'];
        $idproveedor = $_GET["idpoveedor"];
        $i = 0;
        foreach ($productos as $producto) {
            $idproducto = $producto["idpro"];
            $cantidad = (int)$producto["cantidad"];
            $preciocompra = (int)$producto["precio_U"];
            $sql = "INSERT INTO tblarticulocompra VALUES ('$idfacturacompra', '$idproducto', '$idproveedor', $cantidad, $preciocompra)";
            if(mysqli_affected_rows($conn )===0){
                $i  = 0  ;
            }else {
                $i = $i +1;
            }
        }      
        $result = mysqli_query($conn,$sql);
        $afectados = mysqli_affected_rows($conn);
        echo $afectados;
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
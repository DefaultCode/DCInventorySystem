<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getallfv":
            get_all_facturav();
            break;  
        case "getallfvC":
            get_all_facturav_cliente();
            break;              
        case "insertfv":
           // ultimafactura();
            insert_facturav();
            break;      
        case "estadofv":
            estado_facturav();
            break;    
        case "insertav":
            insert_articulov();
            break;
        case "getallav":   
            get_all_articulov();
            break;
    }
    function get_all_facturav(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tblfacturaventa";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 

    function get_all_facturav_cliente(){
        include 'dbconection.php';
        $idcliente = $_GET['idCliente']; ;
        $sql = "SELECT * FROM tblfacturaventa WHERE idcomprador = $idcliente";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 

    function ultimafactura(){
        include 'dbconection.php';
        $sql = "UPDATE tblfacturaventa SET ultimafactura = 0 WHERE ultimafactura = 1";
        mysqli_query($conn,$sql);

    }
    function insert_facturav(){
        include 'dbconection.php';
        $id = $_GET['id'];
        $idcomprador = $_GET['idcomprador'];
        $iduser = $_GET['iduser'];
        $total = $_GET['total'];
        $tipo_pago = $_GET['tipo_pago']; //date(Y/m/d)date(h:i:sa)
        $sql = "INSERT INTO tblfacturaventa VALUES ('$id', '$idcomprador', '$iduser', $total, now() , now(), $tipo_pago, 1, 1)";
        $result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
            
        if(mysqli_affected_rows($conn )===0){
            echo "error"    ;
        }else {
            echo "sussess";
        }
        
    }
    function estado_facturav(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tblfacturaventa SET estado = $estado WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
    }
    function insert_articulov(){
        include 'dbconection.php';
        $idfacturaventa = $_GET['idfacturaventa'];
        $productos = $_GET['productos'];
        $i = 0;
        foreach ($productos as $producto) {
            $idproducto = $producto["idpro"];
            $cantidad = (int)$producto["cantidad"];
            $preciounitario = (int)$producto["precio"];
            $sql = "INSERT INTO tblarticuloventa VALUES ('$idfacturaventa', '$idproducto', $cantidad, $preciounitario)";
            $result = mysqli_query($conn,$sql)or die(mysqli_error($conn));
            if(mysqli_affected_rows($conn )===0){
                $i  = 0  ;
            }else {
                $i = $i +1;
            }
        }   
        if($i===0){
            echo "error"    ;
        }else {
            echo "sussess";
        }

    }
    function get_all_articulov(){
        include 'dbconection.php';
        $idfacturaventa = $_GET['idfacturaventa'];
        $sql = "SELECT tblarticuloventa.idfacturaventa AS idfacturaventa, tblinventario.codigo AS codigo, tblinventario.nombre AS nombre, tblinventario.presentacion AS presentacion, tblarticuloventa.preciounitario AS preciounitario, tblarticuloventa.cantidad AS cantidad  FROM tblarticuloventa JOIN tblinventario ON tblarticuloventa.idproducto = tblinventario.codigo WHERE tblarticuloventa.idfacturaventa = '$idfacturaventa'";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
?>
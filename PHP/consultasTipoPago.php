<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "selec_all":
            get_all_Tipos_pago();
            break;
    }
    function get_all_Tipos_pago(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tbltipopago";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    }
?>
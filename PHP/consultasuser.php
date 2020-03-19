<?php
    $consulta = $_GET['select']; 

    switch ($consulta) {
        case "getall":
            get_all();
            break;  
        case "search_user":
            search_user();
            break;              
        case "insert_user":
            insert_user();
            break;      
        case "update_login":
            update_login();
            break;    
        case "update_user":
            update_art();
            break;
        case "estado_user":
            estado_art();
            break;        
    }
    function search_user(){
        include 'dbconection.php';
        $search= $_GET['user'];
        $sql = "SELECT * FROM tbluser WHERE estado = 1 AND ( user LIKE ('%$search%') OR id LIKE ('%$search%'))";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
                $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
                echo json_encode($data);
        }
            
    } 
    function get_all(){
        include 'dbconection.php';
        $sql = "SELECT * FROM tbluser WHERE estado = 1";
        $result = mysqli_query($conn,$sql);
        if (mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        } 
    } 
    function insert_user(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $user = $_GET['user'];
        $password= $_GET['password'];
        $role= $_GET['role'];
        $sql = "INSERT INTO tbluser (id, user, password, role, estado) VALUES ('$id', '$user', '$password', $role, 1)";
        $result = mysqli_query($conn,$sql);
    }
    function update_user(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $user = $_GET['user'];
        $password= $_GET['password'];
        $role= $_GET['role'];
        $estado = $_GET['estado'];
        $sql = "UPDATE tbluser SET user = '$nombre', password = '$password', role = $role, estado = $estado WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
    }
    function update_login(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $sql = "UPDATE tbluser SET loggedattime = now(), loggedatdate = now() WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
    }
    function estado_user(){
        include 'dbconection.php';
        $id= $_GET['id'];
        $estado= $_GET['estado'];
        $sql = "UPDATE tbluser SET estado = $estado WHERE id = '$id'";
        $result = mysqli_query($conn,$sql);
    }
?>
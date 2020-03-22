<?php 
        $user2= $_GET['User'];
        $pass2= $_GET['Pass'];
        include 'dbconection.php';
        $sql="SELECT * FROM tbluser WHERE user ='$user2' AND password = '$pass2' ";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0) {
            $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
            session_start();
            setcookie("user", $user2 ,time()+3600);
            $_SESSION["usuario"] = $data[0]["user"];
            $_SESSION["roles"] = $data[0]["role"]."";
            echo json_encode($data);
 
        }      
?>
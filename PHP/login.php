<?php 
        $user2= $_GET['User'];
        $pass2= $_GET['Pass'];
        include 'dbconection.php';
        $sql="SELECT * FROM tbluser WHERE user ='$user2' AND password = '$pass2' ";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0) {
            $data   =   mysqli_fetch_all($result,MYSQLI_ASSOC) ;
            echo json_encode($data);
        }      
?>
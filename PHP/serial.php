<?php
include "php_serial.class.php";


factura_venta();

function checksum( $trama ){
   $a = 0;
   $checkant="";
   /* separa la trama bit a bit con la finalidad de   */
   while ($a < strlen($trama)) {
      if ($a === 0) {
         $checkant = $trama[$a];
      }else {     
         $checksum = $checkant ^ $trama[$a];
         $checkant = $checksum;
         //echo "valor:".$trama[$a]." este es ek check anterior $checkant";
      } 
      $a = $a +1;
   }
   $trama = $trama.$checksum;
   return $trama;
}

function datacliente (){
   try {
      $v1 = chr(2);
      $v2 = chr(3);
      $clientname = $_GET['nombreCliente'];
      $clientid = $_GET['rifCed'];
      $clientPhon = $_GET['ClitePhon'];
      $DireccionClien = $_GET['ClienteDir'];
      $linea =1;
      if (strlen($clientname) > 28) {
        
         $nombre = "i0".strval($linea)."Razon Social:".substr($clientname,0,27).$v2; 
         $nombre = checksum($nombre);
         $linea =$linea + 1;
         //mandar a imprimir linea
         sleep(0.5);
         $nombre2 = "i0".strval($linea).substr($clientname,-28).$v2;     
         $nombre = checksum($nombre2);
         $linea =$linea + 1;
         //mandar a imprimir linea
         sleep(0.5);
      }else {
         
         $nombre = "i0".strval($linea)."Razon Social:$clientname".$v2;
         $nombre = checksum( strval( $nombre));
         
         $linea =$linea + 1;
      }
      echo ("nombre cliente $nombre ");
      $linea =$linea + 1;// esto no va aqui fue solo para que coincidiera con el i03 colocar mas caracteres al nombre
      $id = "i0".$linea."RIF:$clientid".$v2;
      $id = checksum($id);
      $linea =$linea + 1;
      //mandar a imprimir linea
      sleep(0.5);
      echo "Id del cliente $id";

      $subdir = $DireccionClien;
      $bandera =1;
      if (strlen($subdir) > 26 ) {
         while (strlen($subdir) > 0) {
            if (strlen($subdir) > 26 && $bandera === 1 ) {
               $direccion =  "i0".$linea."Direccion:".substr($subdir,0,25).$v2; 
               $linea =$linea + 1;
               $direccion = checksum($direccion);
               //mandar a imprimir linea
               echo "primer corte $direccion ";
               sleep(0.5);
               $corte = strlen($subdir)-25;
               $subdir = substr($subdir,-$corte);
               $bandera =2;
            } else {
               if ($bandera ===2) {
                  if (strlen($subdir) > 36 ) {
                     $direccion =  "i0".$linea.substr($subdir,0,36) .$v2; 
                     $linea =$linea + 1;
                     $direccion = checksum($direccion);
                     echo "segundo n $direccion";
                     //mandar a imprimir linea
                     sleep(0.5);
                     $corte = strlen($subdir)-36;
                     $subdir = substr($subdir,-$corte);
                  }else{
                     $direccion =  "i0".$linea.$subdir.$v2; 
                     $linea =$linea + 1;
                     $direccion = checksum($direccion);
                     echo "corte n $direccion";
                     //mandar a imprimir linea
                     sleep(0.5);
                     break;
                  }
                  
               }
            }     
         }      
      } else {
         $direccion =  "i0".$linea."Direccion:$DireccionClien".$v2;
         $direccion = checksum($direccion);
         $linea =$linea + 1;
         echo "direccion del cliente $direccion";
         //mandar a imprimir linea
         sleep(0.5);
      } 

      if ($linea > 9 ) {
         $telefono = "i".$linea."Telefono:$clientPhon".$v2;
         $telefono = checksum($telefono);
         $linea =$linea + 1;
         //mandar a imprimir linea
         sleep(0.5);
         echo " Numero telefono $telefono";
      }else {
         $telefono = "i0".$linea."Telefono$clientPhon".$v2;
         $telefono = checksum($telefono);
         $linea =$linea + 1;
         //mandar a imprimir linea
         sleep(0.5);
         echo " Numero telefono $telefono";
      }
      if ($linea > 9 ) {
         $tfs = "i".$linea."/TSF:Tienda Virus    .V0:DEBE ASIGNAR".$v2;
         $tfs = checksum($tfs);
         $linea =$linea + 1;
         //mandar a imprimir linea
         sleep(0.5);
         echo " Numero tfs $tfs";
      }else {
         $tfs = "i0".$linea."/TSF:Tienda Virus    .V0:DEBE ASIGNAR".$v2;
         $tfs = checksum($tfs);
         $linea =$linea + 1;
         //mandar a imprimir linea
         sleep(0.5);
         echo " Numero tfs $tfs";
     
      }
      if ($linea > 9 ) {
         $TK = "i".$linea."/TK:0000004074 Tienda Virus C.A.".$v2;
         $TK = checksum($TK);
         $linea =$linea + 1;
         echo "TK $TK";
         //mandar a imprimir linea
         sleep(0.5);
      }else {
         $TK = "i0".$linea."/TK:0000004074 Tienda Virus C.A.".$v2;
         $TK = checksum($TK);
         $linea =$linea + 1;
         //mandar a imprimir linea
         echo "TK $TK";
         sleep(0.5);
      }
      if ($linea > 9 ) {
         $LineaBlanca = "i".$linea." ".$v2;
         $LineaBlanca = checksum($LineaBlanca);
         $linea =$linea + 1;
         echo (" linea $LineaBlanca");
         //mandar a imprimir linea
         sleep(0.5);
      }else {
         $LineaBlanca = "i0".$linea." ".$v2;
         $LineaBlanca = checksum($LineaBlanca);
         $linea =$linea + 1;
         //mandar a imprimir linea
         echo (" linea $LineaBlanca");
         sleep(0.5);
      }
      if ($linea > 9 ) {
         $LineaBlanca = "i".$linea." ".$v2;
         $LineaBlanca = checksum($LineaBlanca);
         $linea =$linea + 1;
         //mandar a imprimir linea
         echo (" linea $LineaBlanca");
         sleep(0.5);
      }else {
         $LineaBlanca = "i0".$linea." ".$v2;
         $LineaBlanca = checksum($LineaBlanca);
         $linea =$linea + 1;
         //mandar a imprimir linea
         echo (" linea $LineaBlanca");
         sleep(0.5);
      }
      if ($linea > 9 ) {
         $LineaBlanca = "i".$linea." ".$v2;
         $LineaBlanca = checksum($LineaBlanca);
         $linea =$linea + 1;
         //mandar a imprimir linea
         echo (" linea $LineaBlanca");
         sleep(0.5);
      }else {
         $LineaBlanca = "i0".$linea." ".$v2;
         $LineaBlanca = checksum($LineaBlanca);
         $linea =$linea + 1;
         //mandar a imprimir linea
         echo (" linea $LineaBlanca");
         sleep(0.5);
      }
   
   } catch (\Throwable $th) {
      echo ("error cliente $th"); //throw $th;
   }
  

   
}


function producto ( $trama, $nombrepro,  $cant1, $Precio  ){
    /* inicio del codigo que se encarga de armar la trama de 1 producto*/ 
   $v2 = chr(3);
   //$nombrepro=""; //pasar por el get del ajax
   //$Precio=89000; //pasar por el get del ajax
   $int = (int)$Precio;
   $monto1 = $Precio;
   $largoint = strlen( $monto1 );
   $Preciodec =  round(($Precio-$int)*100);
   $monto2 = strval($Preciodec);
   $largodec = strlen($monto2);
   $agregar = 8 - $largoint;
   $agregar2 = 2 - $largodec;
   $i=0;
   $ceros="";
   while( $i < $agregar){
      $ceros = "0".$ceros; 
      $i = $i+1; 
   }  
   $monto1 = $ceros.$monto1;
   $i=0;
   if( 1 === $agregar2){
      $monto2 = "0".$monto2;
   }   
   $opcion = "Unit";//pasar por el get del ajax
   switch ($opcion) {
      case "Unit":
         $cant = $cant1 . "";
         $largocant = strlen( $cant );
         $largocant = 5 - $largocant;
         $i=0;
         $ceros="";
         while( $i < $largocant){
            $ceros = "0".$ceros; 
            $i = $i+1; 
         }
         $trama = " ".$monto1.$monto2.$ceros.$cant."000".$nombrepro.$v2;  
         
         break;
      case "weight":
         echo"no implementado aun";
         break;
      case 'Size':
         echo"no implementado aun";
         break;   
   }

   return $trama;
   
}



function factura_venta(){
   $v1 = chr(2);
   $v3 = chr(22);
   $v4 = chr(14);   
   try {
      $productos = $_GET['productos']; 
      //$serial = new phpSerial;
      //$serial->deviceSet("COM1:");
      //$serial->confBaudRate(9600);
      //$serial->confParity("even");
      //$serial->confCharacterLength(8);
      //$serial->confStopBits(1);
      //$serial->confFlowControl("none");
      
      // $serial->deviceOpen();
 
      // $serial->sendMessage($v1."i03RIF:$clientid".$v2."q");
      // $serial->sendMessage($v1."i04Direccion:JUAN GRIEGO, EDO. NUEVA E.G");
      // $serial->sendMessage($v1."i05SPARTA".$v2."j");
      // $serial->sendMessage($v1."i06Telefono:$clientPhon".$v2.$v4);
      // $serial->sendMessage($v1."i07/TSF:Tienda. Virus    .V0:DEBE ASIGNAR".$v2."z");
      // $serial->sendMessage($v1."i08/TK:0000004074 Tienda Virus C.A.".$v2."5");
      // $serial->sendMessage($v1."i09".$v2."C");
      // $serial->sendMessage($v1."i10".$v2."K");
      // $serial->sendMessage($v1."i11".$v2."J");
      // $producto = $productos[0];
    
    
      /** imprime los datos del cliente */
      datacliente();
      //envia los mensajes de todos los productos
       
      foreach ($productos as $producto) {
         $trama ="";
         /** llamada del metodo que crea la trama del producto*/
         $trama = producto($trama, $producto["nombre"], $producto["cantidad"], $producto["precio"] );
         /* llamando al calculo del checksum XOR base 8 y colocandole el bit de inicio*/
         $trama = $v1.checksum($trama);
         //$serial->sendMessage($v1.$trama);
         sleep(0.5);
         echo "producto que se va a enviar: $trama";
      }
      //$serial->deviceClose();

  
   } catch (Exception $e) {
      echo 'Excepci�n capturada: ',  $e->getMessage(), "\n";
   }
   
}


 //try {
    //$serial = new phpSerial;
    //$serial->deviceSet("COM1:");
   //$serial->confBaudRate(9600);
   //$serial->confParity("even");
   //$serial->confCharacterLength(8);
   //$serial->confStopBits(1);
   //$serial->confFlowControl("none");

   // $serial->deviceOpen();
   // $v1 = chr(2);
  //  $v2 = chr(3);
  //  $v3 = chr(22);
   // $serial->sendMessage($v1."I0X".$v2.'"'.$v1."I0X".$v2.'"');


    //$serial->deviceClose();

   // echo ("SASDASDA");
  
 //} catch (Exception $e) {
   // echo 'Excepci�n capturada: ',  $e->getMessage(), "\n";
 //}

?>

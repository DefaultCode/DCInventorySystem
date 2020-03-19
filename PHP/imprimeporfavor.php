
<?php
exec("mode COM1: BAUD=9600 PARITY=p DATA=8 STOP=1 to=off dtr=off rts=off");
$fp =fopen("COM1", "w");
fwrite($fp, "02 49 30 58 03 22"); //write string to serial
fclose($fp);
?>
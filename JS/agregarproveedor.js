function checkValuesEmpty(){

	var IDF =document.getElementById("RIFProveedor").value,
    NOMBREF =document.getElementById("NombreProvedor").value,
    DIRECCIONF =document.getElementById("DireccionProvedor").value,
    TELEFONOF =document.getElementById("TelefonoProvedor").value,
    CORREOF =document.getElementById("CorreoProveedor").value,
    empty = false;

    if (IDF===""){
		alert("RIFProveedor Cannot be empty");
		empty=true;
	}
	if (NOMBREF==="") {
		alert("NombreProvedor Cannot be empty");
        empty=true;
    }
    if (DIRECCIONF==="") {
		alert("DireccionProvedor Cannot be empty");
        empty=true;
    }
    if (TELEFONOF===""){
		alert("TelefonoProvedor Cannot be empty");
		empty=true;
	}

        return empty;
}

function Cancelar() {
    window.close();
}

function addHTMLTableRow(){
	checkValuesEmpty()
	var IDF = document.getElementById("RIFProveedor").value,
    NOMBREF =document.getElementById("NombreProvedor").value,
    DIRECCIONF = document.getElementById("DireccionProvedor").value,
    TELEFONOF = document.getElementById("TelefonoProvedor").value,
    TELEFONO2F = "",//document.getElementById("Telefono2Provedor").value,
	CORREOF = document.getElementById("CorreoProveedor").value;
		
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasproveedor.php?select=insert_prov&id="+IDF+"&nombre="+NOMBREF+"&direccion="+DIRECCIONF+"&telefono="+TELEFONOF+"&telefono2="+TELEFONO2F+"&correo="+CORREOF+"&estado="+1,
			data: {},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) { 
                if(parseInt(response) > 0 ){
                    alert("se guardo al proveedor");
                    window.close();
                }else{
                    alert("Error agregando al proveedor ");
                }
			},
			error: function (e) {
				console.log(e);
				if (e.status==200) {
					alert("Proveedor agregado");	   
				} else if (e.status==201) {
					alert("Proveedor error");
				} 
				
			}
			
		}); 
	} catch (error) {
		console.log(error);
	}

}

function editNumber(){
	document.getElementById("texto").innerText = "Edit Telefono" ;
	document.getElementById("AddNSP").style.display="none";
	document.getElementById("DeleteNSP").style.display="none";
	document.getElementById("EditNSP").style.display="none";
	document.getElementById("saveNSP").style.display="";
	document.getElementById("CancelarNSP").style.display="";
	document.getElementById("numeroSelect").style.display="flex";
	document.getElementById("numeroSelect").value=document.getElementById("TelefonoProvedor").value;
}

function addNumber(){
	document.getElementById("texto").innerText = "Add Telefono" ;
	if (document.getElementById("numeroSelect").style.display == "flex") {
		if (document.getElementById("numeroSelect").value !="") {
			var opt = document.createElement('option');
			opt.value = document.getElementById("numeroSelect").value;
			opt.innerHTML = document.getElementById("numeroSelect").value;
			document.getElementById("TelefonoProvedor").appendChild(opt);
			document.getElementById("numeroSelect").style.display = "none";
			document.getElementById("EditNSP").style.display="";
			document.getElementById("DeleteNSP").style.display="";
			document.getElementById("numeroSelect").value ="";	
		} else {
			alert("Por favor no intente insertar un numero en blanco");
		}
		
	} else {
		document.getElementById("numeroSelect").style.display="flex";
		document.getElementById("EditNSP").style.display="none";
		document.getElementById("DeleteNSP").style.display="none";
		document.getElementById("saveNSP").style.display="none";
	} 
}
function saveNumber(){
	
	var ant = document.getElementById("TelefonoProvedor").value;
	var i=0;
	while ( i < document.getElementById("TelefonoProvedor").length) {
		if (document.getElementById("TelefonoProvedor").options[i].value == ant ) {
			if (ant == document.getElementById("numeroSelect").value) {
				alert("Por favor cambie el numero seleccionado o cancele la operacion");
			} else {
				document.getElementById("TelefonoProvedor").options[i].text = document.getElementById("numeroSelect").value;
				document.getElementById("TelefonoProvedor").options[i].value = document.getElementById("numeroSelect").value;
				document.getElementById("TelefonoProvedor").selectedIndex = i;
				document.getElementById("AddNSP").style.display="";
				document.getElementById("EditNSP").style.display="";
				document.getElementById("DeleteNSP").style.display="";
				document.getElementById("saveNSP").style.display="none";
				document.getElementById("numeroSelect").style.display="none";
				document.getElementById("texto").innerText = "Telefono" ;
				break;
			}
		}
		i=i+1;	
	}
	

}

function deleteNumber(){
	var opcion = confirm("Esta Usted Segur@?");
	if (opcion) {
		$("#TelefonoProvedor option[value='" + document.getElementById("TelefonoProvedor").value + "']").remove();
		alert("El numero telefonico fue retirado de la lista Recuerde guardar los datos del Proveedor");
	} else {
		alert("Operacion cancelada");
	}
}

function cancelarNumber(){
	
	document.getElementById("texto").innerText = "Telefonos" ;
	document.getElementById("AddNSP").style.display="";
	document.getElementById("DeleteNSP").style.display="";
	document.getElementById("EditNSP").style.display="";
	document.getElementById("saveNSP").style.display="none";
	document.getElementById("CancelarNSP").style.display="none";
	document.getElementById("numeroSelect").style.display="none";
	document.getElementById("numeroSelect").value="";
	alert("Operacion cancelada");
}
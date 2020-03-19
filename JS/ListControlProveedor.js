var rIndex;

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
    if (CORREOF==="") {
		alert("CorreoProveedor Cannot be empty");
        empty=true;
    }

        return empty;
}

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasproveedor.php?select=getall",
			data: {},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {                        
				$.each(response, function (i, item) {
					try {
						
						var tables = document.getElementById("scroll_table1");
						var newRow = tables.insertRow(tables.length);
						var ID= newRow.insertCell(0);
                        var NOMBRE= newRow.insertCell(1);
                        var DIRECCION= newRow.insertCell(2);
                        var TELEFONO= newRow.insertCell(3);
                        var TELEFONO2= newRow.insertCell(4);
                        var CORREO= newRow.insertCell(5);

											
						
						ID.innerHTML = item.id;
                        NOMBRE.innerHTML = item.nombre;
                        DIRECCION.innerHTML = item.direccion;
                        TELEFONO.innerHTML = item.telefono;
                        TELEFONO2.innerHTML = item.telefono2;
                        CORREO.innerHTML = item.correo;												
	
						ID.className += "thid";
                        NOMBRE.className += "thText";
                        DIRECCION.className += "thText";
                        TELEFONO.className += "thText";
                        TELEFONO2.className += "thText";
                        CORREO.className += "thText";
						
						selectedRowToInput();
					} catch (error) {
						console.log(error);
					}
			
					});
				},
				error: function (e) {
					console.log(e);
				}
			}); 
	} catch (error) {
		console.log(error);
	}

}
function addHTMLTableRow(){
	checkValuesEmpty()
	var tables = document.getElementById("scroll_table1"),
	newRow = tables.insertRow(tables.length),
	ID= newRow.insertCell(0),
	NOMBRE= newRow.insertCell(1),
    DESCRIPCION= newRow.insertCell(2),
    TELEFONO= newRow.insertCell(3),
    TELEFONO2= newRow.insertCell(4),
	CORREO= newRow.insertCell(5),
	IDF = document.getElementById("RIFProveedor").value,
    NOMBREF =document.getElementById("NombreProvedor").value,
    DIRECCIONF = document.getElementById("DireccionProvedor").value,
    TELEFONOF = document.getElementById("TelefonoProvedor").value,
    TELEFONO2F = document.getElementById("Telefono2Provedor").value,
	CORREOF = document.getElementById("CorreoProveedor").value;
		
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasproveedor.php?select=insert_prov&id="+IDF+"&nombre="+NOMBREF+"&direccion="+DIRECCIONF+"&telefono="+TELEFONOF+"&telefono2="+TELEFONO2F+"&correo="+CORREOF+"&estado="+1,
			data: {},
			contentType: "application/json; charset=utf-8",
			dataType: JSON,                    
			cache: false,                       
			success: function(response) { 
			},
			error: function (e) {
				console.log(e);
				if (e.status==200) {
					ID.innerHTML = IDF;
                    NOMBRE.innerHTML = NOMBREF;
                    DESCRIPCION.innerHTML = DIRECCIONF;
                    TELEFONO.innerHTML = TELEFONOF;
					TELEFONO2.innerHTML = TELEFONO2F;
					CORREO.innerHTML = CORREOF;
					alert("Proveedor agregado");	   
				} else if (e.status==201) {
					alert("Proveedor error");
				} 
					
				
			}
			
		}); 
	} catch (error) {
		console.log(error);
	}


	selectedRowToInput();


}
function selectedRowToInput(){
	var tables = document.getElementById("scroll_table1"); 
	for (var i = 0; i <= tables.rows.length-1; i++) {
		tables.rows[i].onclick = function(){
			rIndex=this.rowIndex;
			document.getElementById("RIFProveedor").value= this.cells[0].innerHTML;
			document.getElementById("NombreProvedor").value= this.cells[1].innerHTML;
            document.getElementById("DireccionProvedor").value= this.cells[2].innerHTML;
            document.getElementById("TelefonoProvedor").value= this.cells[3].innerHTML;
            document.getElementById("Telefono2Provedor").value= this.cells[4].innerHTML;
			document.getElementById("CorreoProveedor").value= this.cells[5].innerHTML;
			document.getElementById("guardarP").disabled = true;
		};
	}

}
function editHtmlTableSelectedRow(){

	if (checkValuesEmpty()==false) {

		var tables = document.getElementById("scroll_table1"),
		IDF = document.getElementById("RIFProveedor").value,
        NOMBREF =document.getElementById("NombreProvedor").value,
        DIRECCIONF = document.getElementById("DireccionProvedor").value,
        TELEFONOF = document.getElementById("TelefonoProvedor").value,
        TELEFONO2F = document.getElementById("Telefono2Provedor").value,
		CORREOF = document.getElementById("CorreoProveedor").value;
		try {
			$.ajax({
				type: "POST",
				url: "../PHP/consultasproveedor.php",
				data: {
					select:"update_comp",
					codigo: IDF,
                    nombre: NOMBREF,
                    direccion:DIRECCIONF,
                    telefono: TELEFONOF,
                    telefono2: TELEFONO2F,
					correo:CORREOF,
					estado: 1,
				},
				contentType: "application/json; charset=utf-8",
				dataType: JSON,                    
				cache: false,                       
				success: function(response) { 
				},
				error: function (e) {
					console.log(e.status);
	
					if (e.status==200) {

						tables.rows[rIndex-1].cells[0].innerHTML = IDF;
						tables.rows[rIndex-1].cells[1].innerHTML = NOMBREF;
                        tables.rows[rIndex-1].cells[2].innerHTML = DIRECCIONF;
                        tables.rows[rIndex-1].cells[3].innerHTML = TELEFONOF;
						tables.rows[rIndex-1].cells[4].innerHTML = TELEFONO2F;
						tables.rows[rIndex-1].cells[5].innerHTML = CORREOF;

						document.getElementById("RIFProveedor").value="";
						document.getElementById("NombreProvedor").value="";
                        document.getElementById("DireccionProvedor").value="";
                        document.getElementById("TelefonoProvedor").value="";
						document.getElementById("Telefono2Provedor").value="";
						document.getElementById("CorreoProveedor").value="";
						alert("Proveedor Editado");	   
						document.getElementById("guardarP").disabled = false;
					} else if (e.status==201) {
						alert("Proveedor error");

					} 
						
					
				}
				
			}); 
		} catch (error) {
			console.log(error);
		}
	
	
	
	}

}

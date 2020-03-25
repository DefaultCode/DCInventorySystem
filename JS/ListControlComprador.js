var rIndex;

function checkValuesEmpty(){

	var IDF =document.getElementById("IDCliente").value,
    NOMBREF =document.getElementById("NombreCliente").value,
    APELLIDOF =document.getElementById("ApellidoCliente").value,
    DIRECCIONF =document.getElementById("DireccionCliente").value,
    TELEFONOF =document.getElementById("TelefonoCliente").value,
     empty = false;

    if (IDF===""){
		alert("IDCliente Cannot be empty");
		empty=true;
	}
	if (NOMBREF==="") {
		alert("NombreCliente Cannot be empty");
        empty=true;
    }
    if (APELLIDOF===""){
		alert("ApellidoCliente Cannot be empty");
		empty=true;
	}
	if (DIRECCIONF==="") {
		alert("DireccionCliente Cannot be empty");
        empty=true;
    }
    if (TELEFONOF==="") {
		alert("TelefonoCliente Cannot be empty");
        empty=true;
    }

        return empty;
}

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultascomprador.php?select=getall",
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
                        var APELLIDO= newRow.insertCell(2);
                        var DIRECCION= newRow.insertCell(3);
                        var TELEFONO= newRow.insertCell(4);

											
						
						ID.innerHTML = item.cedula;
                        NOMBRE.innerHTML = item.nombre;
                        APELLIDO.innerHTML = item.apellido;
                        DIRECCION.innerHTML = item.direccion;
                        TELEFONO.innerHTML = item.telefono;												
	
						ID.className += "thid";
						NOMBRE.className += "thText";
                        APELLIDO.className += "thText";
                        DIRECCION.className += "thText";
                        TELEFONO.className += "thText";
						
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
	APELLIDO= newRow.insertCell(2),
	DESCRIPCION= newRow.insertCell(3),
	TELEFONO= newRow.insertCell(4),
	IDF = document.getElementById("IDCliente").value,
	NOMBREF =document.getElementById("NombreCliente").value,
	APELLIDOF = document.getElementById("ApellidoCliente").value,
	DIRECCIONF = document.getElementById("DireccionCliente").value,
	TELEFONOF = document.getElementById("TelefonoCliente").value;
		
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultascomprador.php?select=insert_comp&cedula="+IDF+"&nombre="+NOMBREF+"&apellido="+APELLIDOF+"&direccion="+DIRECCIONF+"&telefono="+TELEFONOF+"&estado="+1,
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
					APELLIDO.innerHTML = APELLIDOF;
					DESCRIPCION.innerHTML = DIRECCIONF;
					TELEFONO.innerHTML = TELEFONOF;
					alert("Cliente agregado");	   
				} else if (e.status==201) {
					alert("Cliente error");
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
			document.getElementById("IDCliente").value= this.cells[0].innerHTML;
			document.getElementById("NombreCliente").value= this.cells[1].innerHTML;
			document.getElementById("ApellidoCliente").value= this.cells[2].innerHTML;
			document.getElementById("DireccionCliente").value= this.cells[3].innerHTML;
			document.getElementById("TelefonoCliente").value= this.cells[4].innerHTML;
			document.getElementById("guardarP").disabled = true;
			var tables2 = document.getElementById("scroll_table3");
			while(tables2.rows.length > 2) {
				tables2.deleteRow(2);
			}
			try {
				$.ajax({
					type: "GET",
					url: "../PHP/consultasfacturaventa.php?select=getallfvC",
					data: {
						idCliente : this.cells[0].innerHTML ,
					},
					contentType: "application/json; charset=utf-8",
					dataType: 'json',                    
					cache: false,                       
					success: function(response) {                        
						$.each(response, function (i, item) {
							try {
								
								var tables = document.getElementById("scroll_table3");
								var newRow = tables.insertRow(tables.length);
								var ID= newRow.insertCell(0);
								var TOTAL= newRow.insertCell(1);
								var FECHA= newRow.insertCell(2);
								var PRODUCTOS= newRow.insertCell(3);			
								
								ID.innerHTML = item.id;
								TOTAL.innerHTML = item.total;
								FECHA.innerHTML = item.fechaemision;
								try {
									$.ajax({
										type: "GET",
										url: "../PHP/consultasfacturaventa.php?select=getallav",
										data: {
											idfacturaventa: item.id,
										},
										contentType: "application/json; charset=utf-8",
										dataType: 'json',                    
										cache: false,                       
										success: function(response) {
											var opciones ="";					
											$.each(response, function (i, item) {
												opciones = opciones + '<a class="Aelemente" > <i class="fas fa-cubes" style="float: left; font-size: 18px; margin-left:2px;margin-right:2px ;" ></i> <p class="nombre"  >'+item.nombre+'</p> <p class="cantidadP"  > '+item.cantidad+' </p> <p class="precioP" >'+ (item.preciounitario * item.cantidad) +'</p> </a>';
											});
											
											var scrip = "<script type='text/javascript' >function abrir"+i+"(){ if (document.getElementById('dropdownP"+i+"').style.display == 'flex'  ){ document.getElementById('dropdownP"+i+"').style.display = 'none'; document.getElementById('icon"+i+"').className ='fas fa-expand-arrows-alt';  } else {document.getElementById('dropdownP"+i+"').style.display = 'flex'; document.getElementById('icon"+i+"').className = 'fas fa-compress-arrows-alt'; }}</script>"
											$(PRODUCTOS).html(scrip);
											PRODUCTOS.innerHTML = "<div class='Cproductos'><button class='Abrir' onclick='abrir"+i+"()' ><i id='icon"+i+"' class='fas fa-stream'  ></i></button><section id='dropdownP"+i+"' class='dropdown-contentP'>"+opciones+"</section></div>" ;
											
											
										},
										error: function (e) {
											PRODUCTOS.innerHTML ="no tiene productos";			 
										}
									}); 
								} catch (error) {
									console.log(error);
								}
								
								
								ID.className += "thid";
								TOTAL.className += "thDin";
								FECHA.className += "thText";
								PRODUCTOS.className += "tdselec";
								
								
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
		

		};
	}

}
function editHtmlTableSelectedRow(){

	if (checkValuesEmpty()==false) {

		var tables = document.getElementById("scroll_table1"),
		IDF = document.getElementById("IDCliente").value,
		NOMBREF =document.getElementById("NombreCliente").value,
		APELLIDOF = document.getElementById("ApellidoCliente").value,
		DIRECCIONF = document.getElementById("DireccionCliente").value,
		TELEFONOF = document.getElementById("TelefonoCliente").value;
		try {
			$.ajax({
				type: "POST",
				url: "../PHP/consultascomprador.php",
				data: {
					select:"update_comp",
					codigo: IDF,
					nombre: NOMBREF,
					apellido: APELLIDOF,
					direccion:DIRECCIONF,
					telefono:TELEFONOF,
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
						tables.rows[rIndex-1].cells[2].innerHTML = APELLIDOF;
						tables.rows[rIndex-1].cells[3].innerHTML = DIRECCIONF;
						tables.rows[rIndex-1].cells[4].innerHTML = TELEFONOF;

						document.getElementById("IDCliente").value="";
						document.getElementById("NombreCliente").value="";
						document.getElementById("ApellidoCliente").value="";
						document.getElementById("DireccionCliente").value="";
						document.getElementById("TelefonoCliente").value="";
						alert("Cliente Editado");	   
						document.getElementById("guardarP").disabled = false;
					} else if (e.status==201) {
						alert("Cliente error");

					} 
						
					
				}
				
			}); 
		} catch (error) {
			console.log(error);
		}
	
	
	
	}

}

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
                        var CORREO= newRow.insertCell(4);	
						
						ID.innerHTML = item.id;
                        NOMBRE.innerHTML = item.nombre;
                        DIRECCION.innerHTML = item.direccion;
                        TELEFONO.innerHTML = item.telefono;
                        CORREO.innerHTML = item.correo;												
	
						ID.className += "thid";
                        NOMBRE.className += "thText";
                        DIRECCION.className += "thText";
                        TELEFONO.className += "thText";
                        CORREO.className += "tdCorreo";
						
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
	CORREO= newRow.insertCell(4),
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
			try {
				$.ajax({
					type: "GET",
					url: "../PHP/consultasproveedor.php",
					data: {
						select:"search_prov",
						proveedor: this.cells[0].innerHTML,
					},
					contentType: "application/json; charset=utf-8",
					dataType: 'json',                    
					cache: false,                       
					success: function(response) {
						var opciones ="";					
						$.each(response, function (i, item) {
							opciones = opciones + "<option value='"+item.telefono+"' style='font-size: 18px;'>"+item.telefono+"</option>";
							if(item.telefono2 != null){
								opciones = opciones + "<option value='"+item.telefono2+"' style='font-size: 18px;'>"+item.telefono2+"</option>";
							}
						});
						document.getElementById("TelefonoProvedor").innerHTML = opciones ;
						
					},
					error: function (e) {
						PRODUCTOS.innerHTML ="no tiene productos";			 
					}
				}); 
			} catch (error) {
				console.log(error);
			}
			
			//document.getElementById("TelefonoProvedor").value= this.cells[3].innerHTML;
			//document.getElementById("Telefono2Provedor").value= this.cells[4].innerHTML;
			
			document.getElementById("EditNSP").style.display = "" ;
			document.getElementById("DeleteNSP").style.display = "" ;
			document.getElementById("CorreoProveedor").value= this.cells[4].innerHTML;
			
			var tables2 = document.getElementById("scroll_table3");
			while(tables2.rows.length > 1) {
				tables2.deleteRow(1);
			}
			try {
				$.ajax({
					type: "GET",
					url: "../PHP/consultasfacturacompra.php",
					data: {
						select:"getallfCP",
						idproveedor : this.cells[0].innerHTML,
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
								var COSTO= newRow.insertCell(1);
								var FECHA= newRow.insertCell(2);
								var PRODUCTOS= newRow.insertCell(3);			
								
								ID.innerHTML = item.id;
								COSTO.innerHTML = item.total;
								FECHA.innerHTML = item.fechaemision;
								try {
									$.ajax({
										type: "GET",
										url: "../PHP/consultasfacturacompra.php",
										data: {
											select :"getallac",
											idfacturacompra: item.id,
										},
										contentType: "application/json; charset=utf-8",
										dataType: 'json',                    
										cache: false,                       
										success: function(response) {
											var opciones ="";					
											$.each(response, function (i, item) {
												opciones = opciones + '<a class="Aelemente" > <i class="fas fa-cubes" style="float: left; font-size: 18px; margin-left:2px;margin-right:2px ;" ></i> <p class="nombre"  >'+item.nombre+'</p> <p class="cantidadP"  > '+item.cantidad+' </p> <p class="precioP" >'+ (item.preciocompra * item.cantidad) +'</p> </a>';
											});
											
											var scrip = "<script type='text/javascript' >function abrir"+i+"(){ if (document.getElementById('dropdownP"+i+"').style.display == 'flex'  ){ document.getElementById('dropdownP"+i+"').style.display = 'none'; document.getElementById('icon"+i+"').className ='fas fa-expand-arrows-alt';  } else {document.getElementById('dropdownP"+i+"').style.display = 'flex'; document.getElementById('icon"+i+"').className = 'fas fa-compress-arrows-alt'; }}</script>"
											$(PRODUCTOS).html(scrip);
											PRODUCTOS.innerHTML = "<div class='Cproductos'><button class='Abrir' onclick='abrir"+i+"()' ><i id='icon"+i+"' class='fas fa-stream'  ></i></button><section id='dropdownP"+i+"' class='dropdown-contentP'>"+opciones+"</section></div>" ;
											
											
										},
										error: function (e) {
											PRODUCTOS.innerHTML ="no tiene productos";	
											console.log(e);		 
										}
									}); 
								} catch (error) {
									console.log(error);
								}
								
								
								ID.className += "thid";
								COSTO.className += "thDin";
								FECHA.className += "thText";
								PRODUCTOS.className += "tdselec";
								
								
								selectedRowToInput();
							} catch (error) {
								console.log(error);
							}
					
							});
						},
						error: function (e) {
							console.log(e.responseText);
							if (e.responseText == "No Results") {
								alert("No se poseen transacciones asociadas a este proveedor");
							} else {
								alert("Error cargando los datoss");
							}
						}
					}); 
			} catch (error) {
				console.log(error);
			}
			
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
						tables.rows[rIndex-1].cells[4].innerHTML = CORREOF;

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
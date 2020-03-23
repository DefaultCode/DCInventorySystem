var rIndex;


function checkValuesEmpty(){

	var IDF = document.getElementById("IDProducto").value,
	NOMBREF =document.getElementById("NombreProducto").value,
	CANTIDADF = document.getElementById("CantidadP").value,
	PRESENTACIONF = document.getElementById("PresentacionP").value,
	PRECIOVF = document.getElementById("PrecioV").value,
	PRECIOCF = document.getElementById("PrecioC").value,
	MARCAF = document.getElementById("MarcaP").value,
	TIPOF = document.getElementById("TipoP").value,
	empty = false;

	if (IDF===""){
		alert("ID Cannot be empty");
		empty=true;
	}
	if (NOMBREF=== "") {
		alert("Nombre Producto Cannot be empty");
		empty=true;
	}
	if (parseInt(CANTIDADF)<=1) {
		alert("Porfavor inserte almenos 1 producto");
		document.getElementById("CantidadP").style.backgroundColor = "red";
		empty=true;
	}
	if (PRESENTACIONF==="") {
		alert("Presentacion Cannot be empty");
		empty=true;
	}
	if (PRECIOVF==="") {
		alert("Precio V Cannot be empty");
		empty=true;
	}
	if (PRECIOCF==="") {
		alert("Precio C Cannot be empty");
		empty=true;
	}
	if (MARCAF==="") {
		alert("Marca Cannot be empty");
		empty=true;
	}
	if (TIPOF==="") {
		alert("Tipo Cannot be empty");
		empty=true;
	}
	return empty;
}

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasVentas.php?select=getall",
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
						var CANTIDAD= newRow.insertCell(2);
						var PRESENTACION= newRow.insertCell(3);
						var PRECIOV= newRow.insertCell(4);
						var PRECIOC = newRow.insertCell(5);
						var MARCA= newRow.insertCell(6);
						var TIPO= newRow.insertCell(7);
						
						
						ID.innerHTML = item.codigo;
						NOMBRE.innerHTML = item.nombre;
						CANTIDAD.innerHTML = item.cantidad;
						PRESENTACION.innerHTML = item.presentacion;
						PRECIOV.innerHTML = item.precio_venta;
						PRECIOC.innerHTML = item.precio_compra;	
							try {
								$.ajax({
									type: "GET",
									url: "../PHP/consultasmarca.php?select=select_marca",
									data: {
										marca : item.idmarca,
									},
									contentType: "application/json; charset=utf-8",
									dataType: 'json',                    
									cache: false,                       
									success: function(response) {                        
										$.each(response, function (i, item) {
											MARCA.innerHTML = item.nombre ;						
										});
									},
									error: function (e) {
										 
									}
								}); 
							} catch (error) {
								console.log(error);
							}
						if (item.tipo==1) {
							TIPO.innerHTML ="Telefono";
						} else {
							TIPO.innerHTML	="Otros";
						}
						
	
						ID.className += "thid";
						NOMBRE.className += "thText";
						CANTIDAD.className += "thCant";
						PRESENTACION.className += "thText";
						PRECIOV.className += "thDin";
						PRECIOC.className += "thDin";
						MARCA.className += "thDin";
						TIPO.className += "thCant";
						
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

	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasmarca.php?select=getall",
			data: {
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {
				                        
				$.each(response, function (i, item) {
					var select = document.getElementById("MarcaP");	
					var opciones = document.createElement("option");
					opciones.text =  item.nombre;
					opciones.value = item.nombre;
					opciones.title = item.id; 
					select.add(opciones);
					
				});

			},
			error: function (e) {
								 
			}
		}); 
	} catch (error) {
		console.log(error);
	}
						

}


function addHTMLTableRow(){
	checkValuesEmpty()
	var tables = document.getElementById("scroll_table"),
	newRow = tables.insertRow(tables.length),
	ID= newRow.insertCell(0),
	NOMBRE= newRow.insertCell(1),
	CANTIDAD= newRow.insertCell(2),
	PRESENTACION= newRow.insertCell(3),
	PRECIOV= newRow.insertCell(4),
	PRECIOC= newRow.insertCell(5),
	MARCA = newRow.insertCell(6)
	TIPO = newRow.insertCell(7)
	DESCRIPCION= newRow.insertCell(8),
	IDF = document.getElementById("IDProducto").value,
	NOMBREF =document.getElementById("NombreProducto").value,
	CANTIDADF = document.getElementById("CantidadP").value,
	PRESENTACIONF = document.getElementById("PresentacionP").value,
	PRECIOVF = document.getElementById("PrecioV").value,
	PRECIOCF = document.getElementById("PrecioC").value,
	MARCAF = document.getElementById("MarcaP").value,
	TIPOF = document.getElementById("TipoP").value;
	if (TIPOF == "Telefono") {
		TIPOF = 1;
	} 
	else{
		TIPOF = 0;	
	}
	DESCRIPCIONF = document.getElementById("DescripcionP").value;

	
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasVentas.php?select=insertart&codigo="+IDF+"&nombre="+NOMBREF+"&presentacion="+PRESENTACIONF+"&precio_venta="+PRECIOVF+"&precio_compra="+PRECIOCF+"&cantidad="+CANTIDADF+"&idmarca="+MARCAF+"&descripcion="+DESCRIPCIONF+"&tipo="+TIPOF,
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
					CANTIDAD.innerHTML = CANTIDADF;
					PRESENTACION.innerHTML = PRESENTACIONF;
					PRECIOV.innerHTML = PRECIOVF;
					PRECIOC.innerHTML = PRECIOCF;
					MARCA.innerHTML = MARCAF;
					TIPO.innerHTML = TIPOF;

					ID.className += "thid";
					NOMBRE.className += "thText";
					CANTIDAD.className += "thCant";
					PRESENTACION.className += "thText";
					PRECIOV.className += "thDin";
					PRECIOC.className += "thDin";
					MARCA.className += "thDin";
					TIPO.className += "thCant";

					alert("producto agregado");	   
				} else if (e.status==201) {
					alert("producto error");
				} 
					
				
			}
			
		}); 
	} catch (error) {
		console.log(error);
	}


	selectedRowToInput();


}

function selectedRowToInput(){
	var tables = document.getElementById("scroll_table"); 
	for (var i = 0; i <= tables.rows.length-1; i++) {
		tables.rows[i].onclick = function(){
			rIndex=this.rowIndex;
			document.getElementById("IDProducto").value= this.cells[0].innerHTML;
			document.getElementById("NombreProducto").value= this.cells[1].innerHTML;
			document.getElementById("CantidadP").value= this.cells[2].innerHTML;
			document.getElementById("PresentacionP").value= this.cells[3].innerHTML;
			document.getElementById("PrecioV").value= this.cells[4].innerHTML;
			document.getElementById("PrecioC").value= this.cells[5].innerHTML;
			document.getElementById("MarcaP").value= this.cells[6].innerHTML;
			console.log(this.cells[6].innerHTML);
			document.getElementById("TipoP").value= this.cells[7].innerHTML;
			document.getElementById("Dolar").style.visibility = "visible"  ;
			document.getElementById("DolarD").value= parseInt(this.cells[4].innerHTML)*75000;
			document.getElementById("Porcentaje").style.visibility = "visible"  ;
			document.getElementById("PorcentajeD").value= ((parseFloat(this.cells[4].innerHTML) - parseFloat(this.cells[5].innerHTML))/parseFloat(this.cells[5].innerHTML))*100;
			// para verificar que el porcentaje esta correcta console.log( (((parseFloat(this.cells[4].innerHTML) - parseFloat(this.cells[5].innerHTML))/parseFloat(this.cells[5].innerHTML))) * parseFloat(this.cells[5].innerHTML )			
			document.getElementById("Aumento").style.visibility = "visible"  ;
			document.getElementById("AumentoN").value = (((parseFloat(this.cells[4].innerHTML) - parseFloat(this.cells[5].innerHTML))/parseFloat(this.cells[5].innerHTML)) * parseFloat(this.cells[5].innerHTML) );
			document.getElementById("guardarP").disabled = true;
		};
	}

}

function editHtmlTableSelectedRow(){

	if (checkValuesEmpty()==false) {

		var tables = document.getElementById("scroll_table"),
		IDF = document.getElementById("IDProducto").value,
		NOMBREF =document.getElementById("NombreProducto").value,
		CANTIDADF = document.getElementById("CantidadP").value,
		PRESENTACIONF = document.getElementById("PresentacionP").value,
		PRECIOVF = document.getElementById("PrecioV").value,
		PRECIOCF = document.getElementById("PrecioC").value,
		MARCAF = document.getElementById("MarcaP").value,
		TIPOF = document.getElementById("TipoP").value;
		if (TIPOF == "Telefono") {
			TIPOF = 1;
		} 
		else{
			TIPOF = 0;	
		}
		DESCRIPCIONF = document.getElementById("DescripcionP").value;
		try {
			$.ajax({
				type: "GET",
				url: "../PHP/consultasVentas.php",
				data: {
					select:"updateart",
					codigo: IDF,
					nombre: NOMBREF,
					presentacion: PRESENTACIONF,
					precio_venta:PRECIOVF,
					precio_compra:PRECIOCF,
					cantidad:CANTIDADF,
					descripcion:DESCRIPCIONF,
					tipo: TIPOF,
					estado: 1,
				},
				contentType: "application/json; charset=utf-8",
				dataType: JSON,                    
				cache: false,                       
				success: function(response) { 
				},
				error: function (e) {
					console.log(e);
	
					if (e.status==200) {
						tables.rows[rIndex].cells[0].innerHTML = IDF;
						tables.rows[rIndex].cells[1].innerHTML = NOMBREF;
						tables.rows[rIndex].cells[2].innerHTML = CANTIDADF;
						tables.rows[rIndex].cells[3].innerHTML = PRESENTACIONF;
						tables.rows[rIndex].cells[4].innerHTML = PRECIOVF;
						tables.rows[rIndex].cells[5].innerHTML = PRECIOCF;
						tables.rows[rIndex].cells[6].innerHTML = MARCAF;
						tables.rows[rIndex].cells[7].innerHTML = TIPOF;


						document.getElementById("IDProducto").value="";
						document.getElementById("NombreProducto").value="";
						document.getElementById("CantidadP").value="";
						document.getElementById("PresentacionP").value="";
						document.getElementById("PrecioV").value="";
						document.getElementById("PrecioC").value="";
						document.getElementById("MarcaP").value="";
						document.getElementById("TipoP").value="";
						document.getElementById("DescripcionP").value="";
						alert("Producto Editado");	   
						document.getElementById("guardarP").disabled = false;
					} else if (e.status==201) {
						alert("producto error");

					} 
						
					
				}
				
			}); 
		} catch (error) {
			console.log(error);
		}
	
	
	
	}

}


function removeHtmlTableSelectedReow(){
	
	var tables = document.getElementById("scroll_table"),
	IDF = document.getElementById("IDProducto").value;

	try {
		$.ajax({
			type: "POST",
			url: "../PHP/consultasVentas.php",
			data: {
				select:"estadoart",
				codigo: IDF,
				estado: 0,
			},
			contentType: "application/json; charset=utf-8",
			dataType: JSON,                    
			cache: false,                       
			success: function(response) { 
			},
			error: function (e) {
				console.log(e.status);

				if (e.status==200) {

					document.getElementById("IDProducto").value="";
					document.getElementById("NombreProducto").value="";
					document.getElementById("CantidadP").value="";
					document.getElementById("PresentacionP").value="";
					document.getElementById("PrecioV").value="";
					document.getElementById("PrecioC").value="";
					document.getElementById("MarcaP").value="";
					document.getElementById("TipoP").value="";
					document.getElementById("DescripcionP").value="";
					alert("Producto Eliminado");	   	
					tables.deleteRow(rIndex);
					document.getElementById("guardarP").disabled = false;
				} else if (e.status==201) {
					alert("producto error");

				} 
					
				
			}
			
		}); 
	} catch (error) {
		console.log(error);
	}


	document.getElementById("IDProducto").value = "";
	document.getElementById("NombreProducto").value = "";
	document.getElementById("CantidadP").value = "";
	document.getElementById("PresentacionP").value = "";
	document.getElementById("FechaCompraP").value = "";
	document.getElementById("MontoTotalP").value = "";
	document.getElementById("PrecioD").value = "";
	document.getElementById("MarcaP").value = "";
	document.getElementById("TipoP").value = "";
	document.getElementById("DescripcionP").value = "";

	

}
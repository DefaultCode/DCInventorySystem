var rIndex;

function checkValuesEmpty(){

	var IDF =document.getElementById("NroFactura").value,
	RIFF =document.getElementById("RIFProPago").value,
	EMISIONF = document.getElementById("EmisionPago").value,
    MONTOF =document.getElementById("MontoPagar").value,
    TIPOF =document.getElementById("TipoPago").value,
     empty = false;

    if (IDF===""){
		alert("NroFactura Cannot be empty");
		empty=true;
	}
	if (RIFF==="") {
		alert("RIFProPago Cannot be empty");
        empty=true;
	}
	if (EMISIONF===""){
		alert("EmisionPago Cannot be empty");
		empty=true;
	}
    if (MONTOF===""){
		alert("MontoPagar Cannot be empty");
		empty=true;
	}
	if (TIPOF==="") {
		alert("TipoPago Cannot be empty");
        empty=true;
    }
        return empty;
}

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasfacturacompra.php?select=getallfc",
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
                        var RIF= newRow.insertCell(1);
                        var NOMBRE= newRow.insertCell(2);
                        var EMISION= newRow.insertCell(3);
						var RECEPCION= newRow.insertCell(4);
						var HORA= newRow.insertCell(5);
                        var TOTAL= newRow.insertCell(6);
						var TIPO= newRow.insertCell(7);
						var ESTADO= newRow.insertCell(8);
                        var ACOTACION= newRow.insertCell(9);

											
						
                        ID.innerHTML = item.id;
						RIF.innerHTML = item.idproveedor;
						try {
							$.ajax({
								type: "GET",
								url: "../PHP/consultasproveedor.php",
								data: {
									select:"search_prov",
									proveedor:item.idproveedor
								},
								contentType: "application/json; charset=utf-8",
								dataType: 'json',                    
								cache: false,                       
								success: function(response) {                        
									$.each(response, function (i, item) {
										NOMBRE.innerHTML=item.nombre;	
									});
								},
								error: function (e) {
									console.log(e);
								}
							}); 
						} catch (error) {
								console.log(error);
						} 
                        
                        EMISION.innerHTML = item.fechaemision;
						RECEPCION.innerHTML = item.fecharecepcion;
						HORA.innerHTML = item.horarecepcion;
						TOTAL.innerHTML = item.total;
						switch (item.tipopago) {
							case "0":
								TIPO.innerHTML = "Debito";			
								break;
							case "1":
								TIPO.innerHTML = "Credito";			
								break;
							case "2":
								TIPO.innerHTML = "Efectivo";			
								break;
						}
						switch (item.estado) {
							case "0":
								ESTADO.innerHTML = "Por Pagar";			
								break;
							case "1":
								ESTADO.innerHTML = "Pagada";			
								break;
							case "2":
								ESTADO.innerHTML = "Cancelada";			
								break;
						}
                        ACOTACION.innerHTML = item.acotaciondolar;													
	
                        ID.className += "thid";
                        RIF.className += "thid";
						NOMBRE.className += "thText";
                        EMISION.className += "thid";
						RECEPCION.className += "thid";
						HORA.className += "thid";
                        TOTAL.className += "thDin";
						TIPO.className += "thid";
						ESTADO.className += "thid";	
                        ACOTACION.className += "thDin";
						
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

function chargeP(){
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
						
						var tables = document.getElementById("scroll_table5");
						var newRow = tables.insertRow(tables.length);
						var ID= newRow.insertCell(0);
						var NOMBRE= newRow.insertCell(1);
						var PRECIOC = newRow.insertCell(2);
						var CANTIDAD= newRow.insertCell(3);
						
						ID.innerHTML = item.codigo;
						NOMBRE.innerHTML = item.nombre;
						CANTIDAD.innerHTML = item.cantidad;
						PRECIOC.innerHTML = item.precio_compra;	
	
						ID.className += "thid";
						NOMBRE.className += "thText";
						CANTIDAD.className += "thCant";
						PRECIOC.className += "thDin";
						
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
	RIF= newRow.insertCell(1),
    NOMBRE= newRow.insertCell(2),
    EMISION= newRow.insertCell(3),
	RECEPCION= newRow.insertCell(4),
	HORA= newRow.insertCell(5),
    TOTAL= newRow.insertCell(6),
    TIPO= newRow.insertCell(7),
    ACOTACION= newRow.insertCell(8),
	IDF = document.getElementById("NroFactura").value,
	RIFF =document.getElementById("RIFProPago").value,
	MONTOF = document.getElementById("MontoPagar").value,
	TIPOF = document.getElementById("TipoPago").value,
	EMISIONF = document.getElementById("EmisionPago").value;
	console.log(EMISIONF);
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasfacturacompra.php?select=insertfv&id="+IDF+"&idproveedor="+RIFF+"&fechaemision="+EMISIONF+"&total="+MONTOF+"&tipopago="+TIPOF+"&estado="+1+"&acotaciondolar="+66000,
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
					RIF.innerHTML = RIFF;
					NOMBRE.innerHTML = "Inserte Nombre Aqui"
					EMISION.innerHTML = EMISIONF;
					RECEPCION.innerHTML = "";
					HORA.innerHTML = "";
					TOTAL.innerHTML = MONTOF;
					TIPO.innerHTML = TIPOF;
					ACOTACION.innerHTML = 66000;

					alert("Pago agregado");	   
				} else if (e.status==201) {
					alert("Pago error");
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
			document.getElementById("NroFactura").value= this.cells[0].innerHTML;
			document.getElementById("RIFProPago").value= this.cells[1].innerHTML;
			document.getElementById("EmisionPago").value= this.cells[3].innerHTML;
			document.getElementById("MontoPagar").value= this.cells[6].innerHTML;
			document.getElementById("TipoPago").value= this.cells[7].innerHTML;
			document.getElementById("guardarP").disabled = true;
			var tables2 = document.getElementById("scroll_table3");
			while(tables2.rows.length > 1) {
				tables2.deleteRow(1);
			}
			try {
				$.ajax({
					type: "GET",
					url: "../PHP/consultasfacturacompra.php",
					data: {
						select:"getallac",
						idfacturacompra : this.cells[0].innerHTML ,
					},
					contentType: "application/json; charset=utf-8",
					dataType: 'json',                    
					cache: false,                       
					success: function(response) {                        
						$.each(response, function (i, item) {
							try {
								
								var tables = document.getElementById("scroll_table3");
								var newRow = tables.insertRow(tables.length);
								var NOMBRE= newRow.insertCell(0);
								var CANTIDAD= newRow.insertCell(1);
								var PRECIO= newRow.insertCell(2);			
								
								NOMBRE.innerHTML = item.nombre;
								CANTIDAD.innerHTML = item.cantidad;
								PRECIO.innerHTML = item.preciocompra;
								NOMBRE.className += "thText";
								CANTIDAD.className += "thCant";
								PRECIO.className += "thDin";
								
								
								
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
		IDF = document.getElementById("NroFactura").value,
		RIFF =document.getElementById("RIFProPago").value,
		MONTOF = document.getElementById("MontoPagar").value,
		TIPOF = document.getElementById("TipoPago").value,
		EMISIONF = document.getElementById("EmisionPago").value;
		try {
			$.ajax({
				type: "POST",
				url: "../PHP/consultasfacturacompra.php",
				data: {
					select:"update_comp",
					id: IDF,
					idproveedor: RIFF,
					total: MONTOF,
					tipopago:TIPOF,
					fechaemision:EMISIONF,
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
						tables.rows[rIndex-1].cells[1].innerHTML = RIFF;
						tables.rows[rIndex-1].cells[3].innerHTML = MONTOF;
						tables.rows[rIndex-1].cells[6].innerHTML = TIPOF;
						tables.rows[rIndex-1].cells[7].innerHTML = EMISIONF;

						document.getElementById("NroFactura").value="";
						document.getElementById("RIFProPago").value="";
						document.getElementById("MontoPagar").value="";
						document.getElementById("TipoPago").value="";
						document.getElementById("EmisionPago").value="";
						alert("Pago Editado");	   
						document.getElementById("guardarP").disabled = false;
					} else if (e.status==201) {
						alert("Pago error");

					} 
						
					
				}
				
			}); 
		} catch (error) {
			console.log(error);
		}
	
	
	
	}

}

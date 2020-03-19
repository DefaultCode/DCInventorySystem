var rIndex;

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasfacturaventa.php?select=getallfv",
			data: {},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {                        
				$.each(response, function (i, item) {
					try {
						var tables = document.getElementById("scroll_table");
						var newRow = tables.insertRow(tables.length);
						var ID= newRow.insertCell(0);
						var COMPRADOR= newRow.insertCell(1);
						var IDUSER= newRow.insertCell(2);
						var TOTAL= newRow.insertCell(3);
						var FEMISION= newRow.insertCell(4);
						var HEMISION = newRow.insertCell(5);
                        var TIPO= newRow.insertCell(6);
                        var ESTADO= newRow.insertCell(7);
						
						ID.innerHTML = item.id;
						COMPRADOR.innerHTML = item.idcomprador;
						IDUSER.innerHTML = item.iduser;
						TOTAL.innerHTML = item.total;
						FEMISION.innerHTML = item.fechaemision;
						HEMISION.innerHTML = item.horaemision;
                        TIPO.innerHTML =item.tipo_pago;
                        ESTADO.innerHTML =item.estado;
	
						ID.className += "thid";
						COMPRADOR.className += "thid";
						IDUSER.className += "thid";
						TOTAL.className += "thDin";
						FEMISION.className += "thText";
						HEMISION.className += "thText";
                        TIPO.className += "thCant";
                        ESTADO.className += "thCant";
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

function selectedRowToInput(){

	var tables = document.getElementById("scroll_table"); 
	
	for (var i = 0; i <= tables.rows.length-1; i++) {
		tables.rows[i].onclick = function(){
			rIndex = this.rowIndex;
			var idfactura = this.cells[0].innerHTML;
			var tables2 = document.getElementById("scroll_table2");
			while(tables2.rows.length > 2) {
				tables2.deleteRow(2);
			}

			try {
				$.ajax({
					type: "GET",
					url: "../PHP/consultasfacturaventa.php?select=getallav",
					data: {
						idfacturaventa: idfactura,
					},
					contentType: "application/json; charset=utf-8",
					dataType: 'json',                    
					cache: false,                       
					success: function(response) {                        
						$.each(response, function (i, item) {
							try {
								
								var newRow = tables2.insertRow(tables2.length);
								var IDP= newRow.insertCell(0);
								var CANT= newRow.insertCell(1);
								var PRECIO= newRow.insertCell(2);
								var SUBTOTAL= newRow.insertCell(3);
								
								IDP.innerHTML = item.idproducto;
								CANT.innerHTML = item.cantidad;
								PRECIO.innerHTML = item.preciounitario;
								SUBTOTAL.innerHTML = item.preciounitario * item.cantidad;
											
								IDP.className += "thid";
								CANT.className += "thDin";
								PRECIO.className += "thDin";
								SUBTOTAL.className += "thDin";

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

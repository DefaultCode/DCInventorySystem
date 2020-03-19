var factura=[];

class articulfactura {
	constructor (Cidarticulo, Cnombre, Cprecio_unitario, Ccantidad, Ctotal){
		this.idarticulo = Cidarticulo;
		this.precio_unitario = Cprecio_unitario;
		this.cantidad = Ccantidad;
		this.nombre =Cnombre;
		this.total = Ctotal; 
	}
}

function checkValuesEmpty(){

	var IDF = document.getElementById("IDProducto").value,
	NOMBREF =document.getElementById("NombreProducto").value,
	CANTIDADF = document.getElementById("CantidadP").value,
	PRESENTACIONF = document.getElementById("PresentacionP").value,
	FECHACOMPRAF = document.getElementById("FechaCompraP").value,
	MONTOTOTALF = document.getElementById("MontoTotalP").value,
	PRECIODF = document.getElementById("PrecioD").value,
	MARCAF = document.getElementById("MarcaP").value,
	TIPOF = document.getElementById("TipoP").value,
	DESCRIPCIONF = document.getElementById("DescripcionP").value,
	empty = false;

	if (IDF===""){
		alert("ID Cannot be empty");
		empty=true;
	}
	if (NOMBREF==="") {
		alert("Nombre Producto Cannot be empty");
		empty=true;
	}
	if (CANTIDADF==="") {
		alert("Cantidad Cannot be empty");
		empty=true;
	}
	if (PRESENTACIONF==="") {
		alert("Presentacion Cannot be empty");
		empty=true;
	}
	if (FECHACOMPRAF==="") {
		alert("Fecha Compra Cannot be empty");
		empty=true;
	}
	if (MONTOTOTALF==="") {
		alert("Monto total Cannot be empty");
		empty=true;
	}
	if (PRECIODF==="") {
		alert("Precio Cannot be empty");
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
}


function addHTMLTableRow(){
	console.log(document.getElementById("IDProducto").value);
	var tables = document.getElementById("scroll_table"); 
	bandera = "no existe";
	for (var i = 2; i <= tables.rows.length-1; i++) {
		var b  = tables.rows[i].cells[0].innerText;
		console.log("comparo texbox "+document.getElementById("IDProducto").value+"con tabla"+b );
		if ( document.getElementById("IDProducto").value == b ) {
			var C1  = parseInt(tables.rows[i].cells[3].innerText);
			var C2 = parseInt(document.getElementById("CantProducto").value);
			tables.rows[i].cells[3].innerHTML = C1 + C2; 
			bandera = "existe";
		} 
	}
	if (bandera=="no existe" ) {
		try {
			$.ajax({
				type: "GET",
				url: "../PHP/consultasVentas.php?select=buscar&articulo="+document.getElementById("IDProducto").value,
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
							var NOMBRE= newRow.insertCell(1);
							var PRESENTACION= newRow.insertCell(2);
							var CANTIDAD= newRow.insertCell(3);
							var PRECIOU = newRow.insertCell(4);
							var TOTAL= newRow.insertCell(5);
							
							/*var singleObj = {};
							singleObj['id'] = item.codigo;
							singleObj['cantidad'] = document.getElementById("CantP").value ;
							singleObj['preciou'] = item.precio_venta;
							singleObj['totalp'] = item.precio_venta * parseInt(document.getElementById("CantP").value) ;
							*/
							articulo = new articulfactura(item.codigo, item.nombre , item.precio_venta, document.getElementById("CantProducto").value, item.precio_venta*parseInt(document.getElementById("CantP")) );
							factura.push(articulo);
							console.log(factura[0].idarticulo);
							
							//ID.innerHTML = "<p>"+item.codigo+"</p> " ;
							ID.innerHTML = item.codigo;
							NOMBRE.innerHTML = item.nombre;
							CANTIDAD.innerHTML = document.getElementById("CantProducto").value;
							PRESENTACION.innerHTML = item.presentacion;
							PRECIOU.innerHTML = item.precio_venta;
							TOTAL.innerHTML =  item.precio_venta * parseInt(document.getElementById("CantProducto").value);
		
							ID.title += item.codigo;
							ID.className += "thid";
							NOMBRE.className += "thText";
							CANTIDAD.className += "thCant";
							PRESENTACION.className += "thText";
							PRECIOU.className += "thText";
							TOTAL.className += "thText";
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
	

}
function selectedRowToInput(){
	var tables = document.getElementById("scroll_table"); 
	for (var i = 0; i <= tables.rows.length-1; i++) {
		tables.rows[i].onclick = function(){
			rIndex=this.rowIndex;
			console.log(this.rowIndex);
			document.getElementById("CantProducto").value= this.cells[3].innerHTML;
			document.getElementById("NombreProducto").value= this.cells[1].innerHTML;
			document.getElementById("IDProducto").value= this.cells[0].innerHTML;

		};
	}

}
function editHtmlTableSelectedRow(){

		var to,total, tables = document.getElementById("scroll_table"),
		NOMBREF = document.getElementById("Producto").value,
		CANTIDADF = document.getElementById("CantP").value,
		PRECIOU = tables.rows[rIndex].cells[4].innerHTML;
		console.log(CANTIDADF);
		console.log(PRECIOU);
		to = parseInt(CANTIDADF)*parseInt(PRECIOU);
		total=to.toString();
		console.log(to);
		console.log(total);
		tables.rows[rIndex].cells[1].innerHTML = NOMBREF;
		tables.rows[rIndex].cells[3].innerHTML = CANTIDADF;
		tables.rows[rIndex].cells[5].innerHTML = total;

}
function removeHtmlTableSelectedReow(){
	
	var tables = document.getElementById("scroll_table");
	
	tables.deleteRow(rIndex);

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

function generar_factura(){
	var idgenerado="6";
	var idComprador= document.getElementById("IDCliente").value;
	var nombreComprador = document.getElementById("NombreCliente").value;
	var apellidoComprador = document.getElementById("ApellidoCliente").value;
	var direccionComprador = document.getElementById("DireccionCliente").value;
	var telefonoComprador = document.getElementById("TelefonoCliente").value;
	var fechaemision="18/12/2019";
	var tipopago=0;
	var estado = 1;
	var t ;
	var i =0;

	console.log(document.getElementById("IDProducto").value);
	var tables = document.getElementById("scroll_table"); 
	prod= [];
	var x  = 0;
	for (var i = 2; i <= tables.rows.length-1; i++) {
		prod[x]= {"idpro":tables.rows[i].cells[0].innerText,"nombre":tables.rows[i].cells[1].innerText, "cantidad": tables.rows[i].cells[3].innerText , "precio":tables.rows[i].cells[5].innerText }; 
		console.log(prod[x]);
		var x  = x+1;
	}
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasfacturaventa.php?select=insertfv&id="+idgenerado+"&idcomprador="+idComprador+"&total=50000&tipo_pago="+tipopago+"&iduser=1",
			data: {},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {     
				alert("Data Save: " + response);
			},
			error: function (e) {
				if (e.responseText=="sussess") {
					try {
						$.ajax({
							type: "GET",
							url: "../PHP/consultasfacturaventa.php?select=insertav",
							data: {
								idfacturaventa: idgenerado,
								productos: prod,
							},
							contentType: "application/json; charset=utf-8",
							dataType: 'json',            
							cache: false,                
							success: function(response) {                        
								$.each(response, function (i, item) {
									console.log(response);
									console.log("se guardo el producto: "+factura.id);
								});
							},
							error: function (e) {
								console.log(e);
								if (e.responseText=="sussess") {
									alert("producto asociado "+prod.nombre); 
								} else {
									alert("error asociando producto"+prod.nombre);
								}
							}
						});
					} catch (error) {
						console.log(error);
					}
				} else {
					alert("error generando la factura");
				}
			}
			});
		
			
		}catch (error) {
			console.log(error);
		}
	console.log("salio de meter la factura en la db");
    try {
      $.ajax({
        type: "GET",
        url: "../PHP/serial.php",
        data: {
			rifCed: idComprador ,
			nombreCliente : nombreComprador+apellidoComprador ,
			ClitePhon : telefonoComprador,
			ClienteDir: direccionComprador,
			productos : prod,
        },
        contentType: "application/json; charset=utf-8",
        dataType: 'json',                    
        cache: false,                       
        success: function(response) {                        
          $.each(response, function (i, item) {
            try {
				alert("imprimiendo");
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

	/*
	factura.map(function (articulo,i) {
		t = t + articulo.total;
	});

	console.log(t);
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasfacturaventa.php?select=insertfv&id="+idgenerado+"&idcomprador="+idComprador+"&total=50000&tipo_pago="+tipopago+"&iduser=1",
			data: {},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {     
				alert("Data Save: " + response);
			},
				error: function (e) {
					console.log(e);
				}
			});
			factura.map(function(articulo, i){
				$.ajax({
					type: "GET",
					url: "../PHP/consultasfacturaventa.php?select=insertav&idfacturaventa="+idgenerado+"&idproducto="+articulo.idarticulo+"&cantidad="+articulo.cantidad+"&preciounitario="+articulo.precio_unitario,
					data: {},
					contentType: "application/json; charset=utf-8",
					dataType: 'json',            
					cache: false,                
					success: function(response) {                        
						$.each(response, function (i, item) {
							console.log(response);
							console.log("se guardo el producto: "+factura.id);
							});
						},
					error: function (e) {
						console.log(e);
					}
				});
			}
			
			 
			)} catch (error) {
		console.log(error);
	}
	var datos = JSON.stringify(factura);
	printWindow = window.open("../HTML/impfacturaventa.html?3213444"+"&"+datos+"&Ali&24437593");
	printWindow.print(); 
*/
}

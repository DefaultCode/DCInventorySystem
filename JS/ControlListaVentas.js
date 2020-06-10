var parseFloatWithCommas = function(val) {

	if (typeof val === 'number') {
		val = val.toString();
	}
	
	var numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return numberWithCommas(parseFloat(val.replace(',', '')).toFixed(2));
};


function calcularTotal(tables){
	total = 0;
	for (var y = 2; y <= tables.rows.length-1; y++) {
		total  = total + parseFloat (tables.rows[y].cells[6].innerText.substring(1).replace(',','').replace('.',','));    
		console.log("entro: "+total)
	}
	console.log(total);
	var monetary_value = total; 
	var c = new Intl.NumberFormat('en-IN', { 
		style: 'currency', 
		currency: 'USD' 
	}).format(monetary_value); 
	document.getElementById("total").innerHTML=c.substring(2);

	total = 0;
	for (var x = 2; x <= tables.rows.length-1; x++) {
		var totalr = tables.rows[x].cells[8].innerText;
		total  = total + parseFloat(totalr.substring(0,totalr.length-3).replace('.','').replace('.','').replace('.',''));          
	}
	console.log("total bolivares "+total)
	var monetary_value = total; 
	c = new Intl.NumberFormat('es-ES', { 
		style: 'currency', 
		currency: 'BSF' 
	}).format(monetary_value); 
	document.getElementById("totalBs").innerHTML = c.substring(0, c.length-1);

}

function calcularMonto(tables,i,C1, C2) {
	
	var preciou  = parseFloat(tables.rows[i].cells[5].innerText);
            
	var monetary_value = (C1 + C2)*preciou ; 
	var c = new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(monetary_value);

	tables.rows[i].cells[6].innerHTML = c.substring(2);
	valordolar = parseFloat(document.getElementById("Divisadia").value);
	var monetary_value = ((C1 + C2)*preciou)* valordolar; 
	var c = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'BSF'}).format(monetary_value);
	tables.rows[i].cells[8].innerHTML = c.substring(0, c.length-1);
}


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
			if ((C1 + C2) > parseInt(tables.rows[i].cells[4].innerText )) {
				alert ("no puede vender mas productos de los que posee en el inventario de este articulo posee "+tables.rows[i].cells[4].innerText );
				bandera = "existe";
			} else {
				tables.rows[i].cells[3].innerHTML = C1 + C2; 
				//calculo del total del producto por unidad
				calcularMonto(tables,i,C1, C2);
				
				//calculo del total de la factura
				calcularTotal(tables)
			  
				bandera = "existe";
			}

		} 
	}
	if (bandera=="no existe" ) {
		ajaxAgregarProducto();
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
	var idComprador= document.getElementById("IDCliente").value;
	var nombreComprador = document.getElementById("NombreCliente").value;
	var apellidoComprador = document.getElementById("ApellidoCliente").value;
	var direccionComprador = document.getElementById("DireccionCliente").value;
	var telefonoComprador = document.getElementById("TelefonoCliente").value;
	var tipopago= document.getElementById("TipoP").value;
	var estado = document.getElementById("EstadoP").value;
	var i =0;
	console.log(document.getElementById("IDProducto").value);
	var tables = document.getElementById("scroll_table"); 
	prod= [];
	var x  = 0;
	for (var i = 2; i <= tables.rows.length-1; i++) {
		prod[x]= {"idpro":tables.rows[i].cells[0].innerText,"nombre":tables.rows[i].cells[1].innerText, "cantidad": tables.rows[i].cells[3].innerText , "precio":tables.rows[i].cells[6].innerText }; 
		console.log(prod[x]);
		var x  = x+1;
		console.log("1")
	}
	console.log(prod);
	totalft =   document.getElementById("totalBs").innerText;
	var total = parseFloat( totalft.substring(0,totalft.length-2).replace('.','').replace('.','').replace('.',''));
	var idempleado="1"; 
	ajaxGuardarFacturaV(idComprador,idempleado,total,tipopago,estado,prod);

}


function ajaxGuardarFacturaV(idComprador,idempleadof,totalf,tipopagof,estadof,prod){
	console.log("entro a ajax factura");
	console.log(idComprador+" "+idempleadof+" "+totalf+" "+tipopagof+" "+estadof)
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasfacturaventa.php",
			data: {
				select:"insertfv",
				idcomprador:idComprador,
				idempleado:idempleadof,
				total:totalf,
				tipo_pago:tipopagof,
				estado:estadof,
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {    
				if (response == "error" ) {
					alert("Error guardando la factura");
					console.log(response);
				} else {
					console.log("se ejecuto ajax factura");
					console.log("ultima factura "+response);
					ajaxGuardarProductosFactura(response,idComprador,prod);
					alert("factura guardada");
				}
				
			},
			error: function (e) {
				console.log(e);
				alert("error agregando la factura");
			}
			});
			console.log("si entra al try");
		}catch (error) {
			console.log(error);
		}
}

function ajaxGuardarProductosFactura(idfactura,idComprador,prod) {
		try {
			$.ajax({
				type: "GET",
				url: "../PHP/consultasfacturaventa.php",
				data: {
					select:"insertav",
					idfacturaventa: idfactura,
					comprador:idComprador,
					productos: prod,
				},
				contentType: "application/json; charset=utf-8",
				dataType: 'json',            
				cache: false,                
				success: function(response) {                        
					$.each(response, function (i, item) {
						console.log(response);
						alert("productos guardados");
					});
				},
				error: function (e) {
					console.log(e);
					alert("error guardando los productos");
				}
			});
		} catch (error) {
			console.log(error);
		}
}


function ajaxAgregarProducto() {
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
						if (item.cantidad < parseInt( document.getElementById("CantProducto").value)) {
							alert ("no puede vender mas productos de los que posee en el inventario de este articulo posee"+item.cantidad);
						} else {
							var tables = document.getElementById("scroll_table"); 
							var newRow = tables.insertRow(tables.length);
							var ID= newRow.insertCell(0);
							var NOMBRE= newRow.insertCell(1);
							var PRESENTACION= newRow.insertCell(2);
							var CANTIDAD= newRow.insertCell(3);
							var CANTIDADEX= newRow.insertCell(4);
							var PRECIOU = newRow.insertCell(5);
							var TOTAL= newRow.insertCell(6);
							var PRECIOB= newRow.insertCell(7);
							var TOTALBS= newRow.insertCell(8);

							
							ID.innerHTML = item.codigo;
							NOMBRE.innerHTML = item.nombre;
							CANTIDAD.innerHTML = document.getElementById("CantProducto").value;
							CANTIDADEX.innerHTML = item.cantidad;
							PRESENTACION.innerHTML = item.presentacion;
							PRECIOU.innerHTML =  item.precio_venta;
							var monetary_value =  item.precio_venta * parseInt(document.getElementById("CantProducto").value); 
							
							var i = new Intl.NumberFormat('en-IN', { 
								style: 'currency', 
								currency: 'USD' 
							}).format(monetary_value); 
							TOTAL.innerHTML = i.substring(2) ;						
							total = 0;
							for (var i = 2; i <= tables.rows.length-1; i++) {
								var total  = total + parseFloat (tables.rows[i].cells[6].innerText.substring(1).replace(',','').replace('.',','));        
							}
							var monetary_value = total; 
							var i = new Intl.NumberFormat('en-IN', { 
								style: 'currency', 
								currency: 'USD' 
							}).format(monetary_value); 
							document.getElementById("total").innerHTML=i.substring(2);

							valordolar = parseFloat(document.getElementById("Divisadia").value);
							var monetary_value = item.precio_venta*valordolar; 
							var c = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'BSF'}).format(monetary_value);
							PRECIOB.innerHTML = c.substring(0, c.length-1);
							
							var monetary_value = ((parseInt(document.getElementById("CantProducto").value)*item.precio_venta)* valordolar); 
							var c = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'BSF'}).format(monetary_value);
							TOTALBS.innerHTML = c.substring(0, c.length-1);

							total = 0;
							for (var i = 2; i <= tables.rows.length-1; i++) {
								var totalr = tables.rows[i].cells[8].innerText;
								var total  = total + parseFloat(totalr.substring(0,totalr.length-3).replace('.','').replace('.','').replace('.',''));          
							}
							var monetary_value = total; 
							var i = new Intl.NumberFormat('es-ES', { 
								style: 'currency', 
								currency: 'BSF' 
							}).format(monetary_value); 
							document.getElementById("totalBs").innerHTML=i.substring(0, c.length-1);
							
							ID.title += item.codigo;
							ID.className += "thid";
							NOMBRE.className += "thText";
							CANTIDAD.className += "thCant";
							CANTIDADEX.className += "thCant";
							PRESENTACION.className += "thText";
							PRECIOU.className += "trDin";
							TOTAL.className += "trDin";
							PRECIOB.className += "trDin";
							TOTALBS.className += "trDin";
							selectedRowToInput();
						}
						
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


function ajaxTiposPago(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasTipoPago.php",
			data: {
				select : "selec_all",
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {   
				var opciones ="";
				$.each(response, function (i, item) {
					opciones = opciones + "<option value='"+item.id+"' style='font-size: 18px;'>"+item.nombre+"</option>";
				});
				document.getElementById("TipoP").innerHTML = opciones ;
			},
			error: function (e) {
				console.log(e.responseText); 
				alert("Error cargando los tipos de pago");
			}
			});
		
			
		}catch (error) {
			console.log(error);
		}
}

function ajaxAcotacion() {
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasDivisas.php",
			data: {
				select : "valorDivisaDia",
				divisa: "26" //id del dolar XD
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {   
				$.each(response, function (i, item) {
					document.getElementById("Divisadia").value = item.valor ;
				});
			},
			error: function (e) {
				console.log(e.responseText); 
				alert("Error cargando el valor de la divisa");
			}
			});
		
			
		}catch (error) {
			console.log(error);
		}
}

	/*console.log("salio de meter la factura en la db");
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
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
		total  = total + parseFloat (tables.rows[y].cells[5].innerText.substring(1).replace(',','').replace('.',','));    
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
		var totalr = tables.rows[x].cells[7].innerText;
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
	
	var preciou  = parseFloat(tables.rows[i].cells[4].innerText);
            
	var monetary_value = (C1 + C2)*preciou ; 
	var c = new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(monetary_value);

	tables.rows[i].cells[5].innerHTML = c.substring(2);
	valordolar = parseFloat(document.getElementById("Divisadia").value);
	var monetary_value = ((C1 + C2)*preciou)* valordolar; 
	var c = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'BSF'}).format(monetary_value);
	tables.rows[i].cells[7].innerHTML = c.substring(0, c.length-1);
}

function newProveedor(){
	window.open("../HTML/AgregarProveedor.html?","New Proveedor","width=680,height=520,top=85,left=350");


	/*if (document.getElementById("datosProve").style.display == "none") {
		document.getElementById("IDProveedor").value = "";
		document.getElementById("NombreProveedor").value = "";
		document.getElementById("DireccionProveedor").value = "";
		document.getElementById("TelefonoProveedor").value = "";
		document.getElementById("datosProve").style.display = "flex";
		document.getElementById("producto").style.marginTop = "10px";

	} else {
		document.getElementById("IDProveedor").value = "";
		document.getElementById("NombreProveedor").value = "";
		document.getElementById("DireccionProveedor").value = "";
		document.getElementById("TelefonoProveedor").value = "";
		document.getElementById("datosProve").style.display = "none";
		document.getElementById("producto").style.marginTop = "70px";

	}
*/
}

function newProducto(){
	window.open("../HTML/AgregarProducto.html","New Producto","width=820,height=420,top=85,left=350");
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
            
            //calculo del total del producto por unidad
			calcularMonto(tables,i,C1, C2);
            
            //calculo del total de la factura
			calcularTotal(tables)

            bandera = "existe";
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

function Guardar_facturaC(){
	var idgenerado= document.getElementById("IDFactura").value,
	idProveedor= document.getElementById("IDProveedor").value,
	totalft =  document.getElementById("totalBs").innerText;
	var totalf = parseFloat( totalft.substring(0,totalft.length-2).replace('.','').replace('.','').replace('.','')),
	acotacionf = parseFloat(document.getElementById("Divisadia").value),
	tipopagof= document.getElementById("TipoP").value,
	estadof = document.getElementById("EstadoP").value,
	i =0;

	console.log(totalf);
	var tables = document.getElementById("scroll_table"); 
	prod= [];
	var x  = 0;
	for (var i = 2; i <= tables.rows.length-1; i++) {
		prod[x]= {"idpro":tables.rows[i].cells[0].innerText,"nombre":tables.rows[i].cells[1].innerText, "cantidad": tables.rows[i].cells[3].innerText , "precio_U":tables.rows[i].cells[4].innerText, "Costo":tables.rows[i].cells[5].innerText.substring(1).replace(",","") }; 
		console.log(prod[x]);
		var x  = x+1;
	}

	ajaxGuardarFactura(idgenerado,idProveedor,totalf,acotacionf,tipopagof,estadof,prod);

	console.log("salio de meter la factura en la db");
    
}



function ajaxAgregarProducto(){
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
						var PRECIOB= newRow.insertCell(6);
						var TOTALBS= newRow.insertCell(7);
						
						ID.innerHTML = item.codigo;
						NOMBRE.innerHTML = item.nombre;
						CANTIDAD.innerHTML = document.getElementById("CantProducto").value;
						PRESENTACION.innerHTML = item.presentacion;
						PRECIOU.innerHTML =  parseInt(document.getElementById("PrecioU").value);
						var monetary_value =  parseInt(document.getElementById("PrecioU").value) * parseInt(document.getElementById("CantProducto").value); 
						
						var i = new Intl.NumberFormat('en-IN', { 
							style: 'currency', 
							currency: 'USD' 
						}).format(monetary_value); 

						TOTAL.innerHTML = i.substring(2) ;
						
						total = 0;
						for (var i = 2; i <= tables.rows.length-1; i++) {
							var total  = total + parseFloat (tables.rows[i].cells[5].innerText.substring(1).replace(',','').replace('.',','));        
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
							var totalr = tables.rows[i].cells[7].innerText;
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
						PRESENTACION.className += "thText";
						PRECIOU.className += "trDin";
						TOTAL.className += "trDin";
						PRECIOB.className += "trDin";
						TOTALBS.className += "trDin";
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

function ajaxGuardarProductosFactura(idgenerado,idProveedor,prod){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasfacturacompra.php",
			data: {
				select:"insertac",
				idfacturacompra: idgenerado,
				idproveedor:idProveedor,
				productos: prod,
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',            
			cache: false,                
			success: function(response) {           
				console.log(response);             
				if ( parseInt(response) >= 1 ) {
					alert("productos asociados"); 
				} else {
					alert("error asociando los productos");
				}
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
}

function ajaxGuardarFactura(idgenerado,idProveedor,totalf,acotacionf,tipopagof,estadof,prod){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasfacturacompra.php",
			data: {
				select : "insertfc",
				id : idgenerado,
				idproveedor : idProveedor,
				total : totalf,
				acotaciondolar : acotacionf,
				tipopago : tipopagof,
				estado:estadof,
			},
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {   
				console.log(response);  
				if ( parseInt(response) >= 0) {
					ajaxGuardarProductosFactura(idgenerado,idProveedor,prod);
				} else {
					alert("error generando la factura");
				}
			},
			error: function (e) {
				console.log(e.responseText); 
				alert("Error Creando la factura");
			}
			});
		
			
		}catch (error) {
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
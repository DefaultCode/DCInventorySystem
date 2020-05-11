var parseFloatWithCommas = function(val) {

	if (typeof val === 'number') {
		val = val.toString();
	}
	
	var numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return numberWithCommas(parseFloat(val.replace(',', '')).toFixed(2));
};

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

            var preciou  = parseFloat(tables.rows[i].cells[4].innerText);
            
            var monetary_value = (C1 + C2)*preciou ; 
            var c = new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(monetary_value);

            tables.rows[i].cells[5].innerHTML = c.substring(2);
            valordolar = 170000;
            var monetary_value = ((C1 + C2)*preciou)* valordolar; 
            var c = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'BSF'}).format(monetary_value);
            tables.rows[i].cells[7].innerHTML = c.substring(0, c.length-1);
            
            //calculo del total de la factura
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
                            var PRECIOB= newRow.insertCell(6);
                            var TOTALBS= newRow.insertCell(7);
							
							/*var singleObj = {};
							singleObj['id'] = item.codigo;
							singleObj['cantidad'] = document.getElementById("CantP").value ;
							singleObj['preciou'] = item.precio_venta;
							singleObj['totalp'] = item.precio_venta * parseInt(document.getElementById("CantP").value) ;
							*/
							
							
							//ID.innerHTML = "<p>"+item.codigo+"</p> " ;
							ID.innerHTML = item.codigo;
							NOMBRE.innerHTML = item.nombre;
							CANTIDAD.innerHTML = document.getElementById("CantProducto").value;
							PRESENTACION.innerHTML = item.presentacion;
							PRECIOU.innerHTML = item.precio_venta;
                            var monetary_value = item.precio_venta * parseInt(document.getElementById("CantProducto").value); 
                            
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


                            valordolar = 170000;
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
}

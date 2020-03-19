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
						if (item.cantidad <40) {
                            var tables = document.getElementById("scroll_table2");
                            var newRow = tables.insertRow(tables.length);
                            var ID= newRow.insertCell(0);
                            var NOMBRE= newRow.insertCell(1);
                            var CANTIDAD= newRow.insertCell(2),
                            COSTOU = newRow.insertCell(3),
                            PRECIOV = newRow.insertCell(4);
                            
                            
                            ID.innerHTML = item.codigo;
                            NOMBRE.innerHTML = item.nombre;
                            CANTIDAD.innerHTML = item.cantidad;
                            COSTOU.innerHTML = item.precio_compra;
                            PRECIOV.innerHTML = item.precio_venta;
                            
        
                            ID.className += "thid";
                            NOMBRE.className += "thText";
                            CANTIDAD.className += "thCant";
                            COSTOU.className += "thDin"; 
                            PRECIOV.className += "thDin";    
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


function Cotizar(){
    
    if (  document.getElementById("CantidadC").value <= 0 ) {
        alert("No puede cotizar un producto con niguna unidad"); 
    }else{
        try {
            $.ajax({
                type: "GET",
                url: "../PHP/consultasVentas.php?select=buscar&articulo="+document.getElementById("IdProducto").value,
                data: {},
                contentType: "application/json; charset=utf-8",
                dataType: 'json',                    
                cache: false,                     
                success: function(response) {                        
                    $.each(response, function (i, item) {
                        try {
                            
                        var tables = document.getElementById("scroll_table3"),
                        newRow = tables.insertRow(tables.length),
                        ID= newRow.insertCell(0),
                        NOMBRE= newRow.insertCell(1),
                        CANTIDAD= newRow.insertCell(2),
						COSTO = newRow.insertCell(3);
						UTILIDAD = newRow.insertCell(4);
                      

                        ID.innerHTML = document.getElementById("IdProducto").value;
                        CANTIDAD.innerHTML = document.getElementById("CantidadC").value ;
                        NOMBRE.innerHTML = item.nombre;
						COSTO.innerHTML =  item.precio_compra * parseInt(document.getElementById("CantidadC").value) ;
						UTILIDAD.innerHTML = parseInt(document.getElementById("CantidadC").value) * (item.precio_venta - item.precio_compra);
                        ID.className += "thid";
						NOMBRE.className += "thText";
						CANTIDAD.className += "thCant";
						COSTO.className += "thDin";
						UTILIDAD.className += "thDin";
                        selectedRowToInput();
                        

					} catch (error) {
						console.log(error);
					}
                    })   
                    suma = 0;
                    var tables = document.getElementById("scroll_table3"); 
                    if (tables.rows.length >1) {
                        for (var i = 1; i <= tables.rows.length-1; i++) {
                            suma = suma + parseFloat(tables.rows[i].cells[3].innerText); 
                            console.log(suma);
                        }
                    }else{
                        var tables = document.getElementById("scroll_table3"); 
                        suma = parseFloat(tables.rows[1].cells[3].innerText) ;
					}
					Utilidad = 0;
					var tables = document.getElementById("scroll_table3"); 
                    if (tables.rows.length >1) {
                        for (var i = 1; i <= tables.rows.length-1; i++) {
                            Utilidad = Utilidad + parseFloat(tables.rows[i].cells[4].innerText); 
                            console.log(Utilidad);
                        }
                    }else{
                        var tables = document.getElementById("scroll_table3"); 
                        Utilidad = parseFloat(tables.rows[1].cells[4].innerText) ;
                    }
					
                    document.getElementById("PrecioD").value = suma; 
                    var monetary_value = document.getElementById("PrecioD").value; 
                    var i = new Intl.NumberFormat('en-IN', { 
                        style: 'currency', 
                        currency: 'USD' 
                    }).format(monetary_value); 
                    document.getElementById("PrecioD").value = i; 

                    document.getElementById("UtilidadD").value = Utilidad; 
                    var monetary_value = document.getElementById("UtilidadD").value; 
                    var i = new Intl.NumberFormat('en-IN', { 
                        style: 'currency', 
                        currency: 'USD' 
                    }).format(monetary_value); 
                    document.getElementById("UtilidadD").value = i; 

                    document.getElementById("PrecioB").value = suma*75000 ;
                    var monetary_value = document.getElementById("PrecioB").value; 
                    var i = new Intl.NumberFormat('es-ES', { 
                        style: 'currency', 
                        currency: 'BSF' 
                    }).format(monetary_value); 
                    document.getElementById("PrecioB").value = i;

                    document.getElementById("UtilidadB").value = Utilidad*75000 ;
                    var monetary_value = document.getElementById("UtilidadB").value; 
                    var i = new Intl.NumberFormat('es-ES', { 
                        style: 'currency', 
                        currency: 'BSF' 
                    }).format(monetary_value); 
                    document.getElementById("UtilidadB").value = i;

 
                        


                },
                error: function (e) {
                 
                }
                
            }); 
        } catch (error) {
            console.log(error);
        }
        

    }
	

	selectedRowToInput();


}

function selectedRowToInput(){
	var tables = document.getElementById("scroll_table2"); 
	for (var i = 0; i <= tables.rows.length-1; i++) {
		tables.rows[i].onclick = function(){
			rIndex=this.rowIndex;
			document.getElementById("IdProducto").value= this.cells[0].innerHTML;
            document.getElementById("CantidadC").value = 0;
            document.getElementById("cotizarP").disabled = false;
            
		};
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
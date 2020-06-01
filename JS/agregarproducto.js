
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
	if (PRESENTACIONF==="") {
		alert("Presentacion Cannot be empty");
		empty=true;
	}
	if (PRECIOVF==="") {
		alert("Precio V Cannot be empty");
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


function Cancelar() {
    window.close();
}

function addHTMLTableRow(){
	//checkValuesEmpty();
	var IDF = document.getElementById("IDProducto").value,
	NOMBREF =document.getElementById("NombreProducto").value,
	PRESENTACIONF = document.getElementById("PresentacionP").value,
	PRECIOVF = document.getElementById("PrecioV").value,
	PRECIOV2F = document.getElementById("PrecioC").value,
	MARCAF = document.getElementById("MarcaP").value,
	TIPOF = document.getElementById("TipoP").value;
	if (TIPOF == "Telefono") {
		TIPOF = 1;
	} 
	else{
		TIPOF = 0;	
	}
	var DESCRIPCIONF= document.getElementById("DescripcionP").value;
	
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasVentas.php",
			data: {
                select:"insertart",
                codigo:IDF,
                nombre:NOMBREF,
                presentacion:PRESENTACIONF,
                precio_venta:PRECIOVF,
                precio_compra:PRECIOV2F,
                cantidad:0,
                idmarca:MARCAF,
                descripcion:DESCRIPCIONF,
                tipo:TIPOF,
            },
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {
                console.log(response);
                if (parseInt(response)>0) {
                    alert("Producto agregado");
                } else {
                    alert("Error agregando el producto a la lista");
                }
			},
			error: function (e) {
                console.log(e);
                alert("producto error");
			}		
		}); 
	} catch (error) {
		console.log(error);
	}
}


function chargeMarca() {
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
					opciones.value = item.id;
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

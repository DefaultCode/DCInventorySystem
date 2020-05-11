

function checkValuesEmpty(){

    var IDPRODUCTO =document.getElementById("IdProductoT").value,
	CANTEX =document.getElementById("CantidadEx").value,
	CANTMO =document.getElementById("CantidadMo").value,
	empty = false;
	if ( IDPRODUCTO===""){
        alert("ID del producto no puede estar en blanco");
        empty=true;
	}
	console.log(CANTEX); 
    if ( parseInt(CANTMO) > parseInt(CANTEX)){
		alert("La cantidad a mover no puede ser mayor a la cantidad existente");
		empty=true;
	}
	return empty;
}

function clearlist1(){
    var tables1 = document.getElementById("scroll_table1");
	while(tables1.rows.length > 1) {
		tables1.deleteRow(1);
	}
}

function addHTMLTableRow(){
	if (checkValuesEmpty() == false) {
		var IDP = document.getElementById("IdProductoT").value,
		IDT = document.getElementById("tipoTrasladoF").value,
		CANE = document.getElementById("CantidadEx").value,
		CANM = document.getElementById("CantidadMo").value,
		DES = document.getElementById("DescripcionT").value,
		CANM2 = CANE - CANM;
		ajaxInsert(IDP,IDT,CANE,CANM2,DES);	
	} 
}

// apartir de aqui estan todos los ajax

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/Consultastrasladoinventario.php",
			data: {
                select:"getall"
            },
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {                        
				$.each(response, function (i, item) {
					try {
						var tables = document.getElementById("scroll_table1"),
						newRow = tables.insertRow(tables.length),
                        ID= newRow.insertCell(0),
                        TIPO= newRow.insertCell(1),
                        PRODUCTO= newRow.insertCell(2),
						INICIO= newRow.insertCell(3),
						FINAL= newRow.insertCell(4),
						FECHA= newRow.insertCell(5),
						HORA= newRow.insertCell(6),
						DES= newRow.insertCell(7);
                        ID.innerHTML = item.id;
						TIPO.innerHTML = item.idtipo;
						PRODUCTO.innerHTML = item.idproducto;
						INICIO.innerHTML = item.cantidadinicial;
						FINAL.innerHTML = item.cantidadfinal;
						FECHA.innerHTML = item.fecha;
						HORA.innerHTML = item.hora;
						DES.innerHTML = item.descripcion;
                        ID.className += "thid";
						TIPO.className += "thid";
						PRODUCTO.className += "thid";
						INICIO.className += "thCant";
						FINAL.className += "thCant";
						FECHA.className += "thFecha";
						HORA.className += "thFecha";
						DES.className += "thDes";
                        
					} catch (error) {
						console.log(error);
					}               
                    });
				},
				error: function (e) {
                    console.log(e);
                    if (e.responseText == "No Results") {
                        alert("Aun no existen movimientos de inventario");
                    }
				}
            });

	} catch (error) {
		console.log(error);
	}
}


function chargeSelect(){
    try {
		$.ajax({
			type: "GET",
			url: "../PHP/Consultastipotraslado.php",
			data: {
                select:"search_Traslado_tipo_Select"
            },
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {    
                var opciones ="";                    
				$.each(response, function (i, item) {
					try {	
                        opciones = opciones + "<option value='"+item.id+"' style='font-size: 18px;'>"+item.nombre+"</option>";
                    } catch (error) {
						console.log(error);
					}               
                    });
                    document.getElementById("tipoTrasladoF").innerHTML = opciones ;
				},
				error: function (e) {
                    console.log(e);
                    if (e.responseText == "No Results") {
                        alert("Aun no existen tipos de traslado");
                    }
				}
            });

	} catch (error) {
		console.log(error);
	}
}

function ajaxInsert(IDP,IDT,CANE,CANM,DES){
	console.log(IDP,IDT,CANE,CANM,DES);
	try {
        $.ajax({
            type: "GET",
            url: "../PHP/Consultastrasladoinventario.php",
            data: {
                select:"insert_Traslado_Inventario",
				idproducto:IDP,
				idtipo:IDT,
				inicio:CANE,
				final:CANM,
				descripcion:DES
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) { 
				if (response=="-1") {
					console.log(response);
					alert("Error agregando el movimiento");
				}else{
					console.log(response);
					chargeall();
				}
			},
            error: function (e) {
				console.log(e.responseText);
				console.log(e);
                if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                    alert("error al agregar el movimiento");	   
                }else {
                    clearlist1();
                    ajaxSelect(NOMBRE);
                    alert("Agregada la divisa");
                } 
            }           
        }); 
    } catch (error) {
        console.log(error);
    }

}
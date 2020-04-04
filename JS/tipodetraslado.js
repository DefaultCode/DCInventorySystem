var rIndex;

function checkValuesEmpty(){

    var NOMBREF =document.getElementById("NombreDivisa").value,
    NOMBREFS =document.getElementById("NombresDivisas").value,
    VALORF =document.getElementById("ValorDivisa").value,
    empty = false;
    if (document.getElementById("NombreS").style.display == "inline" ) {
        if ( NOMBREFS===""){
            alert("IDEmpleado Cannot be empty");
            empty=true;
        }
    } else {
        if (NOMBREF==="") {
            alert("Nombre de Divisa no debe estar en blanco");
            empty=true;
        }
    }
    if (VALORF===""){
		alert("inserte una cantidad de dinero");
		empty=true;
	}
	return empty;
}

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultastipotraslado.php",
			data: {
                select:"getall"
            },
			contentType: "application/json; charset=utf-8",
			dataType: 'json',                    
			cache: false,                       
			success: function(response) {    
                var opciones ="";                    
				$.each(response, function (i, item) {
					try {
						var tables = document.getElementById("scroll_table1");
						var newRow = tables.insertRow(tables.length);
                        var ID= newRow.insertCell(0);
                        var NOMBRE= newRow.insertCell(1);
                        var TIPO= newRow.insertCell(2);
                        var CLASE= newRow.insertCell(3);
                        ID.innerHTML = item.id;
                        NOMBRE.innerHTML = item.nombre;
                        TIPO.innerHTML = item.tipo;
                        CLASE.innerHTML = item.clase;
                        ID.className += "thid";
                        NOMBRE.className += "thText";
						FECHA.className += "thid";
                        VALOR.className += "thid";
                        selectedRowToInput();
					} catch (error) {
						console.log(error);
					}               
                    });
                    document.getElementById("NombresDivisas").innerHTML = opciones ;
				},
				error: function (e) {
                    console.log(e);
                    if (e.responseText == "No Results") {
                        alert("Aun no existen Divisas Agregadas");
                    }
				}
            });

	} catch (error) {
		console.log(error);
	}
}

function selectedRowToInput(){
	var tables = document.getElementById("scroll_table1"); 
	for (var i = 0; i <= tables.rows.length-1; i++) {
		tables.rows[i].onclick = function(){
			rIndex=this.rowIndex;
			document.getElementById("NombresDivisas").value = this.cells[0].innerHTML;
			document.getElementById("ValorDivisa").value= this.cells[3].innerHTML;
            document.getElementById("Fecha").value= this.cells[2].innerHTML;
            document.getElementById("divFecha").style.display="inline";
			var tables2 = document.getElementById("scroll_table3");
			while(tables2.rows.length > 1) {
				tables2.deleteRow(1);
			}
            ajaxGetHistory(this.cells[0].innerHTML);       
		};
	}
}

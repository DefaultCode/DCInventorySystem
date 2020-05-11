var rIndex;

function checkValuesEmpty(){

    var NOMBRET =document.getElementById("NombreTraslado").value,
    empty = false;
    if ( NOMBRET===""){
        alert("Nombre Cannot be empty");
        empty=true;
    } 
	return empty;
}

function selectedRowToInput(){
	var tables = document.getElementById("scroll_table1"); 
	for (var i = 0; i <= tables.rows.length-1; i++) {
		tables.rows[i].onclick = function(){
			rIndex=this.rowIndex;
			document.getElementById("NombreTraslado").value = this.cells[1].innerHTML;
            if (this.cells[2].innerHTML == "Incorporar" ) {
                document.getElementById("tipoTraslado").value=  "+" ;    
            } else {
                document.getElementById("tipoTraslado").value= "-";
            }
            switch (this.cells[3].innerHTML) {
                case "Otros":
                    document.getElementById("claseTraslado").value= "";
                    break;
                case "Factura Venta":
                    document.getElementById("claseTraslado").value= "F";
                    break;            
                case "Factura Compra":
                    document.getElementById("claseTraslado").value= "C";
                    break;
            }
			var tables2 = document.getElementById("scroll_table3");
			while(tables2.rows.length > 1) {
				tables2.deleteRow(1);
            }
            //ajaxGetHistory(this.cells[0].innerHTML);       
		};
	}
}


function addHTMLTableRow(){
    if (checkValuesEmpty() != true ) {
        ajaxInsert(document.getElementById("NombreTraslado").value,document.getElementById("tipoTraslado").value, document.getElementById("claseTraslado").value );
    }         
}

function editHtmlTableSelectedRow(){
    document.getElementById("SaveT").style.display = "";
    document.getElementById("CancelarT").style.display = "";
    document.getElementById("EditT").style.display = "none"; 
    document.getElementById("guardarT").style.display = "none";     
}

function SaveHTMLTableRow(){
    document.getElementById("SaveT").style.display = "none";
    document.getElementById("CancelarT").style.display = "none";
    document.getElementById("EditT").style.display = ""; 
    document.getElementById("guardarT").style.display = ""; 
    var tables = document.getElementById("scroll_table1"); 
    console.log(tables.rows[rIndex-1].cells[0].innerHTML);
    if (checkValuesEmpty() == false ) {
        ajaxUpdate(tables.rows[rIndex-1].cells[0].innerHTML,document.getElementById("NombreTraslado").value,document.getElementById("tipoTraslado").value, document.getElementById("claseTraslado").value );     
    } else {
        alert("El campo Nombre no debe estar en blanco");
    }
    
}

function clearlist1(){
    var tables1 = document.getElementById("scroll_table1");
	while(tables1.rows.length > 1) {
		tables1.deleteRow(1);
	}
}

// all ajax metode

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
                        if ( "+" == item.tipo) {
                            TIPO.innerHTML = "Incorporar";    
                        } else {
                            TIPO.innerHTML = "Substraer";
                        }
                        
                        switch (item.clase) {
                            case "F":
                                CLASE.innerHTML = "Factura Venta";  
                                break;
                            case "C":
                                CLASE.innerHTML = "Factura Compra";  
                                break;
                            default:
                                CLASE.innerHTML = "Otros";  
                                break;
                        }
                        ID.className += "thid";
                        NOMBRE.className += "thText";
						TIPO.className += "thid";
                        CLASE.className += "thid";
                        selectedRowToInput();
					} catch (error) {
						console.log(error);
					}               
                    });
				},
				error: function (e) {
                    console.log(e);
                    if (e.responseText == "No Results") {
                        alert("Aun no existen tipos de traslados registrados");
                    }
				}
            });

	} catch (error) {
		console.log(error);
	}
}

function ajaxInsert(NOMBRE, TIPO, CLASE){
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/Consultastipotraslado.php",
            data: {
                select:"insert_Tipo_Traslado",
                nombre:NOMBRE,
                tipo:TIPO,
                clase:CLASE
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) { 
                clearlist1();
                chargeall();
                alert("Agregada la divisa");
            },
            error: function (e) {
                console.log(e.responseText);
                if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                    alert("error al agregar la divisa");	   
                }else {
                    clearlist1();
                    chargeall();
                    alert("Agregada la divisa");
                } 
            }           
        }); 
    } catch (error) {
        console.log(error);
    }
}

function ajaxUpdate(ID,NOMBRE, TIPO, CLASE){
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/Consultastipotraslado.php",
            data: {
                select:"Update_Tipo_Traslado",
                id: ID,
                nombre:NOMBRE,
                tipo:TIPO,
                clase:CLASE
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) { 
                clearlist1();
                chargeall();
                alert("Tipo de traslado editado");
            },
            error: function (e) {
                console.log(e);
                console.log(e.responseText);
                if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                    alert("error al editar el tipo de traslado");	   
                }else {
                    clearlist1();
                    chargeall();
                    
                } 
            }           
        }); 
    } catch (error) {
        console.log(error);
    }
}
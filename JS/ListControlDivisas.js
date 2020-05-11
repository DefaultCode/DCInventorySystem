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
function addHTMLTableRow(){
        if (checkValuesEmpty() != true ) {
            var tables = document.getElementById("scroll_table1"),
            newRow = tables.insertRow(tables.length),
            NOMBRE= newRow.insertCell(0),
            VALOR= newRow.insertCell(1),
            bandera, fecha;
            if (document.getElementById("NombreS").style.display == "inline") {
                NOMBRE = document.getElementById("NombresDivisas").value; 
                fecha = tables.rows[rIndex-1].cells[2].innerText;
                var hoy = new Date();
                dd = hoy.getDate(),
                mm = hoy.getMonth()+1,
                yyyy = hoy.getFullYear();
                if (dd<10) {
                    dd= "0"+dd
                }
                if (mm<10) {
                    mm= "0"+mm
                }            
                bandera = "nueva divisa"; 
                diahoy = yyyy+"-"+mm+"-"+dd;
                console.log( "codigo "+document.getElementById("NombresDivisas").value+" "+fecha+" comparacion "+diahoy); 
                ajaxCambio(document.getElementById("NombresDivisas").value,diahoy,fecha); 
            } else {           
                ajaxCambio(document.getElementById("NombresDivisas").value,diahoy,fecha);       
            }
        }         
    }

function newDivisa(){
    console.log("entro");
    if (document.getElementById("NombreI").style.display = "none") {
        document.getElementById("NombreI").style.display ="inline";
        document.getElementById("NombreS").style.display ="none"
    }
}

function clearlist1(){
    var tables1 = document.getElementById("scroll_table1");
	while(tables1.rows.length > 1) {
		tables1.deleteRow(1);
	}
}

// apartir de aqui estan todos los ajax

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/ConsultasDivisas.php",
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
                        var FECHA= newRow.insertCell(2);
                        var VALOR= newRow.insertCell(3);
                        opciones = opciones + "<option value='"+item.ID+"' style='font-size: 18px;'>"+item.nombre+"</option>";
                        ID.innerHTML = item.ID;
                        NOMBRE.innerHTML = item.nombre;
                        FECHA.innerHTML = item.fecha;
                        VALOR.innerHTML = item.valor;
                        ID.className += "thid";
                        NOMBRE.className += "thid";
						FECHA.className += "thFecha";
                        VALOR.className += "tdDin";
                        selectedRowToInput();
                        document.getElementById("NombreI").style.display = "none";
                        document.getElementById("NombreS").style.display = "inline";
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
                        document.getElementById("NombreI").style.display = "inline";
                        document.getElementById("NombreS").style.display = "none";
                        document.getElementById("NewD").style.display = "none";
                    }
				}
            });

	} catch (error) {
		console.log(error);
	}
}



function ajaxInsert(NOMBRE, VALOR){
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/ConsultasDivisas.php",
            data: {
                select:"insert_Divisa",
                nombre:NOMBRE,
                valor:VALOR
            },
            contentType: "application/json; charset=utf-8",
            dataType: JSON,                    
            cache: false,                       
            success: function(response) { 
            },
            error: function (e) {
                console.log(e.responseText);
                if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                    
                    alert("error al agregar la divisa");	   
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

function ajaxGetHistory(ID) {
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/ConsultasDivisas.php?select=get_all_history",
            data: {
                iddivisa: ID
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) {                        
                var tables2 = document.getElementById("scroll_table3");
                $.each(response, function (i, item) {
                        var newRow = tables2.insertRow(tables2.length);
                        var FECHA= newRow.insertCell(0);
                        var VALOR= newRow.insertCell(1);
                        FECHA.innerHTML = item.fecha;
                        VALOR.innerHTML = item.valor;
                        FECHA.className += "thText";
                        VALOR.className += "tdDin";
                        selectedRowToInput();
                    });
                },
                error: function (e) {
                    console.log(e.responseText);
                    if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                        alert("No se posee historial de esta divisa");
                    } else {
                        alert("Error cargando los datoss");
                    }
                }
            }); 
    } catch (error) {
        console.log(error);
    }
}

function ajaxInsertHistory(ID,VALOR) {
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/ConsultasDivisas.php",
            data: {
                select:"insert_Valor_Divisa",
                ids : ID,
                valor : VALOR,
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) { 
                clearlist1();
                chargeall();
                alert("Agregado el valor de la divisa");
            },
            error: function (e) {
                console.log(e.responseText);
                if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                    alert("error al agregar el valor de la divisa");	   
                }else {
                    clearlist1();
                    alert("Agregad6 el valor de la divisa");
                } 
            }           
        }); 
    } catch (error) {
        console.log(error);
    }
}


function ajaxCambio(ID,FECHA,FECHA2){
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/ConsultasDivisas.php",
            data: {
                select:"Divisa_Cambio",
                id:ID,
                
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) { 
                if (parseInt (response) > 0) {
                    if (FECHA == FECHA2){
                        console.log(response);
                        console.log(ID+document.getElementById("ValorDivisa").value+FECHA);
                        ajaxUpdate(ID,document.getElementById("ValorDivisa").value,FECHA);
                        console.log("misma fecha");
                    }else{
                        console.log(response);
                        ajaxInsertHistory(ID,document.getElementById("ValorDivisa").value);
                        console.log("fecha distinta");
                    }
                } else {
                    alert("Error no se cambio el ultimo valor de la divisa");
                    console.log(response);
                }

            },
            error: function (e) {
                console.log(e.responseText);
                console.log(e);
                if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                    console.log(e);
                    return "error";
                } else{
                    return "cambiado";
                } 
            
            }
            
        }); 
    } catch (error) {
        console.log(error);
    }
}

function ajaxUpdate (ID, VALOR,FECHA){
    console.log("id "+ID);
    console.log("valor "+VALOR);
    console.log("fecha "+FECHA);
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/ConsultasDivisas.php",
            data: {
                select:"update_Divisa",
                valor:VALOR,
                id:ID,
                fecha:FECHA
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) { 
                if (parseInt (response) > 0) {
                    clearlist1();
                    chargeall();
                    alert("Divisa cambiada");
                    console.log(response);
                } else {
                    alert("Error no se cambio el ultimo valor de la divisa");
                    console.log(response);
                    clearlist1();   
                    chargeall();
                }
            },
            error: function (e) {
                console.log(e);
                if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                    alert("error al agregar la divisa");
                    console.log(e);	   
                } else{
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



function ajaxSelect(NOMBRE) {
    var re;
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/ConsultasDivisas.php",
            data: {
                select:"Search_Divisa",
                nombre:NOMBRE,
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) { 
                $.each(response, function (i, item) {
                    console.log(item.id);
                    ajaxInsertHistory(item.id,document.getElementById("ValorDivisa").value);
                    chargeall();
                });
            },
            error: function (e) {
                console.log(e.responseText);
                if ((e.responseText=="No Results") || (e.responseText=="-1")) {
                    console.log(e);
                } 
            }
        }); 
    } catch (error) {
        console.log(error);
    }
}
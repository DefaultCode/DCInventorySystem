var rIndex;

function checkValuesEmpty(){

    var NOMBREF =document.getElementById("NombreDivisa").value,
    NOMBREFS =document.getElementById("NombresDivisas").value,
    VALORF =document.getElementById("ValorDivisa").value,
    empty = false;
    if (document.getElementById("NombreDivisa").style.display == "none" ) {
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
						var NOMBRE= newRow.insertCell(0);
                        var FECHA= newRow.insertCell(1);
                        var VALOR= newRow.insertCell(2);
                        
                        
                        opciones = opciones + "<option value='"+item.nombre+"' style='font-size: 18px;'>"+item.nombre+"</option>";

                        NOMBRE.innerHTML = item.nombre;
                        
                        FECHA.innerHTML = item.fecha;
                        VALOR.innerHTML = item.valor;
                        
						NOMBRE.className += "thid";
						FECHA.className += "thFecha";
                        VALOR.className += "tdDin";
                        
						selectedRowToInput();
					} catch (error) {
						console.log(error);
					}
                    
                    });
                    document.getElementById("NombresDivisas").innerHTML = opciones ;
				},
				error: function (e) {
					console.log(e);
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
			document.getElementById("NombreDivisa").value= this.cells[0].innerHTML;
			document.getElementById("ValorDivisa").value= this.cells[2].innerHTML;
            document.getElementById("Fecha").value= this.cells[1].innerHTML;
			
			var tables2 = document.getElementById("scroll_table3");
			while(tables2.rows.length > 1) {
				tables2.deleteRow(1);
			}
            try {
				$.ajax({
					type: "GET",
					url: "../PHP/ConsultasDivisas.php?select=get_all_history",
					data: {
						nombre: this.cells[0].innerHTML
					},
					contentType: "application/json; charset=utf-8",
					dataType: 'json',                    
					cache: false,                       
					success: function(response) {                        
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
                            if (e.responseText == "No Results") {
								alert("No se posee historial de esta divisa");
							} else {
								alert("Error cargando los datoss");
							}
						}
					}); 
			} catch (error) {
				console.log(error);
			}

		};
	}

}
    function addHTMLTableRow(){
        checkValuesEmpty()
        var tables = document.getElementById("scroll_table1"),
        newRow = tables.insertRow(tables.length),
        NOMBRE= newRow.insertCell(0),
        VALOR= newRow.insertCell(1);
        if (document.getElementById("NombreDivisa").style.display != "none") {
            NOMBRE = document.getElementById("NombreDivisa").value;   
        } else {
            NOMBRE = document.getElementById("NombresDivisas").value;  
        }
        VALOR =document.getElementById("ValorDivisa").value;
        
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        if (dd<10) {
            dd= "0"+dd
        }
        if (mm<10) {
            mm= "0"+mm
        }
        console.log(tables.rows[rIndex-1].cells[1].innerText+" comparacion "+yyyy+"-"+mm+"-"+dd);
        if ( tables.rows[rIndex-1].cells[1].innerText  == yyyy+"-"+mm+"-"+dd ){
            console.log("misma fecha");
            try {
                $.ajax({
                    type: "GET",
                    url: "../PHP/ConsultasDivisas.php",
                    data: {
                        select:"update_Divisa",
                        valor:VALOR,
                        nombre:NOMBRE,
                        fecha:tables.rows[rIndex-1].cells[1].innerText
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: JSON,                    
                    cache: false,                       
                    success: function(response) { 
                    },
                    error: function (e) {
                        console.log(e.responseText);
                        if (e.responseText=="No Results") {
                            
                          /*NOMBRE.innerHTML = NOMBREF;
                            CANTIDAD.innerHTML = CANTIDADF;
                            PRESENTACION.innerHTML = PRESENTACIONF;
                            PRECIOV.innerHTML = PRECIOVF;
                            PRECIOC.innerHTML = PRECIOCF;
                            MARCA.innerHTML = MARCAF;
                            TIPO.innerHTML = TIPOF;
        
                            ID.className += "thid";
                            NOMBRE.className += "thText";
                            CANTIDAD.className += "thCant";
                            PRESENTACION.className += "thText";
                            PRECIOV.className += "thDin";
                            PRECIOC.className += "thDin";
                            MARCA.className += "thDin";
                            TIPO.className += "thCant";
        */
                            alert("error al agregar la divisa");
                            console.log(e);	   
                        } else{
                            alert("Agregada la divisa");
                        } 
                    
                    }
                    
                }); 
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log("fecha distinta");
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
                        if (e.responseText=="-1") {
                            
                          /*  NOMBRE.innerHTML = NOMBREF;
                            CANTIDAD.innerHTML = CANTIDADF;
                            PRESENTACION.innerHTML = PRESENTACIONF;
                            PRECIOV.innerHTML = PRECIOVF;
                            PRECIOC.innerHTML = PRECIOCF;
                            MARCA.innerHTML = MARCAF;
                            TIPO.innerHTML = TIPOF;
        
                            ID.className += "thid";
                            NOMBRE.className += "thText";
                            CANTIDAD.className += "thCant";
                            PRESENTACION.className += "thText";
                            PRECIOV.className += "thDin";
                            PRECIOC.className += "thDin";
                            MARCA.className += "thDin";
                            TIPO.className += "thCant";
        */
                            alert("error al agregar la divisa");	   
                        } else if (e.status==201) {
                            alert("Agregada la divisa");
                        } 
                    
                    }
                    
                }); 
            } catch (error) {
                console.log(error);
            }
        } 
       
        if (document.getElementById("NombreS").style.display == "none") {
            document.getElementById("NombreI").style.display ="none"
            document.getElementById("NombreS").style.display = "inline"
        }
        selectedRowToInput();

    }

function newDivisa(){
    console.log("entro");
    if (document.getElementById("NombreI").style.display = "none") {
        document.getElementById("NombreI").style.display ="inline";
        document.getElementById("NombreS").style.display ="none"
    }
}
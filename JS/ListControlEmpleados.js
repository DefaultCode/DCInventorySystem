var rIndex;

function checkValuesEmpty(){

	var IDF =document.getElementById("IDEmpleado").value,
    NOMBREF =document.getElementById("NombreEmpleado").value,
    PASSF =document.getElementById("PasswordEmpleado").value,
    ROLF =document.getElementById("RolEmpleado").value,
     empty = false;

    if (IDF===""){
		alert("IDEmpleado Cannot be empty");
		empty=true;
	}
	if (NOMBREF==="") {
		alert("NombreEmpleado Cannot be empty");
        empty=true;
    }
    if (PASSF===""){
		alert("PasswordEmpleado Cannot be empty");
		empty=true;
	}
	if (ROLF==="") {
		alert("RolEmpleado Cannot be empty");
        empty=true;
    }
        return empty;
}

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasuser.php?select=getall",
			data: {},
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
                        var PASS= newRow.insertCell(2);
                        var DIA= newRow.insertCell(3);
                        var HORA= newRow.insertCell(4);
                        var ROL= newRow.insertCell(5);

											
						
						ID.innerHTML = item.id;
                        NOMBRE.innerHTML = item.user;
                        PASS.innerHTML = item.password;
                        DIA.innerHTML = item.loggedatdate;
                        HORA.innerHTML = item.loggedattime;	
                        ROL.innerHTML = item.role;											
	
						ID.className += "thid";
						NOMBRE.className += "thid";
                        PASS.className += "thText";
                        DIA.className += "thText";
                        HORA.className += "thText";
                        ROL.className += "thid";
						
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
function addHTMLTableRow(){
	checkValuesEmpty()
	var tables = document.getElementById("scroll_table1"),
	newRow = tables.insertRow(tables.length),
	ID= newRow.insertCell(0),
	NOMBRE= newRow.insertCell(1),
    PASS= newRow.insertCell(2),
    DIA= newRow.insertCell(3),
    HORA= newRow.insertCell(4),
	ROL= newRow.insertCell(5),
	IDF = document.getElementById("IDEmpleado").value,
	NOMBREF =document.getElementById("NombreEmpleado").value,
	PASSF = document.getElementById("PasswordEmpleado").value,
	ROLF = document.getElementById("RolEmpleado").value;
		
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasuser.php?select=insert_user&id="+IDF+"&user="+NOMBREF+"&password="+PASSF+"&role="+ROLF+"&estado="+1,
			data: {},
			contentType: "application/json; charset=utf-8",
			dataType: JSON,                    
			cache: false,                       
			success: function(response) { 
			},
			error: function (e) {
				console.log(e);
				if (e.status==200) {
					ID.innerHTML = IDF;
					NOMBRE.innerHTML = NOMBREF;
					PASS.innerHTML = PASSF;
					ROL.innerHTML = ROLF;
					alert("Usuario agregado");	   
				} else if (e.status==201) {
					alert("Usuario error");
				} 
					
				
			}
			
		}); 
	} catch (error) {
		console.log(error);
	}


	selectedRowToInput();


}
function selectedRowToInput(){
	var tables = document.getElementById("scroll_table1"); 
	for (var i = 0; i <= tables.rows.length-1; i++) {
		tables.rows[i].onclick = function(){
			rIndex=this.rowIndex;
			document.getElementById("IDEmpleado").value= this.cells[0].innerHTML;
			document.getElementById("NombreEmpleado").value= this.cells[1].innerHTML;
			document.getElementById("PasswordEmpleado").value= this.cells[2].innerHTML;
			document.getElementById("RolEmpleado").value= this.cells[5].innerHTML;
			document.getElementById("guardarP").disabled = true;
		};
	}

}
/*function editHtmlTableSelectedRow(){

	if (checkValuesEmpty()==false) {

		var tables = document.getElementById("scroll_table1"),
		IDF = document.getElementById("IDEmpleado").value,
		NOMBREF =document.getElementById("NombreEmpleado").value,
		PASSF = document.getElementById("PasswordEmpleado").value,
		ROLF = document.getElementById("RolEmpleado").value,
		loggedattimeF = document.getElementById("loggedattimeCliente").value;
		try {
			$.ajax({
				type: "POST",
				url: "../PHP/consultascomprador.php",
				data: {
					select:"update_comp",
					codigo: IDF,
					user: NOMBREF,
					password: PASSF,
					loggedatdate:ROLF,
					loggedattime:loggedattimeF,
					estado: 1,
				},
				contentType: "application/json; charset=utf-8",
				dataType: JSON,                    
				cache: false,                       
				success: function(response) { 
				},
				error: function (e) {
					console.log(e.status);
	
					if (e.status==200) {

						tables.rows[rIndex-1].cells[0].innerHTML = IDF;
						tables.rows[rIndex-1].cells[1].innerHTML = NOMBREF;
						tables.rows[rIndex-1].cells[2].innerHTML = PASSF;
						tables.rows[rIndex-1].cells[3].innerHTML = ROLF;
						tables.rows[rIndex-1].cells[4].innerHTML = loggedattimeF;

						document.getElementById("IDEmpleado").value="";
						document.getElementById("NombreEmpleado").value="";
						document.getElementById("PasswordEmpleado").value="";
						document.getElementById("RolEmpleado").value="";
						document.getElementById("loggedattimeCliente").value="";
						alert("Cliente Editado");	   
						document.getElementById("guardarP").disabled = false;
					} else if (e.status==201) {
						alert("Cliente error");

					} 
						
					
				}
				
			}); 
		} catch (error) {
			console.log(error);
		}
	
	
	
	}

}*/

var rIndex;

function checkValuesEmpty(){

	var IDF = document.getElementById("IDMarca").value,
    NOMBREF = document.getElementById("NombreMarca").value,
    empty = false;

    if (IDF===""){
		alert("ID Cannot be empty");
		empty=true;
	}
	if (NOMBREF==="") {
		alert("Nombre Marca Cannot be empty");
        empty=true;
    }
        return empty;
}

function chargeall(){
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasmarca.php?select=getall",
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
                        var ESTADO= newRow.insertCell(2);
											
						
						ID.innerHTML = item.id;
						NOMBRE.innerHTML = item.nombre;
						ESTADO.innerHTML = item.estado;
												
	
						ID.className += "thid";
						NOMBRE.className += "thText";
						ESTADO.className += "thid";
						
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
	IDF = document.getElementById("IDMarca").value,
	NOMBREF =document.getElementById("NombreMarca").value;
		
	try {
		$.ajax({
			type: "GET",
			url: "../PHP/consultasmarca.php?select=insert_marca&id="+IDF+"&nombre="+NOMBREF+"&estado="+1,
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
					alert("Marca agregada");	   
				} else if (e.status==201) {
					alert("Marca error");
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
			document.getElementById("IDMarca").value= this.cells[0].innerHTML;
			document.getElementById("NombreMarca").value= this.cells[1].innerHTML;
			document.getElementById("guardarP").disabled = true;
		};
	}

}
function editHtmlTableSelectedRow(){

	if (checkValuesEmpty()==false) {

		var tables = document.getElementById("scroll_table1"),
		IDF = document.getElementById("IDMarca").value,
		NOMBREF =document.getElementById("NombreMarca").value;
		
		try {
			$.ajax({
				type: "GET",
				url: "../PHP/consultasmarca.php",
				data: {
					select:"update_marca",
					id: IDF,
					nombre: NOMBREF,
					estado: 1,
				},
				contentType: "application/json; charset=utf-8",
				dataType: JSON,                    
				cache: false,                       
				success: function(response) { 
				},
				error: function (e) {
					console.log(e);
	
					if (e.responseText=="sussess") {

						tables.rows[rIndex-1].cells[0].innerHTML = IDF;
						tables.rows[rIndex-1].cells[1].innerHTML = NOMBREF;
						tables.rows[rIndex-1].cells[2].innerHTML = 1;

						document.getElementById("IDMarca").value="";
						document.getElementById("NombreMarca").value="";
						alert("Marca Editada");	   
						document.getElementById("guardarP").disabled = false;
					} else if (e.status==201) {
						alert("error al insertar Marca error");

					} 
						
					
				}
				
			}); 
		} catch (error) {
			console.log(error);
		}
	
	
	
	}

}

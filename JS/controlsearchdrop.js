function cargarP(idP){
    console.log(idP);
    window.open("../HTML/AgregarProducto.html?id="+idP+"","ventana1","width=720,height=400,top=85,left=350") 
}

function cargarProv(idPr){
    console.log(idPr);
    window.open("../HTML/AgregarProveedor.html?id="+idPr+"","ventana1","width=720,height=400,top=85,left=350") 
}

function cargarC(idC){
    console.log(idC);
    window.open("../HTML/AgregarCliente.html?id="+idC+"","ventana1","width=900,height=400,top=85,left=350") 
}

function cargarM(idM){
    console.log(idM);
    window.open("../HTML/AgregarMarca.html?id="+idM+"","ventana1","width=900,height=400,top=85,left=350") 
}

function cargarUser(idU){
    console.log(idU);
    window.open("../HTML/AgregarEmpleado.html?id="+idU+"","ventana1","width=900,height=400,top=85,left=350") 
}


function myFunction() {
			
    var A ="" ;
    var valoranterior = document.getElementById("ibuscar").value
    $("#dropdown").html('<input onkeyup="filterFunction()" id="ibuscar" class="buscar" placeholder="Search..."  value="'+valoranterior+'"  type="text" ></input>');
    if (document.getElementById("ibuscar").value != "" ) {
        try {
            $.ajax({
                type: "GET",
                url: "../PHP/consultasVentas.php?select=buscar&articulo="+document.getElementById("ibuscar").value,
                data: {},
                contentType: "application/json; charset=utf-8",
                dataType: 'json',                    
                cache: false,         
                success: function(response) {                 
                    $.each(response, function (i, item) {
                        try {
                            A  = '<a  class="Aelemente" href="javascript:cargarP('+item.codigo+')"> <i class="fas fa-cubes" style="float: left; font-size: 21px;margin-left:5px ;margin-right:10px ;  " ></i>'+item.nombre+'<p class="dato2" > '+item.presentacion+' </p> </a>'
                            console.log(A);
                            $("#dropdown").append(A);

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
        try {
            $.ajax({
                type: "GET",
                url: "../PHP/consultasmarca.php?select=select_marca&marca="+document.getElementById("ibuscar").value,
                data: {},
                contentType: "application/json; charset=utf-8",
                dataType: 'json',                    
                cache: false,                       
                success: function(response) {                        
                    $.each(response, function (i, item) {
                        try {
                            A  = '<a class="Aelemente" href="javascript:cargarM()"> <i class="fas fa-shapes" style="float: left; font-size: 21px;margin-left:5px ;margin-right:10px ;  " ></i>'+item.nombre+'<p class="dato2" > '+item.estado+' </p> </a>'
                            console.log(A);
                            $("#dropdown").append(A);

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


try {
    $.ajax({
        type: "GET",
        url: "../PHP/consultascomprador.php?select=search_comp&cliente="+document.getElementById("ibuscar").value,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',                    
        cache: false,                       
        success: function(response) {                        
        $.each(response, function (i, item) {
        try {
            A  = '<a class="Aelemente" href="javascript:cargarC()"> <i class="fas fa-user" style="float: left; font-size: 21px;margin-left:5px ; margin-right:13px ; " ></i>'+item.nombre+' <p class="dato2" >'+item.cedula+' </p> </a>'
            console.log(A);
            $("#dropdown").append(A);

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
try {
    $.ajax({
        type: "GET",
        url: "../PHP/consultasproveedor.php?select=search_prov&proveedor="+document.getElementById("ibuscar").value,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',                    
        cache: false,                       
        success: function(response) {                        
        $.each(response, function (i, item) {
        try {
            A  = '<a class="Aelemente" href="javascript:cargarProv()"> <i class="fas fa-handshake" style="float: left; font-size: 21px; margin-right:10px ;  " ></i>'+item.nombre+'<p  class="dato2" > '+item.id+' </p> </a>'
            console.log(A);
            $("#dropdown").append(A);

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

try {
    $.ajax({
        type: "GET",
        url: "../PHP/consultasuser.php?select=search_user&user="+document.getElementById("ibuscar").value,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',                    
        cache: false,                       
        success: function(response) {                        
        $.each(response, function (i, item) {
        try {
            A  = '<a class="Aelemente" href="javascript:cargarUser()"> <i class="fas fa-id-card-alt" style="float: left; font-size: 21px;margin-left:3px ;margin-right:10px ;   " ></i>'+item.user+' <p class="dato2" > '+item.role+' </p> </a>'
            console.log(A);
            $("#dropdown").append(A);

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

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("ibuscar");
  filter = input.value.toUpperCase();
  section = document.getElementById("dropdown");
  a = section.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

        


function cargarCliente(idC){
    console.log(idC);
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/consultascomprador.php?select=search_comp&cliente="+idC,
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) {                        
            $.each(response, function (i, item) {
            try {
                console.log(item);
                document.getElementById("IDCliente").value = item.cedula;
                document.getElementById("NombreCliente").value = item.nombre;
                document.getElementById("ApellidoCliente").value = item.apellido;
                document.getElementById("TelefonoCliente").value = item.telefono;
                document.getElementById("DireccionCliente").value = item.direccion;
                a=document.getElementsByTagName("a");
                for (i = 0; i < a.length; i++) {
                    txtValue = a[i].textContent || a[i].innerText;
                    a[i].style.display = "none";
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

function myFunctionCliente() {	
try {
    $.ajax({
        type: "GET",
        url: "../PHP/consultascomprador.php?select=search_comp&cliente="+document.getElementById("ibuscarCliente").value,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',                    
        cache: false,                       
        success: function(response) {                        
        $.each(response, function (i, item) {
        try {
            A  = '<a class="Aelemente" href="javascript:cargarCliente('+item.cedula+')"> <i class="fas fa-user" style="float: left; font-size: 21px;margin-left:5px ; margin-right:13px ; " ></i>'+item.nombre+' <p class="dato2" >'+item.cedula+' </p> </a>'
            console.log(A);
            $("#dropdownCliente").append(A);

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

function filterFunctionCliente() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("ibuscarCliente");
  filter = input.value.toUpperCase();
  section = document.getElementById("dropdownCliente");
  a = section.getElementsByTagName("a");
  document.getElementById("IDCliente").value = document.getElementById("ibuscarCliente").value;
  for (i = 0; i < a.length; i++) {   
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

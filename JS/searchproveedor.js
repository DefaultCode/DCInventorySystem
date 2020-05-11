
function cargarProveedor(idP){
    console.log(idP);
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/consultasProveedor.php?select=search_prov&proveedor="+idP,
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) {                        
            $.each(response, function (i, item) {
            try {
                console.log(item);
                document.getElementById("IDProveedor").value = item.id;
                document.getElementById("NombreProveedor").value = item.nombre;
                document.getElementById("DireccionProveedor").value = item.direccion;
                document.getElementById("TelefonoProveedor").value = item.telefono;
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

function myFunctionProveedor() {	
try {
    $.ajax({
        type: "GET",
        url: "../PHP/consultasProveedor.php?select=search_prov&proveedor="+document.getElementById("ibuscarProveedor").value,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',                    
        cache: false,                       
        success: function(response) {                        
        $.each(response, function (i, item) {
        try {
            A  = '<a class="Aelemente" href="javascript:cargarProveedor('+item.id+')"> <i class="fas fa-user" style="float: left; font-size: 21px;margin-left:5px ; margin-right:13px ; " ></i>'+item.nombre+' <p class="dato2" >'+item.id+' </p> </a>'
            console.log(A);
            $("#dropdownProveedor").append(A);

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

function filterFunctionProveedor() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("ibuscarProveedor");
  filter = input.value.toUpperCase();
  section = document.getElementById("dropdownProveedor");
  a = section.getElementsByTagName("a");
  document.getElementById("IDProveedor").value = document.getElementById("ibuscarProveedor").value;
  for (i = 0; i < a.length; i++) {   
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

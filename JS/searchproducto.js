
function cargarPro(idC){
    console.log(idC);
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/consultasVentas.php?select=buscar&articulo="+idC,
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) {                        
            $.each(response, function (i, item) {
            try {
                console.log(item);
                document.getElementById("IDProducto").value = item.codigo;
                document.getElementById("IDProducto").disabled = true;
                document.getElementById("NombreProducto").value = item.nombre;
                document.getElementById("NombreProducto").disabled = true;
                document.getElementById("CantProducto").value = 1;
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

function myFunctionPro() {	
try {
    $.ajax({
        type: "GET",
        url: "../PHP/consultasVentas.php?select=buscar&articulo="+document.getElementById("ibuscarPro").value,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: 'json',                    
        cache: false,                       
        success: function(response) {                        
        $.each(response, function (i, item) {
        try {
            A  = '<a class="Aelemente" href="javascript:cargarPro('+item.codigo+')"> <i class="fas fa-cubes" style="float: left; font-size: 21px;margin-left:5px ; margin-right:13px ; " ></i>'+item.nombre+' <p class="dato2" >'+item.codigo+' </p> </a>'
            console.log(A);
            $("#dropdownPro").append(A);

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

function filterFunctionPro() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("ibuscarPro");
  filter = input.value.toUpperCase();
  section = document.getElementById("dropdownPro");
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

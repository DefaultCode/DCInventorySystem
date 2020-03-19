var activo = false;
var activo2 = false;
var activo3 = false;
var activo4 = false;
var activo5 = false;
var activo6 = false;
var rapido = false;


var YTMenu = (function() {

  function init() {
    
    [].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {

      var trigger = el.querySelector( 'div.dr-trigger' ),
        icon = trigger.querySelector( 'span.fa-home' ),
        open = false;
        el.className += ' dr-menu-open';
        open = true;



      

    } );

    [].slice.call( document.querySelectorAll( '.dr-menu-speed' ) ).forEach( function( el, i ) {

      var trigger = el.querySelector( 'div.dr-trigger-speed' ),
        icon = trigger.querySelector( 'span.fa-home-speed' ),
        open = false;
        el.className += ' dr-menu-open-speed';
        open = true;



      

    } );

  }

  init();

})();


function mostrarP(){
  $("#datos").html('<object type="text/html" data="../HTML/ListaProductos.html" > </object>');
  document.getElementById('datos').style.width = "100%";
  return false;
}

function mostrarM(){
  $("#datos").html('<object type="text/html" data="../HTML/ListaMarcas.html" > </object>');
  document.getElementById('datos').style.width = "100%";
  return false;
}

function mostrarC(){
  $("#datos").html('<object type="text/html" data="../HTML/ListaClientes.html" > </object>');
  document.getElementById('datos').style.width = "100%";
  return false;

}

function mostrarProv(){
  $("#datos").html('<object type="text/html" data="../HTML/ListaProveedores.html" > </object>');
  document.getElementById('datos').style.width = "100%";
  return false;
}

function mostrarPa(){
  $("#datos").html('<object type="text/html" data="../HTML/ListaPagos.html" > </object>');
  document.getElementById('datos').style.width = "100%";
  return false;
}

function mostrarV(){
  $("#datos").html('<object type="text/html" data="../HTML/ListaVentas.html" > </object>');
  document.getElementById('datos').style.width = "100%";
  return false;
}
function mostrarEm(){
  $("#datos").html('<object type="text/html" data="../HTML/ListaEmpleados.html" > </object>');
  document.getElementById('datos').style.width = "100%";
  return false;
}

function VentaRapida(){
  $("#rapido").html('<object type="text/html" data="../HTML/FacturaVenta.html" > </object>');
  if (rapido==true) {
    document.getElementById('datos').style.width = "100%";
    document.getElementById('rapido').style.display = 'none';
    rapido=false;
  }else{
    document.getElementById('rapido').style.width = "100%";
    document.getElementById('datos').style.width = "10%";
    document.getElementById('rapido').style.display = 'block';
    document.getElementById('rapido').style.borderLeft = '3px solid orange';
    rapido=true;
  }

}


function imprimir () {
  pro= [];  
  pro[0]= {"nombre":"CUADERNO ESCOLAR FAM", "cantidad":"1", "precio":"89000" }; 
    try {
      $.ajax({
        type: "GET",
        url: "../PHP/serial.php",
        data: {
          productos : pro,
        },
        contentType: "application/json; charset=utf-8",
        dataType: 'json',                    
        cache: false,                       
        success: function(response) {                        
          $.each(response, function (i, item) {
            try {
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


//$('#impresora').on('click', function() { $.get('python.php', {url : '' }); }); 
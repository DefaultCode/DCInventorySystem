function VerificarSessionOtherViews() {
    try {
        $.ajax({
            type: "POST",
            url: "../PHP/abrir.php",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) {                        
                $.each(response, function (i, item) {                         
                });
            },
            error: function (e) {
                console.log(e);
                if (e.responseText=='error') {
                    alert("Debe iniciar la Session Antes");	
                    window.location="../Login.html";
                } else {
                    URLactual = window.parent.location.href;
                    if (URLactual.indexOf("HTML/inicio.html") > -1 ) {
                        console.log(URLactual)    
                    }else{
                        window.location="inicio.html";
                        alert("Ingrese utilice las funciones de la aplicacion para navegar por esta");
                    }
                    
                } 
            }
        }); 
    } catch (error) {
        console.log(error);
    }
}

function VerificarSession(){
    try {
        $.ajax({
            type: "POST",
            url: "../PHP/abrir.php",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) {                        
                $.each(response, function (i, item) {
                                        
                
                });
            },
            error: function (e) {
                console.log(e);
                if (e.responseText=='error') {
                    alert("Debe iniciar la Session Antes");	
                    window.location="../Login.html";
                } else {
                    var num = e.responseText.indexOf(",");
                    console.log(num);
                    var usuario,rol;
                    usuario = e.responseText.substring(0,num);
                    rol = e.responseText.substring(num+1);
                    console.log("nombre del usuario "+usuario+" Roll del usuario "+rol); 
                    document.getElementById("UserName").innerText = "Usuario: "+usuario ;
                    switch (rol) {
                        case "1":
                            document.getElementById("UserRole").innerText = "Rol: Administrador" ;    
                            break
                        case "2":    
                            document.getElementById("UserRole").innerText = "Rol: Gerente" ;
                            break
                        case "3":
                            document.getElementById("UserRole").innerText = "Rol: Empleado" ;
                            break
                    }
                } 
            }
        }); 
    } catch (error) {
        console.log(error);
    }
}

function CerrarSession(){
    try {
        $.ajax({
            type: "POST",
            url: "../PHP/cerrar.php",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) {                        
                $.each(response, function (i, item) {
                                        
                
                });
            },
            error: function (e) {
                if (e.responseText == 'cerrado' ){
                    window.location="../Login.html";
                }else{
                   
                }
                
            }
        }); 
    } catch (error) {
        console.log(error);
    }
}
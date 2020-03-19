
function login(){
    var user = document.getElementById("User").value;
    var pass = document.getElementById("Password").value;
    
    try {
        $.ajax({
            type: "GET",
            url: "../PHP/login.php?User="+user+"&Pass="+pass,
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: 'json',                    
            cache: false,                       
            success: function(response) {                        
                $.each(response, function (i, item) {
                
                    window.location="../HTML/inicio.html";                    
                
                });
            },
            error: function (e) {
                
                alert("Error al iniciar sesion Usuario o contraceña incorectas"); 
                
            }
        }); 
    } catch (error) {
        console.log(error);
    }

}

var input = document.getElementById("Producto");
var inventariolist = [];



    
    new Awesomplete(input, {
        namelist: [] 
    });
    function LlenarNombres (invent) {     
        ninvent = new inventario (invent.nombre,);
        namelist.push(ninvent);    
      }
      
      function getallarticulos (){
        con.connect(function(err) {
          if (err) throw err;
          con.query("SELECT * FROM tblinventario WHERE estado = 1", function (err, result, fields) {
            if (err) throw err;
            result.map(LlenarNombres);
          });
        });
      }
      
      function searcharticulo (search){
        con.connect(function(err) {
          if (err) throw err;
          con.query("SELECT * FROM tblinventario WHERE estado = 1 AND (codigo LIKE ('%" + search + "%') OR nombre LIKE ('%"+ search +"%'))", function (err, result, fields){
            if (err) throw err;
            result.map(LlenarNombres);
          });
        });
      }
      
      function insertarticulo (articulo){
        con.connect(function(err) {
          if (err) throw err;
          var sql ="INSERT INTO tblinventario VALUES (?,?,?,?,?,?,?,?,?,?)";
          var values = [articulo.codigo, articulo.nombre, articulo.presentacion, articulo.preciov, articulo.precioc, articulo.cantidad, articulo.idmarca, articulo.descripcion, articulo.tipo, 1];
          sql = mysql.format (sql, values);
          con.query(sql, function (err, result) {
            if (err) throw err;
          });
        });
      }
      
      function updatearticulo (articulo){
        con.connect(function(err) {
          if (err) throw err;
          var sql = "UPDATE tblinventario SET nombre = ?, presentacion = ?, precio_venta = ?, precio_compra = ?, cantidad = ?, idmarca = ?, descripcion = ? WHERE codigo = ?";
          var values = [articulo.nombre, articulo.presentacion, articulo.preciov, articulo.precioc, articulo.cantidad, articulo.idmarca, articulo.descripcion, articulo.codigo];
          sql = mysql.format (sql, values);
          con.query(sql, function (err, result) {
            if (err) throw err;    
          });
        });    
      }
      
      function notdeletearticulo (articuloid, estado){
        con.connect(function(err) {
          if (err) throw err;
          var sql = "UPDATE tblinventario SET estado = " + estado + " WHERE codigo = '" + articuloid + "'";
          con.query(sql, function (err, result) {
            if (err) throw err;
          });
        });
      }    
      
    
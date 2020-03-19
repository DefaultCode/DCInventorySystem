var inventariolist = [];

var telefonolist = [];

var userslist = [];

var clientelist = [];

var proovedorlist = [];

var facturaventalist = [];

var facturacompralist = [];

var articuloventalist = [];

var articulocompralist = [];

var prespupuestolist = [];

var articulopresupuestolist = [];

function makeconnection (){
  var result = false; 
  con.connect(function(err) {
      if (err) throw err;
      result = true;
  });
  return result;
}

function closeconnection(){
  var result = false;
  con.end(function(err){
      if (err) throw err;
      result = true;
  });
  return result;
}

function llenarinventario (invent) { 
  //console.log(inven.codigo);    
  ninvent = new inventario (invent.codigo, invent.nombre, invent.presentacion, invent.precio_venta, invent.precio_compra, invent.cantidad, invent.idmarca, invent.descripcion, invent.tipo);
  inventariolist.push(ninvent);    
}
function llenartelefono (telef){
  ntelef = new telefono (telef.codigoinventario, telef.serial, telef.numero);
  telefonolist.push(ntelef);
}
function llenarusers (user){
  nuser = new users (user.id, user.user, user.password, user.loggedatdate, user.loggedattime, user.role);
  userslist.push(nuser);
}
function llenarcliente (client){
  ncliente = new cliente (client.cedula, client.nombre, client.apellido, client.direccion, client.telefono);
  clientelist.push(ncliente);
}
function llenarproveedor (prov){
  nproveedor = new proveedor (prov.id, prov.nombre, prov.direccion, prov.telefono, prov.telefono2, prov.correo);
  proveedorlist.push(nproveedor);
}
function llenarfacturaventa(facturav){
  nfacturaventa = new facturaventa (facturav.id, facturav.idcomprador, facturav.total, facturav.fechaemision, facturav.tipo_pago, facturav.estado);
  facturaventalist.push(nfacturaventa);
}
function llenararticuloventa(articulov){
  narticuloventa = new articuloventa (articulov.idfacturanveta, articulov.idproducto, articulov.cantidad, articulov.preciounitario);
  articuloventalist.push(narticuloventa);
}
function llenarfacturacompra(facturac){
  nfacturacompra = new facturacompra (facturac.id, facturac.idproveedor, facturac.fechaemision, facturac.fecharecepcion, facturac.total, facturac.tipopago, facturac.estado, facturac.acotaciondolar);
  facturacompralist.push(narticulocompra);
}
function llenararticulocompra(articuloc){
  narticulocompra = new articulocompra (articuloc.idfacturacompra, articuloc.idproducto, articuloc.cantidad, articuloc.preciocompra, articuloc.precioventa);
  articulocompralist.push(narticulocompra);
}
function llenarpresupuesto (presu){
  npresupuesto = new presupuesto (presu.id, presu.userid, presu.fechaemision, presu.tiempohabil, presu.total, presu.estado);
  prespupuestolist.push(npresupuesto);
}
function llenararticulopresupuesto (articulop){
  narticulopresupuesto = new articulopresupuesto (articulop.idpresupuesto, articulop.idproducto, articulop.cantidad, articulop.preciocompra, articulop.precioventa);
  articulopresupuestolist.push(narticulopresupuesto);
}

function disablealldolardia (){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tbldolardia SET estado = 0";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });    
}

function insertdolardia (fecha, valor){
  con.connect(function(err) {
    if (err) throw err;
    disabledalldolardia();
    var sql ="INSERT INTO tbldolardia VALUES (?,?,?)";
    var values = [fecha, valor, 1];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}
function getdolardia (){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tbldolardia WHERE estado = 1", function (err, result, fields) {
      if (err) throw err;

    });
  });
}

function getallarticulos (){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblinventario WHERE estado = 1", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarinventario);
    });
  });
}

function searcharticulo (search){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblinventario WHERE estado = 1 AND (codigo LIKE ('%" + search + "%') OR nombre LIKE ('%"+ search +"%'))", function (err, result, fields){
      if (err) throw err;
      result.map(llenarinventario);
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
    /*var sql = "INSERT INTO tblinventario VALUES ?";
    var value = [["'" + articulo.codigo + "'", "'" + articulo.nombre + "'", "'" + articulo.presentacion + "'", "'" + articulo.precio_venta + "'", "'" + articulo.precio_compra + "'" , articulo.cantidad, "'" + articulo.idmarca + "'", "'" + articulo.descripcion + "'", articulo.tipo, 1]];
    */
  });
}
function updatearticulo (articulo){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblinventario SET nombre = ?, presentacion = ?, precio_venta = ?, precio_compra = ?, cantidad = ?, idmarca = ?, descripcion = ? WHERE codigo = ?";
    var values = [articulo.nombre, articulo.presentacion, articulo.preciov, articulo.precioc, articulo.cantidad, articulo.idmarca, articulo.descripcion, articulo.codigo];
    sql = mysql.format (sql, values);
    /*var sql = "UPDATE tblinventario SET nombre = '" + articulo.nombre + "', presentacion = '" + articulo.presentacion + "', precio_venta'" + articulo.preciov + "', precio_compra ='" + articulo.precioc + "', cantidad = " + articulo.cantidad + ", idmarca = '" + articulo.idmarca + "', descripcion = '" + articulo.descripcion + "', tipo = " + articulo.tipo + " WHERE codigo = '" + articulo.codigo + "'";*/
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

function getalltelefonos (idinventario){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tbltelefono WHERE codigoinventario = '" + idinventario +"'", function (err, result, fields) {
      if (err) throw err;
      result.map(llenartelefono);
    });
  });
}
function inserttelefono (telefono){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tbltelefono VALUES (?,?,?)";
    var values = [telefono.inventarioid, telefono.serial, telefono.numero];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}
function updatetelefono (telefono){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tbltelefono SET numero = ? WHERE serial = ?";
    var values = [telefono.numero, telefono.serial];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}

function getallusers (){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblusers WHERE estado = 1", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarusers);
    });
  });  
}
function insertuser (user){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblusers VALUES (?,?,?,?,?,?,?)";
    var values = [user.id, user.user, user.password, user.loggedatdate, user.loggedattime, user.role, 1];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}
function updateuser (user){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblusers SET user = ?, password = ?, role = ? WHERE id = ?";
    var values = [user.user, user.password, user.role, user.id];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}
//revisar como colocar el tiempo y la fecha actual
function updatelogin (user){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblusers SET loggedatdate = ?, loggedattime = ?WHERE id = ?";
    var values = [fecha, tiempo, user.id];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}
function notdeleteuser (userid, estado){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblusers SET estado = ? WHERE id = ?";
    var values = [estado, userid];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}

function getallclientes (){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblcomprador WHERE estado = 1", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarcliente);
    });
  });  
}
function searchcliente (search){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblcomprador WHERE estado = 1 AND (cedula LIKE ('%"+ search +"%') OR nombre LIKE ('%" + search + "%') OR apellido LIKE ('%" + search + "%'))", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarcliente);
    });
  });  
}
function insertcliente (cliente){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblcomprador VALUES (?,?,?,?,?,?,?)";
    var values = [cliente.cedula, cliente.nombre, cliente.apellido, cliente.direccion, cliente.telefono, 1];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}
function updatecliente (cliente){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblcomprador SET nombre = ?, apellido = ?, direccion = ?, telefono = ? WHERE cedula = ?";
    var values = [cliente.nombre, cliente.apellido, cliente.direccion, cliente.telefono, cliente.cedula];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}
function notdeletecliente (cedula, estado){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblcomprador SET estado = ? WHERE cedula = ?";
    var values = [estado, cedula];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}

function getallproveedores (){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblproveedor WHERE estado = 1", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarproveedor);
    });
  });
}
function searchproveedor (search){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblproveedor WHERE estado = true AND (id LIKE ('%" + search + "%') OR nombre LIKE ('%"+ search +"%'))", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarproveedor);
    });
  });
}

function insertproveedor (proveedor){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblproveedor VALUES (?,?,?,?,?,?,?)";
    var values = [proveedor.id, proveedor.nombre, proveedor.direccion, proveedor.telefono, proveedor.telefono2, proveedor.correo, 1];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}
function updateproveedor (proveedor){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblproveedor SET nombre = ?, direccion = ?, telefono = ?, telefono2 = ?, correo = ? WHERE id = ?";
    var values = [proveedor.nombre, proveedor.direccion, proveedor.telefono, proveedor.telefono2, proveedor.correo, proveedor.id];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}
function notdeleteproveedor (estado, proveedorid){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblproveedor SET estado = ? WHERE id = ?";
    var values = [estado, proveedorid];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}

function getallfacturaventa (){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblfacturaventa", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarfacturaventa);
    });
  });
}
function searchfacturaventabydate (fechainicio, fechafin){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblfacturaventa WHERE (fechaemision BETWEEN "+ fechainicio + "AND" + fechafin + ") AND estado = 1 ORDER BY fechaemision", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarfacturaventa);
    });
  });
}
function insertfacturaventa (facturaventa){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblfacturaventa VALUES (?,?,?,?,?,?)";
    var values = [facturaventa.id, facturaventa.idcomprador, facturaventa.total, facturaventa.fechaemision, facturaventa.tipo_pago, 1];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}
function notdeletefacturaventa (estado, facturaventaid){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblfacturaventa SET estado = ? WHERE id = ?";
    var values = [estado, facturaventaid];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}

function getallarticuloventa (idfacturaventa){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblarticuloventa WHERE idfacturaventa = '" + idfacturaventa + "'", function (err, result, fields) {
      if (err) throw err;
      result.map(llenararticuloventa);
    });
  });
}
function insertarticuloventa (articuloventa){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblarticuloventa VALUES (?,?,?,?)";
    var values = [articuloventa.idfacturaventa, articuloventa.idproducto, articuloventa.cantidad, articuloventa.preciounitario];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}

function getallfacturacompra (){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblfacturacompra", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarfacturaventa);
    });
  });
}
function searchfacturacomprabydate (fechainicio, fechafin){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblfacturacompra WHERE (fechaemision BETWEEN " + fechainicio + "AND" + fechafin + ") AND estado IN (0, 1) ORDER BY estado", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarfacturaventa);
    });
  });
}
function insertfacturacompra (facturacompra){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblfacturacompra VALUES (?,?,?,?,?,?,?,?)";
    var values = [facturacompra.id, facturacompra.idproveedor, facturacompra.fechaemision, facturacompra.fecharecepcion, facturacompra.total, facturacompra.tipopago, facturacompra.estado, facturacompra.acotaciondolar];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}
function notdeletefacturacompra (estado, facturacompraid){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblfacturacompra SET estado = ? WHERE id = ?";
    var values = [estado, facturacompraid];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}

function getallarticulocompra (idfacturacompra){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblarticulocompra WHERE idfacturacompra = '" + idfacturacompra + "'", function (err, result, fields) {
      if (err) throw err;
      result.map(llenararticulocompra);
    });
  });
}
function insertarticulocompra (articulocompra){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblarticulocompra VALUES (?,?,?,?,?)";
    var values = [articulocompra.idfacturacompra, articulocompra.idproducto, articulocompra.cantidad, articulocompra.preciocompra, articulocompra.precioventa];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}

function getallpresupuesto () {
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblpresupuesto", function (err, result, fields) {
      if (err) throw err;
      result.map(llenarpresupuesto);
    });
  });
}
function insertpresupuesto (presupuesto){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblpresupuesto VALUES (?,?,?,?,?,?)";
    var values = [presupuesto.id, presupuesto.userid, presupuesto.fechaemision, presupuesto.tiempohabil, presupuesto.total, presupuesto.estado];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}
function notdeletepresupuesto (estado, presupuestoid){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE tblpresupuesto SET estado = ? WHERE id = ?";
    var values = [estado, presupuestoid];
    sql = mysql.format (sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;    
    });
  });    
}

function getallarticulopresupuesto (idpresupuesto){
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tblarticulopresupuesto WHERE idpresupuesto = '" + idpresupuesto + "'", function (err, result, fields) {
      if (err) throw err;
      result.map(llenararticulopresupuesto);
    });
  });
}
function insertarticulopresupuesto (articulopresupuesto){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO tblarticulopresupuesto VALUES (?,?,?,?,?)";
    var values = [articulopresupuesto.idpresupuesto, articulopresupuesto.idproducto, articulopresupuesto.cantidad, articulopresupuesto.preciocompra, articulopresupuesto.precioventa];
    sql = mysql.format(sql, values);
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });

}
class inventario {
	constructor (Ccodigo, Cnombre, Cpresentacion, Cpreciov, Cprecioc, Ccantidad, Cidmarca, Cdescription, Ctipo) {
		this.codigo = Ccodigo;
		this.nombre = Cnombre;
		this.presentacion = Cpresentacion;
		this.preciov = Cpreciov;
		this.precioc = Cprecioc;
		this.cantidad = Ccantidad;
		this.idmarca = Cidmarca;
		this.descripcion = Cdescription;
		this.tipo = Ctipo;
	}
	getCodigo () {
		return this.codigo;
	}
	getNombre () {
		return this.nombre;
	}
	getPresentacion (){
		return this.presentacion;
	}
	getPreciov () {
		return this.preciov;
	}
	getPrecioc () {
		return this.precioc;
	}
	getCantidad () {
		return this.cantidad;
	}
	getIdmarca () {
		return this.idmarca;
	}						
	getDescripcion () {
		return this.descripcion;
	}
	getTipo () {
		return this.Ctipo;
	}
	setCodigo (Ccodigo){
		this.codigo = Ccodigo;
	}
	setNombre(Cnombre){
		this.nombre = Cnombre;
	}				
	setPresentacion (Cpresentacion){
		this.presentacion = Cpresentacion;
	}
	setPreciov(Cpreciov){
		this.preciov = Cpreciov;
	}
	setPrecioc(Cprecioc){
		this.precioc = Cprecioc;
	}	
	setCantidad(Ccantidad){
		this.cantidad = Ccantidad;
	}
	setDescripcion(Cdescripcion){
		this.descripcion = Cdescripcion;
	}
}
class telefono {
	constructor (Cinventarioid, Cserial, Cnumero) {
		this.inventarioid = Cinventarioid;
		this.serial = Cserial;
		this.numero = Cnumero;
	}
	getInventarioid (){
		return this.inventarioid;
	}
	getSerial() {
		return this.serial;
	}
	getNumero() {
		return this.numero;
	}
	setInventarioid(Cinventarioid) {
		this.inventarioid = Cinventarioid;
	}		
	setSerial(Cserial){
		this.serial = Cserial;
	}
	setNumero(Cnumero){
		this.numero = Cnumero;
	}				
}

class users {
	constructor (Cid, Cuser, Cpassword, Cloggeddate, Cloggedtime, Crole) {
		this.id = Cid;
		this.user = Cuser;
		this.password = Cpassword;
		this.loggededatdate = Cloggeddate;
		this.loggedattime = CLoggedtime;
		this.role = Crole;
	}
	getId () {
		return this.id;
	}
	getUser () {
		return this.user;
	}
	getPassword () {
		return this.password;
	}
	getLoggedatdate () {
		return this.loggedatdate;
	}
	getLoggedattime () {
		return this.loggedattime;
	}
	getRole (){
		return this.role;
	}	
	setId(Cid){
		this.id = Cid;
	}
	setUser(Cuser){
		this.user = Cuser;
	}
	setPassword(Cpassword){
		this.password = Cpassword;
	}
	setLoggedatdate(Cloggeddate){
		this.loggdedatdate = Cloggeddate;
	}
	setLoggedattime(Cloggedtime){
		this.loggedattime = Cloggedtime;
	}
	setRole(Crole){
		this.role = Crole;
	}						
}

class cliente {
	constructor (Ccedula, Cnombre, Capellido, Cdireccion, Ctelefono) {
		this.cedula = Ccedula;
		this.nombre = Cnombre;
		this.apellido = Capellido;
		this.direccion = Cdireccion;
		this.telefono = Ctelefono;
	}
	getCedula () {
		return this.cedula;
	}
	getNombre () {
		return this.nombre;
	}
	getApellido () {
		return this.apellido;
	}
	getDireccion () {
		return this.direccion;
	}
	getTelefono () {
		return this.telefono;
	}
	setCedula(Ccedula){
		this.cedula = Ccedula;
	}
	setNombre(Cnombre){
		this.nombre = Cnombre;
	}
	setApellido(Capellido){
		this.apellido = Capellido;
	}
	setDireccion(Cdireccion){
		this.direccion = Cdireccion;
	}
	setTelefono(Ctelefono){
		this.telefono = Ctelefono;
	}							
}

class proveedor {
	constructor (Cid, Cnombre, Cdireccion, Ctelefono, Ctelefono2, Ccorreo) {
		this.id = Cid;
		this.nombre = Cnombre;
		this.direccion = Cdireccion;
		this.telefono = Ctelefono;
		this.telefono2 = Ctelefono2;
		this.correo = Ccorreo
	}
	getId () {
		return this.id;
	}
	getNombre () {
		return this.nombre;
	}
	getDireccion () {
		return this.direccion;
	}
	getTelefono () {
		return this.telefono;
	}
	getTelefono2 () {
		return this.telefono2;
	}
	getCorreo () {
		return this.correo
	}
	setId(Cid){
		this.id = Cid;
	}
	setNombre(Cnombre){
		this.nombre = Cnombre;
	}
	setDireccion(Cdireccion){
		this.direccion = Cdireccion;
	}
	setTelefono(Ctelefono){
		this.telefono = Ctelefono;
	}
	setTelefono2(Ctelefono2){
		this.telefono2 = Ctelefono2;
	}
	setCorreo(Ccorreo){
		this.correo = Ccorreo;
	}							
}

class facturaventa {
	constructor (Cid, Cidcomprador, Ctotal, Cfechaemision, Ctipopago, Cestado) {
		this.id = Cid;
		this.idcomprador = Cidcomprador;
		this.total = Ctotal;
		this.fechaemision = Cfechaemision;
		this.tipo_pago = Ctipopago;
		this.estado = Cestado
	}
	getId () {
		return this.id;
	}
	getIdcomprador () {
		return this.idcomprador;
	}
	getTotal () {
		return this.total;
	}
	getFechaemision () {
		return this.fechaemision;
	}
	getTipo_pago () {
		return this.Tipo_pago;
	}
	getEstado () {
		return this.estado;
	}					
	setId(Cid){
		this.id = Cid;
	}
	setIdcomprador(Cidcomprador){
		this.idcomprador = Cidcomprador;
	}
	setTotal(Ctotal){
		this.total = Ctotal;
	}
	setFechaemision(Cfechaemision){
		this.fechaemision = Cfechaemision;
	}
	setTipo_pago(Ctipopago){
		this.tipo_pago = Ctipopago;
	}
	setEstado(Cestado){
		this.estado = Cestado;
	}		
}

class articuloventa {
	constructor (Cidfacturaventa, Cidproducto, Ccantidad, Cpreciounitario) {
		this.idfacturaventa = Cidfacturaventa;
		this.idproducto = Cidproducto;
		this.cantidad = Ccantidad;
		this.preciounitario = Cpreciounitario;
	}
	getIdfacturaventa () {
		return this.idfacturaventa;
	}
	getIdproducto () {
		return this.idproducto;
	}
	getCantidad () {
		return this.cantidad;
	}
	getPreciounitario () {
		return this.preciounitario;
	}		
	setIdcomprador(Cidcomprador){
		this.idcomprador = CidComprador;
	}
	setIdfacturaventa(Cidfacturaventa){
		this.idfacturaventa = Cidfacturaventa;
	}
	setIdproducto(Cidproducto){
		this.idproducto = Cidproducto;
	}
	setCantidad(Ccantidad){
		this.cantidad = Ccantidad;
	}
	setPreciounitario(Cpreciounitario){
		this.preciounitario = Cpreciounitario;
	}				
}

class facturacompra {
	constructor (Cid, Cidproveedor, Cfechaemision, Cfecharecepcion, Ctotal, Ctipopago, Cestado, Cacotaciondolar) {
		this.id = Cid;
		this.idproveedor = Cidproveedor;
		this.fechaemision = Cfechaemision;
		this.fecharecepcion = Cfecharecepcion;
		this.total = Ctotal;
		this.tipopago = Ctipopago;
		this.estado = Cestado;
		this.acotaciondolar = Cacotaciondolar;

	}
	getId () {
		return this.id;
	}
	getIdproveedor () {
		return this.idproveedor;
	}
	getFechaemision () {
		return this.fechaemision;
	}
	getFecharecepcion () {
		return this.fecharecepcion;
	}
	getTotal () {
		return this.total;
	}
	getTipopago (){
		return this.tipopago;
	}
	getEstado (){
		return this.estado;
	}
	getAcotaciondolar(){
		return this.acotaciondolar;
	}	
	setId(Cid){
		this.id = Cid;
	}
	setIdproveedor(Cidproveedor){
		this.idproveedor = Cidproveedor;
	}
	setFechaemision(Cfechaemision){
		this.fechaemision = Cfechaemision;
	}
	setFecharecepcion(Cfecharecepcion){
		this.fecharecepcion = Cfecharecepcion;
	}
	setTotal(Ctotal){
		this.total = Ctotal;
	}
	setTipopago(Ctipopago){
		this.tipopago = Ctipopago;
	}	
	setEstado(Cestado){
		this.estado = Cestado;
	}
	setAcotaciondolar(Cacotaciondolar){
		this.acotaciondolar = Cacotaciondolar;
	}			
}

class articulocompra {
	constructor (Cidfacturacompra, Cidproducto, Ccantidad, Cpreciocompra, Cprecioventa) {
		this.idfacturacompra = Cidfacturacompra;
		this.idproducto = Cidproducto;
		this.cantidad = Ccantidad;
		this.preciocompra = Cpreciocompra;
		this.precioventa = Cprecioventa;
	}
	getIdfacturacompra () {
		return this.idfacturacompra;
	}
	getIdproducto () {
		return this.idproducto;
	}
	getCantidad() {
		return this.cantidad;
	}
	getPreciocompra(){
		return this.preciocompra;
	}
	getPrecioventa (){
		return this.precioventa;
	}
	setIdfacturacompra(Cidfacturacompra){
		this.facturacompra = Cidfacturacompra;
	}
	setIdproducto(Cidproducto){
		this.idproducto = Cidproducto;
	}
	setCantidad(Ccantidad){
		this.cantidad = Ccantidad;
	}
	getPreciocompra(Cpreciocompra){
		this.preciocompra = Cpreciocompra;
	}
	getPrecioventa(Cprecioventa){
		this.precioventa = Cprecioventa;
	}			
}

class presupuesto {
	constructor (Cid, Cuserid, Cfechaemision, Ctiempohabil, Ctotal, Cestado) {
		this.id = Cid;
		this.userid = Cuserid;
		this.fechaemision = Cfechaemision;
		this.tiempohabil = Ctiempohabil;
		this.total = Ctotal;
		this.estado = Cestado;
 	}
 	getId (){
 		return this.id;
 	}
 	getUserid (){
 		return this.userid;
 	}
 	getFechaemision (){
 		return this.fechaemision;
 	}
 	getTiempohabil (){
 		return this.tiempohabil;
 	}
 	getTotal (){
 		return this.total;
 	}
 	getEstado (){
 		return this.Estado;
 	}
	setId(Cid){
		this.id = Cid;
	}
	setUserid(Cuserid){
		this.userid = Cuserid;
	}
	setFechaemision(Cfechaemision){
		this.fechaemision = Cfechaemision;
	}
	setTiempohabil(Ctiempohabil){
		this.tiempohabil = Ctiempohabil;
	}
	setTotal(Ctotal){
		this.total = Ctotal;
	}
	setEstado(Cestado){
		this.estado = Cestado;
	}

}

class articulopresupuesto {
	constructor (Cidpresupuesto, Cidproducto, Ccantidad, Cpreciocompra, Cprecioventa){
		this.idpresupuesto = Cidpresupuesto;
		this.idproducto = Cidproducto;
		this.cantidad = Ccantidad;
		this.preciocompra = Cpreciocompra;
		this.precioventa = Cprecioventa;
	}
	getIdpresupuesto (){
		return this.idpresupuesto;
	}
	getIdproducto (){
		return this.idproducto
	}
	getCantidad (){
		return this.cantidad;
	}
	getPreciocompra (){
		return this.preciocompra;
	}
	getPrecioventa (){
		return this.precioventa;
	}
	setIdpresupuesto(Cidpresupuesto){
		this.idpresupuesto = Cidpresupuesto;
	}
	setIdproducto(Cidproducto){
		this.idproducto = Cidproducto;
	}
	setCantidad(Ccantidad){
		this.cantidad = Ccantidad;
	}
	setPreciocompra(Cpreciocompra){
		this.preciocompra = Cpreciocompra;
	}
	setPrecioventa(Cprecioventa){
		this.precioventa = Cprecioventa;
	}
}

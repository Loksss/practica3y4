const mongoose = require("./connect");
var MASCOTASCHEMA = {
    nombre: String,
    descripcion: String,
    tipo: String
}
const MASCOTA = mongoose.model("Mascota",MASCOTASCHEMA);
module.exports = MASCOTA;
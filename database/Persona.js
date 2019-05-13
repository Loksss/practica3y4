const mongoose = require("./connect");
var PERSONASCHEMA = {
    nombre: String,
    ci: String,
    edad: String,
    fechaRegistro: Date
}
const PERSONAS = mongoose.model("Persona",PERSONASCHEMA);
module.exports = PERSONAS;
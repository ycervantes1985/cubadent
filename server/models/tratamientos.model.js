const { Schema, model } = require('mongoose');

const TratamientosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Debe ingresar un nombre de tratamiento"],
        minlength: [3, "Nombre no puede tener menos de 2 caracteres"]
    },
    descripcion: {
        type: String,
        required: [true, "Debe ingresar una descripcion"],
        minlength: [3, "descripcion no puede tener menos de 2 caracteres"]
    },
    estatus: {
        type: String,
 }, 

 foto: {
    type: String,
}, 

}, { timestamps: true });

const Tratamiento = model('Tratamiento', TratamientosSchema);

module.exports = {
    Tratamiento,
    TratamientosSchema
};
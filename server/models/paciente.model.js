const { Schema, model } = require('mongoose');
const { TratamientosSchema } = require('./tratamientos.model');

const uniqueValidator = require("mongoose-unique-validator")

const PacienteSchema = new Schema({
    name: {
        type: String,
        required: [true, "Debe ingresar un nombre de paciente"],
        minlength: [3, "Nombre de paciente no puede tener menos de 2 caracteres"]
    },
    apellidos: {
        type: String,
        required: [true, "Debe Apellidos"],
    },
    direccion: {
        type: String,
        required: [true, "Debe ingresar una direccion"],
    },
    rut: {
        type: String,
        required: [true, "Debe ingresar un rut"],
        validate:{
            validator:(val)=>/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/.test(val),
            message:"Por favor ingresa un rut valido"
        },
        unique:true
    }, 
    telefono: {
        type: String,
        required: [true, "Debe ingresar un telefono"],
    },
    telefonoEm: {
        type: String,
        required: [true, "Debe ingresar un telefono"],
    },
    edad: {
        type: Number,
        required: [true, "Debe ingresar una edad"],        
    }, 
    antecedentesEnfermedades: {
        type: String,
    },
    tratamientoMedico: {
        type: String,
    },
    alergias: {
        type: String,
    },
    diagnostico: {
        type: String,
    },
    
    tratamientos: [TratamientosSchema],
    

}, { timestamps: true });

PacienteSchema.plugin(uniqueValidator,{message:"Error, el rut ya existe"});

const Paciente = model('Paciente', PacienteSchema);

module.exports = Paciente;
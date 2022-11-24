const UserController = require("./controllers/user.controller")
const authenticate = require("./config/authenticate")
const { getTratamientosFromPaciente, addPaciente, getAllPacientes, deletePaciente, updatePaciente, getOnePaciente, addPacienteTratamiento } = require("./controllers/pacientes.controllers");

module.exports = function(app){

    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);

    
    app.get("/api/users", UserController.getAll);
    app.get("/api/user/:id",UserController.getUser)

    //Pacientes Routes
    app.post('/api/paciente', addPaciente);
    app.get('/api/paciente', getAllPacientes);
    app.get('/api/paciente/:id', getOnePaciente)
    app.delete('/api/paciente/:id', deletePaciente);
    app.put('/api/paciente/:id', updatePaciente)
    app.post('/api/paciente/tratamiento/:id', addPacienteTratamiento)
    app.get('/api/paciente/tratamiento/:id', getTratamientosFromPaciente)
}
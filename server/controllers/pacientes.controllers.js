const Paciente = require("../models/paciente.model")

module.exports.addPaciente = async (req, res) => {
    try {
        const newPaciente = await Paciente.create(req.body);
        res.json({ 
            message: 'Se ha creado un paciente de manera exitosa',
            newPaciente
        });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Ups no hemos podido crear el paciente',
            error
        })
        
    }
        
}

module.exports.getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find().sort({"createdAt":-1}).exec()          
        res.json({ 
            message: 'Se han traído de manera exitosa los pacientes',
            pacientes
        })

    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos podido traer el paciente',
            err
        })
    }
}

module.exports.deletePaciente = async (req, res) => {
    try {
        const { id } = req.params;

        await Paciente.deleteOne({ _id: id });
        res.json({ 
            message: 'Se ha eliminado el paciente'
        })

    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos podido eliminar el paciente',
            err
        })
    };
}

module.exports.updatePaciente = async (req, res) => {
    try {
        const { id } = req.params;
        
        const pacienteUpdated = await Paciente.findByIdAndUpdate(id, req.body, { new: true });           
        res.json({ 
            message: 'Se ha actualizado paciente',
            pacienteUpdated
        })


    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos actualizar el paciente',
            err
        });
    };
}

module.exports.getOnePaciente = async (req, res) => {
    try {
        const { id } = req.params;

        const paciente = await Paciente.findById(id);
        res.json({ 
            message: 'Se ha conseguido el paciente',
            paciente
        });

    } catch(err) {
        res.status(404).json({ 
            message: 'Ups no hemos podido conseguir el paciente',
            err
        });
    }
}

module.exports.addPacienteTratamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const pacienteUpdated = await Paciente.findByIdAndUpdate(id, {
            $push: {
                tratamientos: req.body,                
            }
        }, { new: true });

        

        res.json({ message: 'Se ha actualizado paciente', pacienteUpdated })


    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos actualizar',
            err
        });
    }
}

module.exports.getTratamientosFromPaciente = async (req, res) =>{
    try {
        const { id } = req.params;
        const paciente = await Paciente.findById(id).populate({
            path: 'tratamientos'
            
        }).sort({createdAt:'desc'}).exec();
        
            res.json({ 
            message: 'Se ha conseguido un paciente',
            tratamientos: paciente.tratamientos
        });

    } catch(err) {
        res.status(404).json({ 
            message: 'Ups no hemos podido conseguir el paciente',
            err
        });
    }
}
  
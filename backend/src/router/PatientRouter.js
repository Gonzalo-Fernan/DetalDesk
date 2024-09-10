import { Router } from "express";
import PatientController from "../controllers/patient.controller.js";


const patientRouter = Router()
export default patientRouter

const patientController = new PatientController()


patientRouter.get("/", async (req, res) => {
    try {
        const allPatients = await patientController.getAll()
        res.status(200).json(allPatients)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pacientes", error: error.message });
    }
});

patientRouter.post("/addPatient", async (req,res)=>{
    const newPatient = req.body
    
    const patientAded = await patientController.addPatient(newPatient)

    res.status(200).json({ message: "Paciente agregado exitosamente", event: newPatient });
})

patientRouter.delete("/deletePatient/:pid", async (req, res)=>{

    try {
        const patientId = req.params.eid
        
        const patientToDelete = await patientController.deleteEvent(patientId)

        res.status(200).json({ message: "Paciente eliminado exitosamente", patienttId: patientId });

    } catch (error) {
        console.log("Error al intentar elminar el paciente");
        
    }
    
})

import { Router } from "express";
import PatientController from "../controllers/patient.controller.js";
import multer from "multer";
import path from "path";



const patientRouter = Router()
export default patientRouter

const patientController = new PatientController()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/patients'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });


patientRouter.get("/", async (req, res) => {
    try {
        const allPatients = await patientController.getAll()
        res.status(200).json(allPatients)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pacientes", error: error.message });
    }
});

patientRouter.post("/addPatient", upload.single('thumbnail'), async (req, res) => {
    try {
        console.log("PATH", path.dirname);
        
      const newPatient = req.body;
      const file = req.file; // La imagen subida por el cliente
      
      
      // Añadir la ruta de la imagen a los datos del paciente
      if (file) {
        newPatient.thumbnail = `../../backend/public/uploads/patients/${file.filename}`;
      }
  
      console.log("ROUTER", newPatient);
      const patientAdded = await patientController.addPatient(newPatient);
      res.status(200).json({ message: "Paciente agregado exitosamente", patient: newPatient });
  
    } catch (error) {
      console.log("Error al agregar paciente", error);
      res.status(500).json({ message: "Error al agregar paciente", error: error.message });
    }
  });
  

patientRouter.delete("/deletePatient/:eid", async (req, res)=>{

    try {
        const patientId = req.params.eid
        
        const patientToDelete = await patientController.deleteEvent(patientId)

        res.status(200).json({ message: "Paciente eliminado exitosamente", patienttId: patientId });

    } catch (error) {
        console.log("Error al intentar elminar el paciente");
        
    }
    
})

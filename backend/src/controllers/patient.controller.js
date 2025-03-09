import fs from "fs";


export default class PatientController {
    constructor(patients = []){
        this.PATH = "./src/patients/patients.json" 
        this.patients = patients
    }



getAll = async () =>{
    try {
        const allPatients = await fs.promises.readFile(this.PATH, "utf-8")
        const result = JSON.parse(allPatients)
        return result
    } catch (error) {
        console.log("error al obtener los pacientes");
        
    }
}

addPatient = async (newPatient) => {
    try {
      const { name, last_name, address, phone_number, email, doctor, thumbnail } = newPatient;

      const data = await fs.promises.readFile(this.PATH, "utf-8");
      this.patients = data ? JSON.parse(data) : [];
      const maxId = this.patients.length > 0 ? Math.max(...this.patients.map(patient => patient.id)) : 0;
      const newId = maxId + 1;

      const patient = {
        id: newId,
        name,
        last_name,
        address,
        phone_number,
        email,
        doctor,
        thumbnail // Añadir la ruta de la imagen
      };

      this.patients.push(patient);
      await fs.promises.writeFile(this.PATH, JSON.stringify(this.patients, null, 2), 'utf8');

    } catch (error) {
      console.log("Error al agregar paciente", error);
    }
  }


deletePatient = async (id) =>{
    try {
        const data = await fs.promises.readFile(this.PATH, "utf-8")
        this.patients = data ? JSON.parse(data) : [];

        const updatedPatients = this.patients.filter(p => p.id != id)
        console.log(updatedPatients)
        

        await fs.promises.writeFile(this.PATH, JSON.stringify(updatedPatients, null, 2), "utf-8");

        console.log(`Paciente con ID ${id} eliminado con éxito.`)


    } catch (error) {
        console.log("Error al eliminar el paciente")
    }
}
}

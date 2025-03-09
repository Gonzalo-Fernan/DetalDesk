import { useEffect} from "react"
import { useState } from "react"
import DentalChart from "./DentalChart.jsx"



const Pacientes = () =>{
    const [patients, setPatients] = useState([])
    const [showPatient, setShowPatient]= useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientList, setPatientList] = useState(true)
    const [patientDetails, setPatientDeytails] = useState(false)
    const [newPatient, setNewPatient] = useState(false)
    const [search, setSearch] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        address: "",
        phone_number: "",
        email: "",
        doctor: "",
        thumbnail: "",
      });
      
      // esta varieble renderiza la lista de pacientes, o los pacientes que coinciden con la busqueda
      const allPatients = !search ? patients :  patients.filter((patient) => patient.name.toLowerCase().includes(search.toLocaleLowerCase()) || patient.last_name.toLowerCase().includes(search.toLocaleLowerCase())) 
  
      //se piden los datos de la lista de pacientes al servidor
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await fetch("http://localhost:8080/api/patients");
                if (!response.ok) {
                  throw new Error("Error al obtener los pacientes: " + response.statusText);
                }
                const data = await response.json();
                
                setPatients(data);
                
                
            } catch (error) {
                console.error("Error al cargar los pacientes:", error);
            }
            
        }
        fetchData()
        
    },[])


    // funcion para agregar un nuevo paciente
    const handleNewPatient = async (e) => {
      e.preventDefault();
    
      // Usamos FormData para incluir tanto los datos como el archivo
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      
      // Enviar la imagen al backend
      const response = await fetch("http://localhost:8080/api/patients/addPatient", {
        method: 'POST',
        body: formDataToSend, 
      });
    
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      
      const result = await response.json();
      setNewPatient(!newPatient);
      setPatients((prevData) => [...prevData, result.patient]);
    }

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: files ? files[0] : value,
        }));
      };

    const searcher = (e) => {
      setSearch(e.target.value.toLocaleLowerCase())
    }
  
    const handlePatientButton = (patient)=>{
        setShowPatient(true)
        setSelectedPatient(patient)
    }

    return(
        <section className="flex items-start justify-start w-full h-lvh bg-emerald-800">
            <article className="flex flex-col gap-10 h-4/5 w-96">
                <aside className="flex flex-col gap-10 items-center justify-start">
                    <h3 className="text-3xl text-white font-bold mt-10">PACIENTES</h3>
                    <form action="" className="flex flex-col gap-5">
                        <input className="rounded-xl p-3 w-full " type="text" onChange={searcher} value={search} placeholder="Buscar..."/>
{/*                         <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-700 text-white shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] hover:scale-105  p-3" >Buscar Paciente</button>
                   */}  </form>
                        <button onClick={()=>{setNewPatient(!newPatient)}} className="rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-700 text-white shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] hover:scale-105  p-3">Agregar Nuevo Paciente</button>
                </aside>
                <aside className="w-full h-full flex flex-col items-center justify-start pt-10 ">
                    {showPatient && ( 
                        <div className="mt-9 flex flex-col gap-4 items-center text-white ">
                            <h3 className="text-3xl font-bold text-white">Perfil del Paciente</h3>
                            <img src={selectedPatient.thumbnail? selectedPatient.thumbnail : "/usuario.png"} alt="" className="rounded-full w-40 h-40 object-cover "/>
                            <p>Nombre:  <strong>{selectedPatient.name}</strong></p>
                            <p>Apellido:  <strong>{selectedPatient.last_name}</strong></p>
                            <p>Email:  <strong>{selectedPatient.email}</strong></p>
                            <p>Teléfono:  <strong>{selectedPatient.phone_number}</strong></p>
                            <p>Doctor: <strong>{selectedPatient.doctor}</strong></p>
                      </div>
                    )}
                </aside>
            </article>
            {patientList && (
                <article className="bg-white p-9 flex flex-col gap-11 w-full h-svh">
                    <h3 className="text-2xl font-bold">Lista de Pacientes</h3>
                    <ul className="flex gap-10 flex-wrap">
                        {allPatients.map((patient)=>(
                            <li key={patient.id} className="flex flex-col gap-5 border-2 p-5 rounded-3xl">
                                <img src={patient.thumbnail? patient.thumbnail: "/usuario.png"} alt="" className="w-40 h-40 rounded-full object-cover mt-6 "  />
                                <button onClick={()=>{handlePatientButton(patient), setPatientList(false), setPatientDeytails(true)}}  className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white rounded-2xl p-2 shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] hover:scale-105" >{patient.name} {patient.last_name}</button>
                            </li>
                        ))}
                        
                    </ul>
                    
                </article>
            )}
            {patientDetails && (
              <article className="bg-white p-9 flex flex-col gap-11 w-full h-svh">
                    <h3 className="text-2xl font-bold">Detalles del Paciente</h3>
                    <button className="w-24 rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-700 text-white shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] p-3" onClick={()=>{setPatientDeytails(false), setPatientList(true), setShowPatient(false)}}>Volver</button>
                    <DentalChart id={selectedPatient.id}/>
                </article>
            )}
            {newPatient && (
                <article className="fixed right-0 top-15 bg-gradient-to-r from-emerald-900 to-emerald-600 p-10 rounded-3xl">
                    <div className="flex justify-between">
                      <h3 className="text-white text-2xl font-bold mb-10">Nuevo Paciente</h3>
                      <button onClick={()=>{setNewPatient(!newPatient)}} className="bg-red-700 w-9 h-9 rounded-md text-white shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] hover:scale-105">X</button>
                    </div>
                    <form onSubmit={handleNewPatient} className="flex flex-col gap-4">
                      <input
                        name="name"
                        className="rounded-xl p-2"
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      <input
                        name="last_name"
                        className="rounded-xl p-2"
                        type="text"
                        placeholder="Apellido"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                      <input
                        name="address"
                        className="rounded-xl p-2"
                        type="text"
                        placeholder="Direccion"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                      <input
                        name="phone_number"
                        className="rounded-xl p-2"
                        type="number"
                        placeholder="Telefono"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                      />
                      <input
                        name="email"
                        className="rounded-xl p-2"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <input
                        name="doctor"
                        className="rounded-xl p-2"
                        type="text"
                        placeholder="Doctor que lo atiende"
                        value={formData.doctor}
                        onChange={handleInputChange}
                      />
                      <input
                        name="thumbnail"
                        className="rounded-xl p-2"
                        type="file"
                        onChange={handleInputChange} 
                      />
                      <button
                        type="submit"
                        className="rounded-xl mt-5 bg-gradient-to-r from-blue-900 to-blue-600 text-white shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] hover:scale-105 p-3"
                      >
                        Agregar Paciente
                      </button>
                    </form>
                </article>
            )}
            
            
        </section>
    )
}
export default Pacientes
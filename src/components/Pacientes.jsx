import { useEffect, useRef } from "react"
import { useState } from "react"


const Pacientes = () =>{
    const [patients, setPatients] = useState([])
    const [showPatient, setShowPatient]= useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientList, setPatientList] = useState(true)
    const [patientDetails, setPatientDeytails] = useState(false)

    const botonPaciente = useRef()
    
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
                        <input className="rounded-xl p-3 w-full " type="text" placeholder="Buscar..."/>
                        <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-700 text-white shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] hover:scale-105  p-3" >Buscar Paciente</button>
                    </form>
                </aside>
                <aside className="w-full h-full flex flex-col items-center justify-start pt-10 ">
                    {showPatient && ( 
                        <ul className="mt-9 flex flex-col gap-4 items-center text-white ">
                            <h3 className="text-3xl font-bold text-white">Perfil del Paciente</h3>
                            <img src={selectedPatient.thumbnail? selectedPatient.thumbnail : "/usuario.png"} alt=""  className="rounded-full w-40 h-40 object-cover "/>
                            <p>Nombre:  <strong>{selectedPatient.name}</strong></p>
                            <p>Apellido:  <strong>{selectedPatient.last_name}</strong></p>
                            <p>Email:  <strong>{selectedPatient.email}</strong></p>
                            <p>Teléfono:  <strong>{selectedPatient.phone_number}</strong></p>
                      </ul>
                    )}
                </aside>
            </article>
            {patientList && (
                <article className="bg-white p-9 flex flex-col gap-11 w-full h-svh">
                    <h3 className="text-2xl font-bold">Lista de Pacientes</h3>
                    <div className="flex gap-10 ">
                        {patients.map((patient)=>(
                            <ul key={patient.id} className="flex flex-col gap-5 border-2 p-5 rounded-3xl">
                                <img src={patient.thumbnail? patient.thumbnail: "/usuario.png"} alt="" className="w-40 h-40 rounded-full object-cover mt-6 "  />
                                <button onClick={()=>{handlePatientButton(patient), setPatientList(false), setPatientDeytails(true)}} ref={botonPaciente} data-id={`${patient.id}`} className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white rounded-2xl p-2 shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] hover:scale-105" >{patient.name} {patient.last_name}</button>
                            </ul>
                        ))}
                        
                    </div>
                </article>
            )}
            {patientDetails&& (
                <article className="bg-white p-9 flex flex-col gap-11 w-full h-svh">
                    <h3 className="text-2xl font-bold">Detalles del Paciente</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam architecto libero saepe, amet veritatis exercitationem deserunt nam quidem aliquam at alias eveniet dolor autem, vitae eius, tenetur corporis porro. Odio.</p>
                    <button className="w-24 rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-700 text-white shadow-[5px_5px_10px_5px_rgba(0,0,0,0.3)] p-3" onClick={()=>{setPatientDeytails(false), setPatientList(true), setShowPatient(false)}}>Volver</button>
                </article>
            )}
            
        </section>
    )
}
export default Pacientes
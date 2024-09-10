import { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import setData from "../utils/setData.js";

dayjs.locale("es");

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "" 
  });

  const localizer = dayjsLocalizer(dayjs);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) {
          throw new Error("Error al obtener los eventos: " + response.statusText);
        }
        const data = await response.json();
        
        const formattedEvents = data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        
        setEvents(formattedEvents);

      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    };
  
    fetchEvents();
  }, [events]);

  const handleDeleteEvent = async (id) =>{
    const response = await fetch(`http://localhost:8080/api/events/deleteEvent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.statusText);
    }
    setShowDelete(!showDelete)
    
  } 
  

  const handleNewEvent = () => {
    setForm(true);
    const backgroundBlur = document.querySelectorAll(".inactivo");
    backgroundBlur.forEach((e) => {
      e.style.opacity = "30%";
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEvent = async () => {

    try {
      
      const eventToAdd = {

        ...newEvent,
        start: dayjs(newEvent.start).toDate(),
        end: dayjs(newEvent.end).toDate(),
      };
      
      setData("http://localhost:8080/api/events/addEvent", eventToAdd)
      
      setEvents((prevEvents) => [...prevEvents, eventToAdd]);
      
      setForm(false);

      const backgroundBlur = document.querySelectorAll(".inactivo").forEach((e) => {
        e.style.opacity = "100%";
      });
      
    } catch (error) {
      console.error("Error al agregar el evento:", error);
    }
  };

  const closeForm = () => {
    setForm(false);
    const backgroundBlur = document.querySelectorAll(".inactivo");
    backgroundBlur.forEach((e) => {
      e.style.opacity = "100%";
    });
  };

  return (
    <section className="flex ">
      <aside className="flex flex-col gap-7 items-center p-2 w-80 inactivo agregarTurno">
        <h2 className="text-3xl text-gray-200 mt-8">Agregar Turnos</h2>
        <button className="bg-green-700 rounded-lg p-2 text-white w-36" onClick={handleNewEvent}>
          Nuevo Turno
        </button>
      </aside>
      {form && (
        <div className=" bg-gray-400 rounded-xl eventConteiner flex flex-col gap-4 ">
          <h3 className="text-xl mb-4">Nuevo Turno</h3>
          <input
            type="text"
            name="title"
            placeholder="Título"
            className="block w-full p-2 mb-2 border rounded "
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="start"
            placeholder="Inicio"
            className="block w-full p-2 mb-2 border rounded "
            value={newEvent.start}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="end"
            placeholder="Fin"
            className="block w-full p-2 mb-2 border rounded "
            value={newEvent.end}
            onChange={handleInputChange}
          />
          <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={handleAddEvent}>
            Agregar Evento
          </button>
          <button className="bg-red-600 p-2 text-white rounded mt-2" onClick={closeForm}>
            CERRAR
          </button>
        </div>
      )}
      {showDelete && (
        <article className="bg-gray-400 w-1/4 h-40 rounded-xl flex flex-col gap-4 items-center justify-center fixed left-1/2 top-1/2 z-10" >
          <h2>¿Desea eliminar el turno seleccionado?</h2>
          <button className="bg-red-800 p-1 text-white rounded mt-2" onClick={()=>{handleDeleteEvent(selectedEventId)}}>Eliminar</button>
          <button className="bg-gray-800 p-1 w-9 h-9 text-white rounded mt-2 absolute top-2 right-2 hover:scale-110" onClick={()=>{setShowDelete(!showDelete)}}>X</button>

        </article>
      )}
      <div className="inactivo calendario">
        <Calendar 
        localizer={localizer}
        events={events}
        selectable={true}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleNewEvent}
        onSelectEvent={(event)=>{setShowDelete(!showDelete);
        setSelectedEventId(event.id);}}
        />
      </div>
    </section>
  );
};

export default Agenda;

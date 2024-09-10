import fs from "fs";


export default class EventController {
    constructor(events = []){
        this.PATH = "./src/events/events.json" 
        this.events = events
    }



getAll = async () =>{
    try {
        const allEvents = await fs.promises.readFile(this.PATH, "utf-8")
        const result = JSON.parse(allEvents)
        return result
    } catch (error) {
        console.log("error al obtener los eventos");
        
    }
}

addEvent = async (newEvent) =>{
    try {
        const {start, end, title} = newEvent
        const data = await fs.promises.readFile(this.PATH, "utf-8")
        this.events = data ? JSON.parse(data) : [];
        const maxId = this.events.length > 0 ? Math.max(...this.events.map(event => event.id)) : 0
        const newId = maxId + 1
    
        const event = {
            id: newId,
            title: title,
            start: start,
            end: end
        }

        this.events.push(event) 

        await fs.promises.writeFile(this.PATH, JSON.stringify(this.events, null, 2), 'utf8');

    } catch (error) {
        console.log("Error al agregar evento");
        
    }
}
deleteEvent = async (id) =>{
    try {
        const data = await fs.promises.readFile(this.PATH, "utf-8")
        this.events = data ? JSON.parse(data) : [];

        const updatedEvents = this.events.filter(e => e.id != id)
        console.log(updatedEvents)
        

        await fs.promises.writeFile(this.PATH, JSON.stringify(updatedEvents, null, 2), "utf-8");

        console.log(`Evento con ID ${id} eliminado con éxito.`);


    } catch (error) {
        console.log("Error al eliminar el evento");
    }
}
}
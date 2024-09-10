import { Router } from "express";
import EventController from "../controllers/event.controller.js";


const eventRouter = Router()
export default eventRouter

const eventController = new EventController()

eventRouter.get("/", async (req, res) => {
    try {
        const allEvents = await eventController.getAll()
        res.status(200).json(allEvents)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los eventos", error: error.message });
    }
});


eventRouter.post("/addEvent", async (req,res)=>{
    const newEvent = req.body
    
    const eventAdded = await eventController.addEvent(newEvent)

    res.status(200).json({ message: "Evento agregado exitosamente", event: newEvent });
})

eventRouter.delete("/deleteEvent/:eid", async (req, res)=>{

    try {
        const eventId = req.params.eid
        
        const eventToDelete = await eventController.deleteEvent(eventId)

        res.status(200).json({ message: "Evento eliminado exitosamente", eventId: eventId });

    } catch (error) {
        console.log("Error al intentar elminar el evento");
        
    }
    
})
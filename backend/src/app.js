import express from "express";
import bodyParser from "body-parser";
import eventRouter from "./router/EventRouter.js";
import cors from "cors";
import patientRouter from "./router/PatientRouter.js"

const app = express()

const port = 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use("/api/events", eventRouter)
app.use("/api/patients", patientRouter) 


  
app.listen(port, () => {
    console.log(`SERVIDOR CONECTADO`);
})



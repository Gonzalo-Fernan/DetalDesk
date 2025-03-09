import express from "express";
import cors from "cors";
import eventRouter from "./router/EventRouter.js";
import patientRouter from "./router/PatientRouter.js";
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

// Middlewares
app.use(express.json()); // Reemplaza bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Reemplaza bodyParser.urlencoded()
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
// Rutas
app.use("/api/events", eventRouter);
app.use("/api/patients", patientRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`SERVIDOR CONECTADO en el puerto ${port}`);
});

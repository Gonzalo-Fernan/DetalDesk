import { useState } from "react";

const DentalChart = ({ id }) => {
    const [selector, setSelector] = useState(null);
    const [teeth, setTeeth] = useState([
        {
            id:1,
            nombre: "incisivo11",
            natural: "/CaninoPrueba.png",
            implant: "/ImplanteCaninoPrueba.png",
            show: "/CaninoPrueba.png"
        },
        {
            id:2,
            nombre: "lateral12",
            natural: "/IncisivoLateralPrueba.png",
            implant: "/ImplanteLateralPrueba.png",
            show: "/IncisivoLateralPrueba.png"
        },
        {
            id:3,
            nombre: "incisivo11",
            natural: "/IncisivoCentraPrueba.png",
            implant: "/ImplanteCentraPrueba.png",
            show: "/IncisivoCentraPrueba.png"
        }
        
    ]);

    const handleSelectChange = (event, toothId) => {
        const value = event.target.value;
        let updatedIcon = teeth.find(tooth => tooth.id === toothId).icon;
        let selectedTooth = teeth.find(tooth => tooth.id === toothId)
        console.log(selectedTooth);
        

        if (value === "implante") {
            updatedIcon = selectedTooth.implant;
        } else if (value === "natural") {
            updatedIcon = selectedTooth.natural;
        }

         setTeeth((prevTeeth) =>
            prevTeeth.map((tooth) =>
                tooth.id === toothId ? { ...tooth, show: updatedIcon } : tooth
            )
        ); 
        setSelector(null);
    };

    return (
        <section className="bg-slate-300">
            <h2>Gráfico Dental</h2>
            <article className="flex ">
                {teeth.map((tooth) => (
                    <div key={tooth.id} className="relative h-36 flex bg-green-900 items-center justify-end gap-4 p-3">
                        <img
                            onClick={() => setSelector(tooth.id)}
                            className="object-contain hover:scale-105"
                            src={tooth.show}
                            alt="Dental icon"
                        />
                        {selector === tooth.id && (
                            <select
                                className="absolute right-1 top-1"
                                onChange={(event) => handleSelectChange(event, tooth.id)}
                            >
                                <option value="">Seleccionar</option>
                                <option value="implante">Implante</option>
                                <option value="natural">Natural</option>
                            </select>
                        )}
                    </div>
                ))}
            </article>
        </section>
    );
};

export default DentalChart;

const apiUrl = "http://localhost:8080/api/events";

export const fetchEvents = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error al obtener los eventos: " + response.statusText);
    }
    const data = await response.json();

    // Formatear los eventos antes de devolverlos
    return data.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  } catch (error) {
    console.error("Error al cargar los eventos:", error);
    throw error;
  }
};

export const addEvent = async (newEvent) => {
  try {
    const response = await fetch(`${apiUrl}/addEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });

    if (!response.ok) {
      throw new Error("Error al agregar el evento: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al agregar el evento:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/deleteEvent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el evento: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el evento:", error);
    throw error;
  }
};

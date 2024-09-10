


  const setData = async (url, dataToAdd) =>{
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToAdd),
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
      
      const result = await response.json()

  }
  export default setData
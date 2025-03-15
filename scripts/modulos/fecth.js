export async function obtenerJson(item) {
    try {
        const respuesta = await fetch(item)
        const datos = await respuesta.json()
        return datos
    } catch (error) {
        console.log("Error al obtener los datos desde: " + item)
        console.log(error)
        return error
    }
}

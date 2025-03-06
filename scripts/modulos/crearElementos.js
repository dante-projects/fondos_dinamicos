export function crearElemento(contenedor, elemento, clases = null, id = null) {
    if (!contenedor) {console.log("Falta CONTENEDOR en funcion crearElemento")}
    if (!elemento) {console.log("Falta ELEMENTO en funcion crearElemento")}

    const nuevoElemento = document.createElement(elemento)
    contenedor.appendChild(nuevoElemento)
    
    if (clases) { nuevoElemento.className = clases }
    if (id) { nuevoElemento.id = id }
    return nuevoElemento
}
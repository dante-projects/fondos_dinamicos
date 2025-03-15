import { enviarEvento } from "./modulos/eventosPesonalizados.js"

const secciones = Array.from(document.querySelectorAll("#marcoEstatico .seccion"))
const seccionRangos = secciones[0]
const componenteRangos = Array.from(seccionRangos.querySelectorAll("input-rango"))
const seccionTexto = secciones[1]
const componenteTexto = seccionTexto.querySelector("campo-texto")

const leerRangos = () => {
    let valoresRangos = []
    componenteRangos.forEach((item, num)=> {
        valoresRangos[num] = item.shadowRoot.querySelector("#rango").value
        item.addEventListener("input", () => {
            valoresRangos[num] = item.shadowRoot.querySelector("#rango").value
            enviarEvento("valoresRangos", valoresRangos)
        })
    })
}

const leerTextos = () => {
    let camposTexto = Array.from(componenteTexto.shadowRoot.querySelectorAll(".campo"))
    let valoresCamposTexto = []
    camposTexto.forEach((item, num) => {
        valoresCamposTexto[num] = item.innerText

        item.addEventListener("input", () => {
            valoresCamposTexto[num] = item.innerText
            enviarEvento("valoresCamposTexto", valoresCamposTexto)
        })
    })
}

const main = () => {
        leerRangos()
        leerTextos()
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})

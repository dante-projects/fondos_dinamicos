import { enviarEvento } from "./modulos/eventosPesonalizados.js"

const seccionRangos = Array.from(document.querySelectorAll("#marcoEstatico .seccion"))[0]
const rangos = Array.from(seccionRangos.querySelectorAll("input-rango"))

let valores = []
const leerRangos = () => {
    rangos.forEach((rango, num)=> {
        valores[num] = rango.shadowRoot.querySelector("#cajaValor").innerText
    })
}

const main = () => {
        leerRangos()
        rangos.forEach((item) => {
            item.shadowRoot.querySelector("input").addEventListener("input", () => {
                leerRangos()
                enviarEvento("valoresRangos", valores)
            })
        })
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})

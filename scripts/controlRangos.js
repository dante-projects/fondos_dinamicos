const seccionRangos = Array.from(document.querySelectorAll("#marcoEstatico .seccion"))[0]
const rangos = Array.from(seccionRangos.querySelectorAll("input-rango"))

let valores = []
const leerRangos = () => {
    rangos.forEach((rango, num)=> {
        valores[num] = rango.shadowRoot.querySelector("#cajaValor").innerText
    })
}

const main = () => {
    addEventListener("DOMContentLoaded", () => {
        leerRangos()
        rangos.forEach((item) => {
            item.shadowRoot.querySelector("input").addEventListener("input", () => {
                leerRangos()
                console.log(valores)
            })
        })
    })
}

main()

import { obtenerJson } from "../scripts/modulos/fecth.js"
import { enviarEvento, recibirEvento } from "../scripts/modulos/eventosPesonalizados.js"
const urlVersiones = "https://dante-projects.github.io/recursos/controlVersiones.json"
const urlFuentes = "https://dante-projects.github.io/recursos/fuentesGoogle.json"

// evento a la escucha del componente

let fuentesGoogle = false
recibirEvento("selectorFuentes", () => {
    fuentesGoogle = true
    console.log("RECURSOS: selectorFuentes listo")
})

function respuesta(item) {
    enviarEvento(item, true)
}

async function fetchJson(url) {
    const datos = await obtenerJson(url) 
    return datos
}

async function comprobarVersiones(jsonVersiones, jsonServidor, recurso) {
    const seccion = jsonVersiones[recurso][0]
    const versionServidor = Object.entries(seccion)[0][1]

    if (!localStorage.getItem(recurso)) {
        const json = await fetchJson(jsonServidor)
        localStorage.setItem(recurso, JSON.stringify(json))
    } else {
        const versionLocal = JSON.parse(localStorage.getItem(recurso)).version
        if ( versionLocal !== versionServidor) {
            localStorage.removeItem(recurso)
            localStorage.setItem(recurso, JSON.stringify(jsonServidor))
        }
    }
    return true
}

async function main() {
        const controlVersiones = await fetchJson(urlVersiones)

        if (await comprobarVersiones(controlVersiones, urlFuentes, "fuentesGoogle")) {
            const intervalo = setInterval(() => {
                if (!fuentesGoogle) {
                    console.log("RECURSOS: selectorFuentes esperando")
                } else {
                    respuesta("fuentesGoogle")
                    console.log("RECURSOS: selectorFuentes datos disponibles y avisado")
                    clearInterval(intervalo)
                }
            }, 500)
        }
}

// main()
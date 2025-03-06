import { recibirEvento } from "./modulos/eventosPesonalizados.js"

const valoresXconsola = (datos) => {
    console.log(datos)
}

recibirEvento("valoresRangos", valoresXconsola)
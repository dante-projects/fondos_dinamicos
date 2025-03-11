import { recibirEvento } from "./modulos/eventosPesonalizados.js"

const valoresComponentesRangos = (datos) => {
    console.log("componentes Rangos:", datos)
}

const valoresComponenteCamposTexto = (datos) => {
    console.log("componente campos:", datos)
}

recibirEvento("valoresRangos", valoresComponentesRangos)
recibirEvento("valoresCamposTexto", valoresComponenteCamposTexto)

export const enviarEvento = (nombreEvento, datosPublicos) => {
    const evento = new CustomEvent(nombreEvento, {
        detail: datosPublicos
    })
    document.dispatchEvent(evento)
}

export const recibirEvento = (nombreEvento, callback) => {
    document.addEventListener(nombreEvento, (e) => {
        callback(e.detail)
    })
}
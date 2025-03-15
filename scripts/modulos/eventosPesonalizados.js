export const enviarEvento = (nombreEvento, datosPublicos) => {
    const evento = new CustomEvent(nombreEvento, {
        detail: datosPublicos
    })
    window.dispatchEvent(evento)
}

export const recibirEvento = (nombreEvento, callback) => {
    window.addEventListener(nombreEvento, (e) => {
        callback(e.detail)
    })
}
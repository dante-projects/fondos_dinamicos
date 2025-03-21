export const publicarEvento = (nombreEvento, datos, burbujeo = false) => {
    const evento = new CustomEvent(nombreEvento, {
        detail: datos,
        bubbles: burbujeo
    })
    window.dispatchEvent(evento)
}

export const capturarEvento = (nombreEvento, callback) => {
    window.addEventListener(nombreEvento, (e) => {
        callback(e.detail)
    })
}
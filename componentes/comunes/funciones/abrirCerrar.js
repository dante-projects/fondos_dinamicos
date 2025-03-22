export const abrirCerrar = (item, valor) => {
    item.style.height = `${item.scrollHeight}px`
    if (valor) {
        if (item.scrollHeight  > 260) {
            item.style.height = "260px"
            item.style.overflowY = "auto"
            item.style.transition = ".5s ease-in-out"
        } else {
        }
    } else {
        item.style.height = "0"
    }
}

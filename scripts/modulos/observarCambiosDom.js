export const obserbar = (item, funcion) => {
    const vigia = new MutationObserver(() => {
        funcion()
    }) 
    vigia.observe(item, {childList: true})   
}

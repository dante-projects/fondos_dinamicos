export const obserbar = (item, funcion) => {
    console.log(item)
    const vigia = new MutationObserver(() => {
        funcion()
    }) 
    vigia.observe(item, {childList: true})   
}

class campoTexto extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        this.shadowRoot.appendChild(link)

        this.shadowRoot.innerHTML += `
            <form id="contenedorCampos" class="contenedorCampos">
                <div class="barraTitulo">
                    Texto en animación
                    <span id="eliminar" class="icono material-symbols-outlined">delete</span>
                    <span id="nuevo" class="icono material-symbols-outlined">add_notes</span>
                </div>
            </form>
        `

        const estilo = document.createElement("style")
        estilo.innerText = `
            * {
                box-sizing: border-box;
            }

            :host {
                --margenCampo: 10px;
                --alturaCaja: 110px;
                --transicion: .3s ease-in-out;
            }

            .contenedorCampos {
                width: 100%;
                height: auto;
                margin-bottom: 10px;
                transition: var(--transicion);
                border: 1px solid transparent;

                .barraTitulo {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 32px;
                    text-indent: 10px;
                    color: grey;
                    border: 1px solid grey;
                    border-radius: 4px;
                    margin-bottom: 20px;

                    .icono {
                        position: absolute;
                        cursor: pointer;

                        &:first-of-type {
                            right: 50px;
                        }

                        &:last-of-type {
                            right: 10px;
                        }

                        &:hover {
                            color: rgb(28, 28, 28);
                        }
                    }
                }

                .caja {
                    width: 100%;
                    height: 0;
                    overflow: hidden;
                    margin-bottom: 0;
                    transition: var(--transicion);

                    .campo {
                        width: 100%;
                        height: 100%;
                        border: 1px solid grey;
                        border-radius: 4px;
                        outline: none;
                        overflow-y: auto;
                        word-wrap: break-word;
                        cursor: pointer;
                        font-size: 14px;
                        color: grey;
                        padding: 8px;
                        box-shadow: inset 1px 1px 4px transparent;
                    }
                }

                .abierta {
                    width: 100%;
                    height: var(--alturaCaja);
                    transition: var(--transicion);

                    .campo {
                        width: 100%;
                        height: calc(var(--alturaCaja) - var(--margenCampo));
                        border: 1px solid grey;
                    }

                    .seleccionado {
                        box-shadow: inset 1px 1px 4px rgb(28, 28, 28);
                        color: grey;
                        transition: var(--transicion);
                    }
                }
            }

        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {
        const maxCampos = this.getAttribute("max")
        const contenedorCampos = this.shadowRoot.querySelector("#contenedorCampos")
        const cerrar = this.shadowRoot.querySelector("#eliminar")
        const abrir = this.shadowRoot.querySelector("#nuevo")
        let cajasAbiertas = []
        let campoSeleccionado 

        let contadorCajas = 0
        function crearCajas() {
            const nuevaCaja = document.createElement("div")
            nuevaCaja.classList.add("caja")
            nuevaCaja.id = "caja_" + contadorCajas
            const contenedor = campoSeleccionado 
                ? campoSeleccionado.parentElement.insertAdjacentElement("afterend", nuevaCaja) 
                : contenedorCampos.appendChild(nuevaCaja)

            const nuevoCampo = document.createElement("div")
            nuevoCampo.classList.add("campo")
            nuevoCampo.id = "campo_" + contadorCajas
            nuevoCampo.setAttribute("contentEditable", true)
            nuevoCampo.setAttribute("spellCheck", false)
            nuevoCampo.innerText = contadorCajas
            nuevaCaja.appendChild(nuevoCampo)
            contadorCajas += 1
            return nuevoCampo
        }

        function abrirCaja(item) {
            item.parentElement.classList.add("abierta")
            cajasAbiertas = Array.from(contenedorCampos.querySelectorAll(".abierta"))
        }

        function seleccionarCampo(item) {
            cajasAbiertas = Array.from(contenedorCampos.querySelectorAll(".abierta"))
            cajasAbiertas.forEach((caja) => {
                caja.querySelector(".campo").classList.remove("seleccionado")
            })
            item.classList.add("seleccionado")
            campoSeleccionado = item
            return item
        }

        function aplicarReactividad(item) {
            item.addEventListener("click", () => {
                seleccionarCampo(item)
            })
        }

        function recargaDOM(item) {
            item.offsetHeight // puto dom - forzar la recarga. para las transiciones
        }

        const primerCampo = crearCajas()
        recargaDOM(primerCampo)
        seleccionarCampo(primerCampo)
        aplicarReactividad(primerCampo)
        abrirCaja(primerCampo)

        let estadoAbrir = "listo"
        abrir.addEventListener("click", () => {
            iconos()
            if (estadoAbrir === "listo") {
                estadoAbrir = "ocupado"
                if (cajasAbiertas.length < maxCampos) {
                    const nuevoCampo = crearCajas()
                    recargaDOM(nuevoCampo) 
                    seleccionarCampo(nuevoCampo)
                    aplicarReactividad(nuevoCampo)
                    abrirCaja(nuevoCampo)
                    cajasAbiertas = Array.from(contenedorCampos.querySelectorAll(".abierta"))
                    iconos()   
                    estadoAbrir = "listo"              
                }      
            }
        })

        let estadoCerrar = 0
        cerrar.addEventListener("click", async () => {
            iconos()
            if (estadoCerrar === 0)  {
                estadoCerrar = 1
                if (cajasAbiertas.length > 1) {

                    const indexSeleccionado = cajasAbiertas.findIndex(item => item.querySelector(".campo") === campoSeleccionado)                    
                    if (indexSeleccionado === 0) {
                        seleccionarCampo(cajasAbiertas[1].querySelector(".campo"))
                    } else if (indexSeleccionado === 1) {
                        seleccionarCampo(cajasAbiertas[0].querySelector(".campo"))
                    } else {
                        seleccionarCampo(cajasAbiertas[indexSeleccionado - 1].querySelector(".campo"))
                    }

                    cajasAbiertas[indexSeleccionado].classList.remove("abierta")
                    const tiempoAnimacion = parseFloat(getComputedStyle(this).getPropertyValue("--transicion")) * 1000
                    setTimeout(() => {
                            cajasAbiertas[indexSeleccionado].remove()
                            cajasAbiertas = Array.from(contenedorCampos.querySelectorAll(".abierta"))
                            iconos()        
                            estadoCerrar = 0 
                    }, tiempoAnimacion)
                }
            }
        })

        function iconos() {
            if (cajasAbiertas.length < maxCampos) {
                abrir.style.color = "rgb(100, 100, 100)"
                abrir.style.cursor = "pointer"
                abrir.style.pointerEvents = "auto"
            } else {
                abrir.style.color = "red"
                abrir.style.cursor = "auto"
                abrir.style.pointerEvents = "none"
            }
            if (cajasAbiertas.length > 1) {
                cerrar.style.color = "rgb(100, 100, 100)"
                cerrar.style.cursor = "pointer"
                cerrar.style.pointerEvents = "auto"
            } else {
                cerrar.style.color = "red"
                cerrar.style.cursor = "auto"
                cerrar.style.pointerEvents = "none"
            }    
        }

        iconos()
    }
}
customElements.define("campo-texto", campoTexto)
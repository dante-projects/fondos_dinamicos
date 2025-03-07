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
                    <span id="eliminar" class="icono material-symbols-outlined">cancel_presentation</span>
                    <span id="nuevo" class="icono material-symbols-outlined">add_notes</span>
                </div>
            </form>
        `

        const estilo = document.createElement("style")
        estilo.innerText = `
            * {
                box-sizing: border-box;
            }

            .contenedorCampos {
                width: 100%;
                height: auto;

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
                    margin-bottom: 16px;

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

                .cajaCampo {
                    position: relative;
                    width: 100%;
                    height: 0;
                    transition: .3s ease-in-out;

                    &:has(.inputOculto:checked) .campoTexto {
                        border: 1px solid red;
                        transition: .3s ease-in-out;
                    }

                    .inputOculto {
                        appearance: none;
                        position: absolute;
                    }

                    .campoTexto {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        border: 1px solid transparent;
                        border-radius: 4px;
                        outline: none;
                        overflow-y: auto;
                        word-wrap: break-word;
                        cursor: pointer;
                        font-size: 14px;
                        color: grey;
                        padding: 4px;
                        transition: .3s ease-in-out;
                    }
                }

                .abierta {
                    width: 100%;
                    height: 124px;
                    transition: .3s ease-in-out;

                    & .campoTexto {
                        height: 110px;
                        border-color: grey;
                        transition: .3s ease-in-out;
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
        let cajas = []
        let cajasAbiertas = []
        let campoSeleccionado 

        function crearElemento(contenedor, elemento, clase) {
            const nuevoElemento = document.createElement(elemento)
            nuevoElemento.classList.add(clase)
            contenedor.appendChild(nuevoElemento)
            return nuevoElemento
        }

        function crearCaja(referencia = null) {
            const nuevaCaja = crearElemento(contenedorCampos, "div", "cajaCampo")
            referencia?.after(nuevaCaja) // para cambiar el contenedor si le paso la referencia
 
            const input = crearElemento(nuevaCaja, "input", "inputOculto")
            input.setAttribute("type", "radio")
            input.setAttribute("name", "campo")
            input.checked = true

            const nuevoCampo = crearElemento(nuevaCaja, "div", "campoTexto")
            nuevoCampo.innerText = "Texto de ejemplo"
            nuevoCampo.setAttribute("contentEditable", true)
            nuevoCampo.setAttribute("spellCheck", false)
            cajas.push(nuevoCampo)
            return nuevoCampo
        }

        function abrirCaja(item) {
            item.parentElement.classList.add("abierta")
            cajasAbiertas.push(item)
        }

        function seleccionarCampo(item) {
            campoSeleccionado = item
            item.previousSibling.checked = true
            return cajasAbiertas.findIndex(item => item === campoSeleccionado)
        }

        function aplicarEventos(item) {
            item.addEventListener("click", () => {
                seleccionarCampo(item)
            })
        }

        const primerCampo = crearCaja()
        abrirCaja(primerCampo)
        aplicarEventos(primerCampo)
        seleccionarCampo(primerCampo)

        let contadorCampos = 1
        abrir.addEventListener("click", () => {
            if (cajasAbiertas.length < maxCampos) {
                const nuevoCampo = crearCaja(campoSeleccionado.parentElement)
                nuevoCampo.offsetHeight // forzar la recarga de la propiedad en el DOM para la animacion
                abrirCaja(nuevoCampo)
                aplicarEventos(nuevoCampo)
                seleccionarCampo(nuevoCampo)
                contadorCampos =+ 1
            }
        })

        cerrar.addEventListener("click", () => {
            if (cajasAbiertas.length > 1) {
                campoSeleccionado.parentElement.classList.remove("abierta")
                const indiceSeleccionado = cajasAbiertas.findIndex(item => item === campoSeleccionado)
                const nuevoIndice = indiceSeleccionado - 1 < 0 ? 0 : indiceSeleccionado - 1
                cajasAbiertas.splice(indiceSeleccionado, 1)
                seleccionarCampo(cajasAbiertas[nuevoIndice])
            }
        })
    }
}
customElements.define("campo-texto", campoTexto)
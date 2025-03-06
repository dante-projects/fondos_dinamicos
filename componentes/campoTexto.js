class campoTexto extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        this.shadowRoot.appendChild(link)

        this.shadowRoot.innerHTML += `
            <div id="contenedorCampos" class="contenedorCampos">
                <div class="barraTitulo">
                    Texto en animación
                    <span id="eliminar" class="icono material-symbols-outlined">cancel_presentation</span>
                    <span id="nuevo" class="icono material-symbols-outlined">add_notes</span>
                </div>
            </div>
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

                .campoTexto {
                    width: 100%;
                    height: 100px;
                    border: 1px solid grey;
                    border-radius: 4px;
                    outline: none;
                    overflow-y: auto;
                    word-wrap: break-word;
                    cursor: pointer;
                    padding: 6px;
                    font-size: 14px;
                    color: grey;
                    margin-bottom: 16px;
                }

                .seleccionado {
                    border-color: red;
                }
            }

        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {
        const maxCampos = Number(this.getAttribute("max")) - 1
        const contenedorCampos = this.shadowRoot.querySelector("#contenedorCampos")
        const eliminar = this.shadowRoot.querySelector("#eliminar")
        const nuevo = this.shadowRoot.querySelector("#nuevo")
        let campoSeleccionado 

        const crear = () => {
                const nuevoCampo = document.createElement("div")
                nuevoCampo.classList.add("campoTexto")
                nuevoCampo.setAttribute("contentEditable", true)
                nuevoCampo.setAttribute("spellCheck", false)
                contenedorCampos.appendChild(nuevoCampo)
                campoSeleccionado = nuevoCampo
                darEventos(nuevoCampo)
                return nuevoCampo
        }

        const darEventos = (item) => {
            item.addEventListener("click", () => seleccionar(item))
        }

        const seleccionar = (item) => {
            const campos = Array.from(this.shadowRoot.querySelectorAll(".campoTexto"))
            campos.forEach((campo) => {
                campo.classList.remove("seleccionado")
            })
            item.classList.add("seleccionado")
            item.focus()
            campoSeleccionado = item
        }

        const primerCampo = crear()
        seleccionar(primerCampo)

        nuevo.addEventListener("click", () => {
            const campos = Array.from(this.shadowRoot.querySelectorAll(".campoTexto"))

            if (campos.length <= maxCampos) {
                const campo = crear()
                seleccionar(campo)
                darEventos(campo)
            }
        })

        eliminar.addEventListener("click", () => {
            let campos = Array.from(this.shadowRoot.querySelectorAll(".campoTexto"))

            if (campos.length > 1) {
                campoSeleccionado.remove()
                const indice = campos.indexOf(campoSeleccionado)
                campos.splice(indice, 1)
                const indiceCorregido = (indice - 1) < 0 ? 0 : indice -1
                seleccionar(campos[indiceCorregido])
            }
        })
    }
}
customElements.define("campo-texto", campoTexto)
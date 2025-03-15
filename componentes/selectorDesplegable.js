class selectorDesplegable extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        this.shadowRoot.appendChild(link)

        this.shadowRoot.innerHTML += `
            <div class="contenedor borderRadiusGrey">
                <div class="titulo">Seleccionar fuente
                    <span id="icono" class="icono material-symbols-outlined centrado">arrow_drop_down</span>
                </div>
                <form id="listaFuentes" class="listaFuentes"></form>
            </div>
        `

        const estilo = document.createElement("style")
        estilo.textContent = `
            * {
                box-sizing: border-box;
                color: grey;
            }

            .borderRadiusGrey {
                border: 1px solid grey;
                border-radius: 4px;
            }

            .centrado {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .contenedor {
                width: 100%;
                height: auto;

                .titulo {
                    position: relative;
                    display: flex;
                    align-items: center;
                    flex: 1;
                    height: 32px;
                    color: grey;
                    text-indent: 10px;

                    .icono {
                        position: absolute;
                        right: 0;
                        height: 32px;
                        aspect-ratio: 1/1;
                        font-size: 30px;

                        &:hover {
                            color: red;
                            cursor: pointer;
                        }
                    }
                }

                .listaFuentes {
                    width: 100%;
                    height: 0;
                    transition: .5s ease-in-out;
                    overflow-Y: auto;

                    .fuente {
                        position: relative;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 32px;
                        text-indent: 10px;

                        &:has(input:checked) {
                            background-color: grey;
                            color: white;
                        }

                        input {
                            appearance: none;
                            position: absolute;
                            left: -5px;
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                        }
                    }
                }
            }
        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {
        const icono = this.shadowRoot.querySelector("#icono")
        const contenedorFuentes = this.shadowRoot.querySelector(".listaFuentes")

        function abrirCerrar() {
            let estado = 0
            icono.classList.toggle("abierto")
            if (icono.classList.contains("abierto")) {
                estado = 1
                contenedorFuentes.style.height = "200px"
            } else {
                estado = 0
                contenedorFuentes.style.height = "0"
            }
            return estado
        }

        icono.addEventListener("click", () => {
            abrirCerrar()
        })

        // eventos personalizado despues de la carga completa

        window.addEventListener("DOMContentLoaded", () => {
            window.dispatchEvent(new CustomEvent("selectorFuentes"))
            window.addEventListener("fuentesGoogle", () => {
                console.log("COPMONENTE: respuesta recibida")
            })
        })

    }
}
customElements.define("selector-desplegable", selectorDesplegable)
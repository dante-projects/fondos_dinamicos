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
                <div id="titulo" class="titulo">Seleccionar fuente
                    <span class="icono material-symbols-outlined centrado">arrow_drop_down</span>
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
                    cursor: pointer;
                    transition: .5s .5s;

                    &:hover .icono {
                        color: red;
                    }

                    .icono {
                        position: absolute;
                        right: 0;
                        height: 32px;
                        aspect-ratio: 1/1;
                        font-size: 30px;

                    }
                }

                .abierto {
                    transition: .2s;

                    & .icono {
                        color: red;
                    }

                    & + .listaFuentes {
                        height: 200px;
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
                            background-color: rgb(51, 99, 95);
                            color: white;
                            transition: .5s;
                        }

                        &:has(input:not(:checked):hover) {
                            background-color: rgb(122, 158, 155);
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
        const titulo = this.shadowRoot.querySelector("#titulo")
        const contenedorFuentes = this.shadowRoot.querySelector(".listaFuentes")

        function abrirCerrar() {
            titulo.classList.toggle("abierto")
            const estado = titulo.classList.contains("abierto") ? 1 : 0
            return estado
        }

        titulo.addEventListener("click", () => {
            abrirCerrar()
        })

        function obtenerFuentes(item) {
            const fuentesJson = JSON.parse(localStorage.getItem(item))
            const fuentes = fuentesJson.fuentes
            return fuentes
        }

        function crearOpcion(array) {
            array.forEach((item, num) => {
                const nuevaOpcion = document.createElement("span")
                nuevaOpcion.innerText = item.split("=")[1].replace("+", " ")
                nuevaOpcion.classList.add("fuente")
    
                const input = document.createElement("input")
                input.setAttribute("type", "radio")
                input.setAttribute("name", "fuente")
                input.checked = num === 0 ? true : null

                nuevaOpcion.appendChild(input)
                contenedorFuentes.appendChild(nuevaOpcion)
            })
        }

        // eventos personalizado despues de la carga completa
        window.addEventListener("DOMContentLoaded", () => {

            window.dispatchEvent(new CustomEvent("selectorFuentes"))

            window.addEventListener("fuentesGoogle", () => {
                console.log("COMPONENTE: respuesta recibida")
                crearOpcion(obtenerFuentes("fuentesGoogle"))            
            })
        })

    }
}
customElements.define("selector-desplegable", selectorDesplegable)
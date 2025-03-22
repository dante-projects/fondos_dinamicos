import "./comunes/funciones/eventosPesonalizados.js"
import "./comunes/subComponentes/titulo.js"
import { capturarEvento } from "./comunes/funciones/eventosPesonalizados.js"
import { abrirCerrar } from "./comunes/funciones/abrirCerrar.js"

class selectorDesplegable extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        capturarEvento("textoFuentes", (e) => {
            abrirCerrar(this.shadowRoot.querySelector("#contenedorDesplegable"), e.detail)
        })

        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        this.shadowRoot.appendChild(link)

        this.shadowRoot.innerHTML += `
            <div class="contenedor borderRadiusGrey">
                <titulo-desplegable id="textoFuentes">Seleccionar fuente</titulo-desplegable>
                <form id="contenedorDesplegable" class="contenedorDesplegable"></form>
            </div>
        `

        const estilo = document.createElement("style")
        estilo.textContent = `
            * {
                box-sizing: border-box;
                color: grey;
            }

            .test {
                width: 100%;
                height: 30px;
                border: 1px solid red;
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
                margin-bottom: 14px;

                .contenedorDesplegable {
                    width: 100%;
                    height: 0;
                    overflow: hidden;
                    transition: .5s ease-in-out;

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

        function obtenerFuentes(item) {
            const fuentesJson = JSON.parse(localStorage.getItem(item))
            const fuentes = fuentesJson.fuentes
            return fuentes
        }

        const contenedorFuentes = this.shadowRoot.querySelector("#contenedorDesplegable")
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
        crearOpcion(obtenerFuentes("fuentesGoogle"))

        // eventos personalizado despues de la carga completa
        window.addEventListener("DOMContentLoaded", () => {

            window.dispatchEvent(new CustomEvent("selectorFuentes"))

            window.addEventListener("fuentesGoogle", () => {
                console.log("selectorFuentes: datos recibidos")
                crearOpcion(obtenerFuentes("fuentesGoogle"))            
            })
        })

    }
}
customElements.define("selector-desplegable", selectorDesplegable)
import { publicarEvento } from "../funciones/eventosPesonalizados.js"

class inputRango extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.estado = false

        this.shadowRoot.innerHTML = `
            <form class="contenedor">
                <input id="rango" type="range">
            </form>
        `
        
        const estilo = document.createElement("style")
        estilo.textContent = `
            * {
                box-sizing: border-box;
            }
            
            :host {
                --colorBackgroundThumb: grey;
                --colorBackgroundThumbHover: white;
                --colorBackgroundTrack: transparent;
                --colorBorderThumb: white;
                --colorBorderThumbHover: grey;
                --colorBorderTrack: grey;
                --thumbWidth: 18px;
                --thumbHeight: 8px;
            }

            .contenedor {
                position: relative;
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 44px;

                input[type="range"] {
                    width: 100%;
                    height: 50%;
                    background: transparent;
                    cursor: pointer;

                    &:active::-moz-range-thumb {
                        border-color: var(--colorBorderThumbHover);
                        background-color: var(--colorBackgroundThumbHover);
                        transition: .2s;
                    }

                    &::-moz-range-track {
                        height: 4px;
                        border: 1px solid var(--colorBorderTrack);
                        border-radius: 4px;
                        background-color: transparent;
                        background-image: var(--colorBackgroundTrack);
                    }

                    &::-moz-range-thumb {
                        width: var(--thumbWidth);
                        height: var(--thumbHeight);
                        border: 2px solid var(--colorBorderThumb);
                        border-radius: 4px;
                        background-color: var(--colorBackgroundThumb);
                        transition: .6s;
                    }
                }

                &:has(input:active) + .cajaDer {
                    background-color: rgb(28, 28, 28);
                    border-color: rgb(28, 28, 28)
                    transition: .2s;

                    & .cajaValor {
                        color: white;
                        transform: scale(130%);
                        transition: .2s;
                    }
                }
            }
        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {
        const id = this.id
        const min = this.getAttribute("min")
        const max = this.getAttribute("max")
        const value = this.getAttribute("value")
        this.rango = this.shadowRoot.querySelector("#rango")
        this.rango.setAttribute("min", min)
        this.rango.setAttribute("max", max)
        this.rango.setAttribute("value", value)

        this.rango.addEventListener("input", () => {
            publicarEvento(id, {detail: parseFloat(this.rango.value)})
        })

        this.estado = true
    }

    leerEstado() {
        return this.estado
    }

    fondoHsl() {
        this.style.setProperty("--colorBackgroundTrack", 
            "linear-gradient(to right, rgba(255, 0, 0, 0.6), rgba(255, 255, 0, 0.6), rgba(0, 255, 0, 0.6), rgba(0, 255, 255, 0.6), rgba(0, 0, 255, 0.6), rgba(255, 0, 255, 0.6))")
        this.style.setProperty("--colorBorderThumb", "white")
        this.style.setProperty("--colorBorderThumbHover", "transparent")        
        this.style.setProperty("--thumbWidth", "24px")
        this.style.setProperty("--thumbHeight", "10px")
    }

    colorThumb(color) {
        this.style.setProperty("--colorBackgroundThumb", `hsl(${color}, 100%, 50%)`)
        this.style.setProperty("--colorBackgroundThumbHover", `hsl(${color}, 100%, 50%)`)
    }
}
customElements.define("rango-simple", inputRango)
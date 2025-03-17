class inputRango extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.innerHTML = `
            <form class="contenedor">
                <input id="rango" type="range">
            </form>
        `
        
        const estiloRangos = document.createElement("style")
        estiloRangos.textContent = `
            * {
                box-sizing: border-box;
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

                    &:hover::-moz-range-thumb {
                        border-color: grey;
                        background-color: white;
                        transition: .2s;
                    }

                    &::-moz-range-track {
                        height: 2px;
                        border: 1px solid grey;
                        border-radius: 4px;
                        background-color: transparent;
                    }

                    &::-moz-range-thumb {
                        width: 18px;
                        height: 8px;
                        border: 2px solid white;
                        border-radius: 4px;
                        background-color: grey;
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
        this.shadowRoot.appendChild(estiloRangos)
    }

    connectedCallback() {
        const min = this.getAttribute("min")
        const max = this.getAttribute("max")
        const value = this.getAttribute("value")
        const rango = this.shadowRoot.querySelector("#rango")
        rango.setAttribute("min", min)
        rango.setAttribute("max", max)
        rango.setAttribute("value", value)
    }
}
customElements.define("rango-simple", inputRango)
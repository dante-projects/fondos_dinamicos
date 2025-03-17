import "./rangoSimple.js"

class rangoValor extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.innerHTML = `
            <div class="contenedor">
                <form class="cajaIzq">
                    <div id="titulo" class="titulo"></div>
                    <rango-simple id="rango"></rango-simple>
                </form>
                <div class="cajaDer">
                    <span id="cajaValor" class="cajaValor"></span>
                </div>
            </div>
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
                margin-bottom: 50px;

                .cajaIzq {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 74%;
                    height: 100%;

                    .titulo {
                        color: grey;
                    }
                }

                .cajaDer {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 50px;
                    height: 35px;
                    border: 1px solid grey;
                    border-radius: 4px;
                    transition: .6s;

                    .cajaValor {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        transition: .2s;
                    }    
                }
            }
        `
        this.shadowRoot.appendChild(estiloRangos)
    }

    connectedCallback() {
        const titulo = this.shadowRoot.getElementById("titulo")
        titulo.innerText = this.getAttribute("title")
        const min = this.getAttribute("min")
        const max = this.getAttribute("max")
        const value = this.getAttribute("value")

        const rango = this.shadowRoot.getElementById("rango").shadowRoot.querySelector("#rango")
        rango.setAttribute("min", min)
        rango.setAttribute("max", max)
        rango.setAttribute("value", value)

        const cajaValor = this.shadowRoot.getElementById("cajaValor")
        cajaValor.innerText = rango.value
        
        rango.addEventListener("input", () => {
            cajaValor.innerText = rango.value
        })
    }
}
customElements.define("input-valor", rangoValor)
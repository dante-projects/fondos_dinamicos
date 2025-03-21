class inputRango extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.innerHTML = `
            <div class="contenedorComponente">
                <form class="cajaIzq">
                    <div id="titulo" class="titulo"></div>
                    <input id="rango" type="range">
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
            
            .contenedorComponente {
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

                    input[type="range"] {
                        width: 100%;
                        height: 50%;
                        background: transparent;
                        cursor: pointer;

                        &:hover::-moz-range-thumb {
                            border-color: rgb(28, 28, 28);
                            transition: .2s;
                        }

                        &::-moz-range-track {
                            height: 2px;
                            border: 1px solid grey;
                            border-radius: 4px;
                            background-color: transparent;
                        }

                        &::-moz-range-thumb {
                            box-sizing: border-box;
                            width: 24px;
                            height: 12px;
                            border: 3px solid grey;
                            border-radius: 3px;
                            background-color: white;
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


        const rango = this.shadowRoot.getElementById("rango")
        const cajaValor = this.shadowRoot.getElementById("cajaValor")
        cajaValor.innerText = rango.value
        
        rango.addEventListener("input", () => {
            cajaValor.innerText = rango.value
        })
    }
}
customElements.define("input-valor", inputRango)
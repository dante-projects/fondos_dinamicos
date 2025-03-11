class controlesCampoTexto extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        this.shadowRoot.appendChild(link)

        this.shadowRoot.innerHTML += `
            <div class="contenedor">
                <form id="etiquetas" class="etiquetas">
                    <span class="botonIcono material-symbols-outlined flexCentrado borderRadiusGrey">
                        <input class="inputOculto" type="radio" name="etiqueta" checked>format_h1
                    </span>
                    <span class="botonIcono material-symbols-outlined flexCentrado borderRadiusGrey">
                        <input class="inputOculto" type="radio" name="etiqueta">format_h2
                    </span>
                    <span class="botonIcono material-symbols-outlined flexCentrado borderRadiusGrey">
                        <input class="inputOculto" type="radio" name="etiqueta">format_h3
                    </span>
                    <span class="botonIcono material-symbols-outlined flexCentrado borderRadiusGrey">
                        <input class="inputOculto" type="radio" name="etiqueta">format_h4
                    </span>
                    <span class="botonIcono material-symbols-outlined flexCentrado borderRadiusGrey">
                        <input class="inputOculto" type="radio" name="etiqueta">view_headline
                    </span>
                    <span class="botonIcono material-symbols-outlined flexCentrado borderRadiusGrey">
                        <input class="inputOculto" type="radio" name="etiqueta">article_person
                    </span>
                </form>
            </div>
        `

        const estilo = document.createElement("style")
        estilo.innerText = `
            * {
                box-sizing: border-box;
            }

            .contenedor {
                width: 100%;
                heigth: auto;
                margin-top: 10px;

                .etiquetas {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: auto;

                    .botonIcono {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 32px;
                        height: 32px;
                        border: 1px solid grey;
                        border-radius: 4px;
                        color: grey;

                        input {
                            position: absolute;
                            appearance: none;
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
}
customElements.define("control-campo-texto", controlesCampoTexto)
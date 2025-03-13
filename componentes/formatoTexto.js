class opcionesCampoTexto extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        this.shadowRoot.appendChild(link)

        this.shadowRoot.innerHTML += `
            <div class="contenedor">
                <form id="etiquetas" class="etiquetas borderRadiusGrey">
                    <span class="botonIcono material-symbols-outlined centrado" title="h1">
                        <input class="inputOculto" type="radio" name="etiqueta" checked>format_h1
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="h2">
                        <input class="inputOculto" type="radio" name="etiqueta">format_h2
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="h3">
                        <input class="inputOculto" type="radio" name="etiqueta">format_h3
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="h4">
                        <input class="inputOculto" type="radio" name="etiqueta">format_h4
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="p">
                        <input class="inputOculto" type="radio" name="etiqueta">view_headline
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="pre">
                        <input class="inputOculto" type="radio" name="etiqueta">article_person
                    </span>
                </form>

                <div class="cajaFormato">
                    <div id="visor" class="visor centrado borderRadiusGrey"></div>
                    <div class="textoSize borderRadiusGrey">
                        <span id="textoSizeMas" class="boton material-symbols-outlined centrado">stat_1</span>
                        <span id="textoSizeValor" class="valor centrado"></span>
                        <span id="textoSizeMenos" class="boton material-symbols-outlined centrado">stat_minus_1</span>
                    </div>
                </div>
            
                <form id="formatoLetra" class="formatoLetra borderRadiusGrey">
                    <span class="botonIcono material-symbols-outlined centrado" title="left">
                        <input class="inputOculto" type="radio" name="alineacion">align_justify_flex_start
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="center">
                        <input class="inputOculto" type="radio" name="alineacion" checked>align_justify_space_even
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="right">
                        <input class="inputOculto" type="radio" name="alineacion">align_justify_flex_end
                    </span>

                    <span class="botonIcono material-symbols-outlined centrado" title="bolder">
                        <input class="inputOculto" type="checkbox">format_bold
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="italic">
                        <input class="inputOculto" type="checkbox">format_italic
                    </span>
                    <span class="botonIcono material-symbols-outlined centrado" title="underline">
                        <input class="inputOculto" type="checkbox">format_underlined
                    </span>
                </form>
            </div>
        `

        const estilo = document.createElement("style")
        estilo.innerText = `
            * {
                box-sizing: border-box;
            }

            :host {
                --altoElementos: 32px;
                --margenVertical: 14px;
            }

            .botonIcono {
                position: relative;
                width: 32px;
                height: var(--altoElementos);
                color: grey;

                &:has(input:checked) {
                    color: red;
                }

                input {
                    position: absolute;
                    appearance: none;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
            }

            .centrado {
                display: flex;
                justify-content: center;
                align-items: center
            }

            .borderRadiusGrey {
                border: 1px solid grey;
                border-radius: 4px;
            }

            .contenedor {
                width: 100%;
                heigth: auto;
                margin-top: 4px;

                .etiquetas {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: auto;
                    margin-bottom: var(--margenVertical);
                }

                .cajaFormato {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: 100px;
                    margin-bottom: var(--margenVertical);

                    .visor {
                        height: 100%;
                        width: calc(100% - 54px);
                        box-shadow: inset 2px 2px 8px grey;
                        color: grey;
                        overflow: hidden;

                        .etiquetaCreada {
                            font-weight: lighter;
                        }
                    }

                    .textoSize {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        width: 40px;
                        color: grey;
                        
                        .boton {
                            width: 100%;

                            &:hover {
                                color: red;
                                font-weight: bolder;
                                cursor: pointer;
                            }
                        }

                        .valor {
                            font-size: 16px;
                        }
                    }
                }

                .formatoLetra {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    heigth: var(--altoElementos);
                    margin-bottom: var(--margenVertical);
                    margin-bottom: var(--margenVertical);

                    .botonIcono {
                        border: none;
                        top: 1px;
                        font-size: 20px;
                        
                        &:nth-of-type(6) { 
                            font-size: 22px;
                            top: 3px;
                        }
                    }
                }
            }
        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback () {
        const visor = this.shadowRoot.querySelector("#visor")
        const html = Array.from(this.shadowRoot.querySelectorAll("#etiquetas .botonIcono input"))
        const alineacion = Array.from(this.shadowRoot.querySelectorAll("#formatoLetra .botonIcono input[type='radio']"))
        const formato = Array.from(this.shadowRoot.querySelectorAll("#formatoLetra .botonIcono input[type='checkbox']"))
        let configuracion = [4, "h1", "center", null]

        function buscarChecked(array) {
            return array.filter(item => item.checked).map(item => item.parentElement.title)
        }

        function sumar(par) {
            configuracion[0] = parseFloat((configuracion[0] + par).toFixed(1))
            valor.innerText = configuracion[0]
        }

        function restar(par) {
            configuracion[0] = parseFloat((configuracion[0] - par).toFixed(1))
            valor.innerText = configuracion[0]
        }


        function dibujar() {
            let etiquetaCreada = visor.querySelector("#etiquetaCreada")

            if (!etiquetaCreada || etiquetaCreada.tagName.toLowerCase() !== configuracion[1]) {                
                visor.innerHTML = ""
                const nuevoElemento = document.createElement(configuracion[1])
                nuevoElemento.id = "etiquetaCreada"
                nuevoElemento.className = "etiquetaCreada centrado"
                nuevoElemento.innerText = "Texto"
                nuevoElemento.style.width = "90%"
                visor.appendChild(nuevoElemento)
                return nuevoElemento    
            }
        }

        function xDefecto() {
            const sizes = [4, 3.4, 2.8, 2.2, 1.4, 1]
            const size =    configuracion[1] === "h1" ? sizes[0] :
                            configuracion[1] === "h2" ? sizes[1] :
                            configuracion[1] === "h3" ? sizes[2] :
                            configuracion[1] === "h4" ? sizes[3] :
                            configuracion[1] === "p" ? sizes[4] :
                            configuracion[1] === "pre" ? sizes[5] : null

            configuracion[0] = size
        }

        function configurar() {
            const elementoVisor = visor.querySelector("#etiquetaCreada")
                elementoVisor.style.fontWeight = "normal";
                elementoVisor.style.fontStyle = "normal";
                elementoVisor.style.textDecoration = "none";
                elementoVisor.style.fontSize = configuracion[0] + "rem"
                elementoVisor.style.justifyContent = configuracion[2]
    
                if (configuracion[3]) {
                    configuracion[3].forEach((item) => {
                        item === "bolder" ? elementoVisor.style.fontWeight = item : null
                        item === "italic" ? elementoVisor.style.fontStyle = item : null
                        item === "underline" ? elementoVisor.style.textDecoration = item : null
                    })
                }
        }

        const sumarBoton = this.shadowRoot.querySelector("#textoSizeMas")
        sumarBoton.addEventListener("click", () => {
            sumar(.1)
            main()
        })

        const restarBoton = this.shadowRoot.querySelector("#textoSizeMenos")
        restarBoton.addEventListener("click", () => {
            restar(.1)
            main()
        })

        html.forEach((item) => {
            item.addEventListener("change", () => {
                const checked = buscarChecked(html)
                configuracion[1] = checked[0]
                xDefecto()
                main()
            })
        })

        alineacion.forEach((item) => {
            item.addEventListener("click", () => {
                const checked = buscarChecked(alineacion)
                configuracion[2] = checked[0]
                main()
            })
        })
        
        formato.forEach((item) => {
            item.addEventListener("click", () => {
                const checked = buscarChecked(formato)
                configuracion[3] = checked
                main()
            })
        })

        const valor = this.shadowRoot.querySelector("#textoSizeValor")
        function main() {
            valor.innerText = configuracion[0]
            dibujar()
            configurar()
        }

        main()
    }
}
customElements.define("opciones-campo-texto", opcionesCampoTexto)
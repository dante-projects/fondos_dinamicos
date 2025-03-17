import "./comunes/titulo.js"
import "./rangos/rangoSimple.js"

class selectorColor extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.innerHTML += `
            <div class="contenedor borderRadiusGrey">
                <titulo-desplegable title="Color"></titulo-desplegable>
                <div id="componente" class="componente">
                    <div class="boxPadding">
                        <div class="colorBox">
                            <div id="degradado" class="degradado">
                                <div class="fondo degradado1"></div>
                                <div class="fondo degradado2"></div>
                                <div id="cursorSelector" class="cursorSelector centrado"></div>
                            </div>
                            <div id="capaInteractiva" class="capaInteractiva"></div>
                        </div>
                        <div class="rangoBox">
                            <span id="valorColor" class="valorColor valor centrado borderRadiusGrey"></span>
                            <rango-simple id="rangoColor" class="rangoColor" min="0" max="360" value="180">
                        </div>
                        <div class="rangoBox">
                            <div class="transparencia fondoCuadrados">
                                <span id="valorAlpha" class="valorAlpha valor centrado borderRadiusGrey"></span>
                            </div>
                            <rango-simple id="rangoAlpha" class="rangoAlpha" min="0" max="100" value="50">
                        </div>
                        <ul>
                            <li class="fondoCuadrados"><span></span></li>
                            <li class="fondoCuadrados"><span></span></li>
                            <li class="fondoCuadrados"><span></span></li>
                            <li class="fondoCuadrados"><span></span></li>
                            <li class="fondoCuadrados"><span></span></li>
                            <li class="fondoCuadrados"><span></span></li>
                        </ul>
                    </div>
                </div>  
            </div>
        `

        const estilo = document.createElement("style")
        estilo.innerText = `
            * {
                box-sizing: border-box;
            }

            :host {
                --colorRangoSinAlpha: red;
                --colorRangoConAlpha: red;
            }

            .centrado {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .fondoCuadrados {
                background-image: url("../recursos/imagenes/fondoTransparencias.png");
                background-size: 8px;
            }

            .borderRadiusGrey {
                border: 1px solid grey;
                border-radius: 4px;            
            }

            .contenedor {
                width: 100%;
                height: auto;

                .componente {
                    width: 100%;
                    height: 0;
                    overflow: hidden;
                    transition: .5s ease-in-out;

                    .boxPadding {
                        width: 100%;
                        height: auto;
                        padding: 10px;

                        .colorBox {
                            position: relative;
                            display: flex;
                            width: 100%;
                            height: 110px;
                            margin-bottom: 20px;

                            .degradado {
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                overflow: hidden;

                                .fondo {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                }

                                .degradado1 {
                                    background: linear-gradient(to right, white , var(--colorRangoSinAlpha));     
                                }

                                .degradado2 {
                                    background: linear-gradient(to bottom, transparent , black);
                                }

                                .cursorSelector {
                                    position: relative;
                                    left: calc(50% - 14px);
                                    top: calc(50% - 14px);
                                    width: 20px;
                                    height: 20px;
                                    border: 2px solid rgb(0, 0, 0, .4);
                                    border-radius: 50%;
                                    filter: blur(.2px);
                                    box-shadow: 0 0 6px 2px white;
                                }
                            }

                            .capaInteractiva {
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                cursor: crosshair;
                            }
                        }

                        .rangoBox {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            height: auto;
                            margin-bottom: 10px;

                            .transparencia {
                                width: 50px;
                                height: 25px;
                                border-radius: 4px;
                            }

                            .valor {
                                width: 50px;
                                height: 25px;
                            }

                            rango-simple {
                                width: 74%;
                            }

                            .valorColor {
                                background-color: var(--colorRangoSinAlpha);
                            }

                            .valorAlpha {
                                background-color: var(--colorRangoConAlpha);
                            }
                        }
                        
                        ul {
                            all: unset;
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            height: auto;
                            list-style: none;

                            li {
                                display: flex;
                                width: 24px;
                                height: 24px;
                                background-color: red;
                                border-radius: 4px;

                                span {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 4px;
                                }

                                &:first-of-type span {
                                    background-color: var(--colorRangoSinAlpha);
                                    opacity: .16;
                                }
                                
                                &:nth-of-type(2) span {
                                    background-color: var(--colorRangoSinAlpha);
                                    opacity: .33;
                                }
                                
                                &:nth-of-type(3) span {
                                    background-color: var(--colorRangoSinAlpha);
                                    opacity: .5;
                                }
                                
                                &:nth-of-type(4) span {
                                    background-color: var(--colorRangoSinAlpha);
                                    opacity: .66;
                                }
                                
                                &:nth-of-type(5) span {
                                    background-color: var(--colorRangoSinAlpha);
                                    opacity: .83;
                                }
                                
                                &:nth-of-type(6) span {
                                    background-color: var(--colorRangoSinAlpha);
                                    opacity: 1;
                                }
                            }
                        }
                    }
                }
            }
        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {

        // apertura y cierre
        window.addEventListener("estadoTitulo", (e) => {
            abrirCerrar(e.detail.estado)
        })

        // componente.offsetHeight
        const componente = this.shadowRoot.querySelector("#componente")
        function abrirCerrar(item) {
            componente.style.height = item === 1 ? `${componente.scrollHeight}px` : "0"
        }

        // color rango
        const rangoColor = this.shadowRoot.querySelector("#rangoColor").shadowRoot.querySelector("#rango")
        const rangoAlpha = this.shadowRoot.querySelector("#rangoAlpha").shadowRoot.querySelector("#rango")

        let color = rangoColor.value 
        let Alpha = rangoAlpha.value / 100

        const actualizarColor = () => {
            this.style.setProperty("--colorRangoSinAlpha", `hsl(${color}, 100%, 50%)`)
            this.style.setProperty("--colorRangoConAlpha", `hsla(${color}, 100%, 50%, ${Alpha})`)
        }

        actualizarColor()

        //rangos
        rangoColor.addEventListener("input", () => {
            color = rangoColor.value
            actualizarColor()
        })

        rangoAlpha.addEventListener("input", () => {
            Alpha = rangoAlpha.value / 100
            actualizarColor()
        })

        // degradado
        const capaInteractiva = this.shadowRoot.querySelector("#capaInteractiva")
        const cursorSelector = this.shadowRoot.querySelector("#cursorSelector")
        const anchoSelector = 10

        function moverCursor(e) {
            const dimensionesContenedor = capaInteractiva.getBoundingClientRect()
            let nuevaPosicionX = e.clientX - dimensionesContenedor.left;
            let nuevaPosicionY = e.clientY - dimensionesContenedor.top;
            cursorSelector.style.left = `calc(${nuevaPosicionX}px - ${anchoSelector}px)`
            cursorSelector.style.top = `calc(${nuevaPosicionY}px - ${anchoSelector}px)`            
        }     

        let click = 0
        capaInteractiva.addEventListener("mousedown", (e) => {
            e.preventDefault()
            moverCursor(e)
            click = 1
        })

        capaInteractiva.addEventListener("mouseup", () => {
            console.log("soltado")
            click = 0
        })

        capaInteractiva.addEventListener("mousemove", (e) => {
            if (click === 1) {
                moverCursor(e)
            }
        })
    }
}
customElements.define("selector-color", selectorColor)
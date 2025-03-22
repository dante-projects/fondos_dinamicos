import "./comunes/subComponentes/titulo.js"
import "./comunes/subComponentes/rangoSimple.js"
import { capturarEvento } from "./comunes/funciones/eventosPesonalizados.js"
import { abrirCerrar } from "./comunes/funciones/abrirCerrar.js"

class selectorColor extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.componentesHijos = false

        capturarEvento("textoColor", (e) => {
            abrirCerrar(this.shadowRoot.querySelector("#contenedorDesplegable"), e.detail)
        })

        capturarEvento("rangoColor", (e) => {
            this.color = e.detail
            this.actualizarHls( this.color, this.saturacion, this.luminosidad , this.alpha)
            this.rangoColor.colorThumb(this.color) 
            this.valorCalculadoCod()
        })

        capturarEvento("rangoAlpha", (e) => {
            this.alpha = e.detail / 100
            this.actualizarHls(this.color, this.saturacion, this.luminosidad , this.alpha)
            this.valorCalculadoCod()
        })

        this.shadowRoot.innerHTML += `
            <div class="contenedor borderRadiusGrey">
                <titulo-desplegable id="textoColor">Color</titulo-desplegable>
                <div id="contenedorDesplegable" class="contenedorDesplegable">
                    <div class="boxPadding">
                        <div class="colorBox">
                            <div id="muestraBox" class="muestraBox fondoCuadrados">
                               <div class="colorMuestra"></div> 
                            </div>
                            <div id="degradado" class="degradado">
                                <div class="fondo degradado1"></div>
                                <div class="fondo degradado2"></div>
                                <div id="cursorSelector" class="cursorSelector centrado"></div>
                                <div id="capaInteractiva" class="capaInteractiva fondo"></div>
                            </div>
                        </div>
                        <div class="rangoBox">
                            <rango-simple id="rangoColor" class="rangoColor" min="0" max="360" value="180">
                        </div>
                        <div class="rangoBox">
                            <div class="transparencia fondoCuadrados">
                                <span id="valorAlpha" class="valorAlpha valor centrado borderRadiusGrey"></span>
                            </div>
                            <rango-simple id="rangoAlpha" min="0" max="100" value="100"></rango-simple>
                        </div>
                        <ul id="valorCalculado" class="valorCalculado">
                           <li id="tono" class="borderRadiusGrey centrado">c</li> 
                           <li id="saturacion" class="borderRadiusGrey centrado">f</li> 
                           <li id="luminosidad" class="borderRadiusGrey centrado">g</li> 
                           <li id="alpha" class="borderRadiusGrey centrado">g</li> 
                        </ul>
                    </div>
                </div>  
            </div>
        `

        const estilo = document.createElement("style")
        estilo.innerText = `
            * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
                list-style: none;
            }

            :host {
                --color: 0;
                --saturacion: 0;
                --luminosidad: 0;
                --alpha: 1;
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

                .contenedorDesplegable {
                    width: 100%;
                    height: 0;
                    overflow: hidden;
                    transition: .5s ease-in-out;

                    .boxPadding {
                        width: 100%;
                        height: auto;
                        padding: 8px;

                        .colorBox {
                            display: flex;
                            width: 100%;
                            height: 110px;
                            margin-bottom: 6px;

                            .muestraBox {
                                width: 16%;
                                height: 100%;
                            
                                .colorMuestra {
                                    width: 100%;
                                    height: 100%;
                                    background-color: hsla(var(--color), var(--saturacion), var(--luminosidad), var(--alpha));
                                }
                            }

                            .degradado {
                                position: relative;
                                width: 84%;
                                height: 100%;
                                overflow: hidden;
                                
                                .fondo {
                                    position: absolute;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                }

                                .degradado1 {
                                    background: linear-gradient(to right, white , hsl(var(--color), 100%, 50%));     
                                }

                                .degradado2 {
                                    background: linear-gradient(to bottom, transparent , black);
                                }

                                .capaInteractiva {
                                    width: 100%;
                                    height: 100%;
                                    cursor: crosshair;
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
                                    box-shadow: 0 0 1px white;
                                }
                            }
                        }

                        .rangoBox {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            height: auto;

                            .rangoColor {
                                width: 100%;
                                margin-bottom: -12px;
                            }

                            .transparencia {
                                width: 50px;
                                height: 25px;
                                border-radius: 4px;
                            }

                            .valor {
                                width: 50px;
                                height: 25px;
                            }

                            .valorAlpha {
                                color: rgb(100, 100, 100);
                                font-size: 12px;
                                background-color: hsla(var(--color), 100%, 50%, var(--alpha));
                            }
                        }

                        .valorCalculado {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            height: 32px;
                            color: grey;

                            li {
                                width: 50px;
                                height: 100%;
                                font-size: 12px;
                                box-shadow: inset 1px 1px 4px grey;
                            }
                        }
                    }
                }
            }
        `
        this.shadowRoot.appendChild(estilo)      

        //valores iniciales
        this.color = 180
        this.saturacion = 100
        this.luminosidad = 50
        this.alpha = 1

        this.actualizarHls = () => {
            this.style.setProperty("--color", this.color)
            this.style.setProperty("--saturacion", this.saturacion+"%")
            this.style.setProperty("--luminosidad", this.luminosidad+"%")
            this.style.setProperty("--alpha", this.alpha)
        }

        this.valorCalculadoCod = () => {
            this.valorCalculado = this.shadowRoot.querySelector("#valorCalculado")
            this.shadowRoot.querySelector("#tono").innerText = this.color
            this.shadowRoot.querySelector("#saturacion").innerText = this.saturacion
            this.shadowRoot.querySelector("#luminosidad").innerText = this.luminosidad
            this.shadowRoot.querySelector("#alpha").innerText = this.alpha
        }

    }

    connectedCallback() {

        this.rangoColor  = this.shadowRoot.querySelector("#rangoColor")
        this.rangoColor.colorThumb(this.color) 
        this.rangoColor.fondoHsl() 
        this.actualizarHls()
        this.valorCalculadoCod()

        // selector color
        const capaInteractiva = this.shadowRoot.querySelector("#capaInteractiva")
        const cursorSelector = this.shadowRoot.querySelector("#cursorSelector")
        const anchoSelector = 10

        function moverCursor(e) {
            const contenedor = capaInteractiva.getBoundingClientRect()
            let posicionX = e.clientX - contenedor.left;
            let posicionY = e.clientY - contenedor.top;
            cursorSelector.style.left = `calc(${posicionX}px - ${anchoSelector}px)`
            cursorSelector.style.top = `calc(${posicionY}px - ${anchoSelector}px)`  
            return [posicionX, posicionY, contenedor.width, contenedor.height]
        }     

        const obtenerHls = (item) => {
            const X = Math.round(((item[0] / item[2]) * 100))
            const ejeYhor = Math.round((100 - (item[0] / item[2]) * 50))
            const Y = Math.round((ejeYhor - (item[1] / item[3]) * ejeYhor))
            this.saturacion = X
            this.luminosidad = Y
        }

        let click = 0
        capaInteractiva.addEventListener("mousedown", (e) => {
            obtenerHls(moverCursor(e))
            this.actualizarHls()
            this.valorCalculadoCod()
            click = 1
        })

        capaInteractiva.addEventListener("mouseup", (e) => {
            click = 0
        })

        capaInteractiva.addEventListener("mousemove", (e) => {
            if (click === 1) {
                obtenerHls(moverCursor(e))
                this.actualizarHls()
                this.valorCalculadoCod()
            }
        })
    }
}
customElements.define("selector-color", selectorColor)
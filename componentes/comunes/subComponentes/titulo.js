import {publicarEvento} from "../funciones/eventosPesonalizados.js"

class tituloDesplegable extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.estado = false
        this.abierto = false

        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        this.shadowRoot.appendChild(link)

        this.shadowRoot.innerHTML += `
            <div class="contenedor borderRadiusGrey">
                <div id="titulo" class="titulo centradoVertical"></div>
                <span class="icono material-symbols-outlined">arrow_drop_down</span>
                <div class="capaReactiva"></div>
            </div>
        `  
        
        const estilo = document.createElement("style")
        estilo.textContent = `
            * {
                box-sizing: border-box;
            }

            .contenedor {
                position: relative;
                display: flex;
                width: 100%;
                height: 32px;

                    &:hover .icono {
                        color: red;
                    }

                .titulo {
                    display: flex;
                    align-items: center;
                    width: calc(100% - 32px);
                    height: 100%;
                    color: grey;
                    text-indent: 10px;
                    transition: .5s .5s;
                }

                .icono {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 32px;
                    height: 100%;
                    font-size: 30px;
                    color: grey;
                }

                .capaReactiva {
                    position: absolute;
                    width: 100%;
                    height: 32px;
                    cursor: pointer;
                }
            }
        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {
        const titulo = this.shadowRoot.querySelector("#titulo")
        const capaReactiva = this.shadowRoot.querySelector(".capaReactiva")
        !this.getAttribute("id") 
            ? console.log(this, "Falta parametro [id] en el componente padre") 
            : titulo.textContent = this.textContent

        const abrirCerrar = () => {
            this.abierto = this.abierto ? false : true
        }

        capaReactiva.addEventListener("click", () => {
            abrirCerrar()
            publicarEvento(this.id, {detail: this.abierto})
        })
        this.estado = true
    }

    leerEstado() {
        return this.estado
    }
}
customElements.define("titulo-desplegable", tituloDesplegable)
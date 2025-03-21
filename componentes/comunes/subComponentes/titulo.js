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
            </div>
        `  
        
        const estilo = document.createElement("style")
        estilo.textContent = `
            .contenedor {
                display: flex;
                width: 100%;
                height: 32px;

                .titulo {
                    display: flex;
                    align-items: center;
                    width: calc(100% - 32px);
                    height: 100%;
                    color: grey;
                    text-indent: 10px;
                    cursor: pointer;
                    transition: .5s .5s;

                    &:hover +.icono {
                        color: red;
                    }
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
            }
        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {

        const titulo = this.shadowRoot.querySelector("#titulo")
        !this.getAttribute("title") 
            ? console.log(this, "Falta parametro [title]") 
            : titulo.textContent = this.getAttribute("title")

        const abrirCerrar = () => {
            this.abierto = this.abierto ? false : true
        }

        titulo.addEventListener("click", () => {
            abrirCerrar()
            publicarEvento("titulo", {detail: this.abierto})
        })

        this.estado = true
    }

    leerEstado() {
        return this.estado
    }
}
customElements.define("titulo-desplegable", tituloDesplegable)
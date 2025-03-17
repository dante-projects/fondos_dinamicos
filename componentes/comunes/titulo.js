class tituloDesplegable extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})

        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        this.shadowRoot.appendChild(link)

        this.shadowRoot.innerHTML += `
            <div class="contenedor borderRadiusGrey">
                <div id="titulo" class="titulo">
                    <span class="icono material-symbols-outlined centrado">arrow_drop_down</span>
                </div>
            </div>
        `  
        
        const estilo = document.createElement("style")
        estilo.textContent = `
            .titulo {
                position: relative;
                display: flex;
                align-items: center;
                flex: 1;
                height: 32px;
                color: grey;
                text-indent: 10px;
                cursor: pointer;
                transition: .5s .5s;

                &:hover .icono {
                    color: red;
                }

                .icono {
                    position: absolute;
                    right: 0;
                    height: 32px;
                    aspect-ratio: 1/1;
                    font-size: 30px;
                }
            }
        `
        this.shadowRoot.appendChild(estilo)
    }
    connectedCallback() {
        const titulo = this.shadowRoot.querySelector("#titulo")
        !this.getAttribute("title") 
            ? console.log(this, "Falta parametro [title]") 
            : titulo.innerText = this.getAttribute("title")
        let estado = 0

        function publicar() {
            const publicar = new CustomEvent("estadoTitulo", {detail: {estado}, bubbles: true})
            window.dispatchEvent(publicar)    
        }

        function abrirCerrar() {
            titulo.classList.toggle("abierto")
            estado = titulo.classList.contains("abierto") ? 1 : 0
            publicar()
        }

        titulo.addEventListener("click", () => {
            abrirCerrar()
        })
    }
}
customElements.define("titulo-desplegable", tituloDesplegable)
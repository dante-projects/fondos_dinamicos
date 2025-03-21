// data-border            true                aplica un borde al componente
// data-boxes             number              genera una cantidad de cajas
// data-boxBorder         true                borde sobre las cajas
// data-input             radio/checkbox      genera radios relacionados
// data-check             number              selecciona el input por defecto
// data-size        *     number in px        tamaño de las cajas 1/1

class cajaHorizontal extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.estado = false

        this.shadowRoot.innerHTML = `
            <div id="contenedor" class="contenedor"></div>
        `

        const estilo = document.createElement("style")
        estilo.textContent = `
            * {
                box-sizing: border-box;
                margin: 0;
            }

            :host {
                --altoAncho: 0px;
            }

            .borderRadiusGrey {
                border: 1px solid grey;
                border-radius: 4px;
            }

            .contenedor {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 32px;

                .caja {
                    position: relative;
                    width: var(--altoAncho);
                    height: var(--altoAncho);

                    &:has(input:checked) {
                        border: 1px solid red;
                    }

                    input {
                        position: absolute;
                        appearance: none;
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                    }
                }
            }
        `
        this.shadowRoot.appendChild(estilo)
    }

    connectedCallback() {
        this.getAttribute("border") 
            ? this.shadowRoot.querySelector("#contenedor").classList.add("borderRadiusGrey") 
            : null
        
        this.style.setProperty("--altoAncho", `${this.getAttribute("boxSize")}px`)

        let cajas = []
        if (this.getAttribute("boxes") && this.getAttribute("boxes") > 0) {
            const contenedor = this.shadowRoot.querySelector("#contenedor")
            for (let i = 0; i < parseFloat(this.getAttribute("boxes")); i++) {
                const nuevaCaja = document.createElement("span")
                nuevaCaja.classList.add("caja")
                contenedor.appendChild(nuevaCaja)
                cajas.push(nuevaCaja)
            }
        }

        if (this.getAttribute("boxBorder")) {
            cajas.forEach((item) => {
                item.classList.add("borderRadiusGrey")
            })
        }

        if (this.getAttribute("radio")) {
            cajas.forEach((item, num) => {
                const radio = document.createElement("input")
                radio.classList.add("inputOculto")
                radio.setAttribute("name", "grupoRadios")
                radio.setAttribute("type", "radio")
                item.appendChild(radio)
                num === parseFloat(this.getAttribute("check"))
                    ? radio.checked = true
                    : null
            })
        }
        this.estado = true
    }
    leerEstado() {
        return this.estado
    }
}
customElements.define("caja-horizontal", cajaHorizontal)
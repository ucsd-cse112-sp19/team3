'use strict';

/** Class for Custom Slider component */
class CustomSlider extends HTMLElement {
  /** Constructor of the class */
  constructor() {
    super();

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    CustomSlider.template = document.createElement('template');
    const templateContent = CustomSlider.template.content;

    // Import CSS
    const importStyle = `<style>
    </style>`;

    // Attributes
    let value = 0;
    let min = 0;
    let max = 100;
    let disabled = '';
    if (this.hasAttribute('value')) {
      value = this.getAttribute('value');
    }
    if (this.hasAttribute('min')) {
      min = this.getAttribute('min');
    }
    if (this.hasAttribute('max')) {
      max = this.getAttribute('max');
    }
    if (this.hasAttribute('disabled')) {
      disabled = 'disabled';
    }


    // Set HTML

    CustomSlider.template.innerHTML = importStyle +
    `<div class="slidecontainer">`+
        `<form>
            <input type="range" name="amountRange" min=` + min + ` max=` + max +
            `  value=` + value +
            ` oninput="this.form.amountInput.value=this.value" `
            + disabled + `/>
            <input type="number" name="amountInput" min=` + min + ` max=`
            + max +
            `  value=` + value +
            ` oninput="this.form.amountRange.value=this.value" ` +
            disabled + `/>
        </form>
    </div>`;


    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /** Element attached on DOM */
  connectedCallback() {

  }
}

CustomSlider.template = document.createElement('CustomSlider_template');
customElements.define('custom-slider', CustomSlider);

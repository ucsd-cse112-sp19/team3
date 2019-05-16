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
      .medium-input {
        width: 20px;
        height: 20px;
      }
      .medium-input {
        width: 50px;
        height: 50px;
      }
      .large-input {
        width: 100px;
        height: 100px;
      }
    </style>`;

    // Attributes
    let value = 0;
    let min = 0;
    let max = 100;
    let disabled = '';
    let vertical = '';
    let show_input = '';
    let input_class = 'small-input';	

    // Store the value of the attribute value
    if (this.hasAttribute('value')) {
      value = this.getAttribute('value');
    }
    // Store the value of the attribute min
    if (this.hasAttribute('min')) {
      min = this.getAttribute('min');
    }
    // store the value of the attribute max
    if (this.hasAttribute('max')) {
      max = this.getAttribute('max');
    }
    // disable
    if (this.hasAttribute('disabled')) {
      disabled = 'disabled';
    }
    // store the string indicating vertical orientation
    if (this.hasAttribute('vertical')) {
      vertical = this.getAttribute('vertical');
    }
    // store the value of steps
    if (this.hasAttribute('steps')) {
      steps = this.getAttribute('steps');
    }
    // store the value of 
    if (this.hasAttribute('size')) {
      var size_str = this.getAttribute('size');
      if (size_str == 'L')
        input_class = 'large-input';
      else if(size_str == 'M')
        input_class = 'medium-input';
    }

    // indicate whether need to show input box
    if (this.hasAttribute('show_input')) {
      show_input =  `<input type="number" name="amountInput" min=` + min + ` max=`
      + max +
      `  value=` + value + ` class=` + input_class +
      ` oninput="this.form.amountRange.value=this.value" ` +
      disabled + `/>`;
    }

    let input_str = importStyle +
      `<div class="slidecontainer">`+
          `<form>
              <input type="range" name="amountRange" min=` + min + ` max=` + max +
              `  value=` + value +
              ` oninput="this.form.amountInput.value=this.value" `
              + disabled + `/>` + show_input + `      
          </form>
      </div>`;

    console.log(input_str);

    // Set HTML
    CustomSlider.template.innerHTML = input_str;

    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /** Element attached on DOM */
  connectedCallback() {

  }
}

CustomSlider.template = document.createElement('CustomSlider_template');
customElements.define('custom-slider', CustomSlider);

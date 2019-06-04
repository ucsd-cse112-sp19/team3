'use strict';


/** 
 * @class CustomSlider
 * 
 * @summary create a new CustomSlider component with designated styles
 * ### Usage
 * ```
 * <custom-slider property="value"></custom-slider>
 * ```
 * @property {string} value - this is example
 * @property {string} min-color - this is example
 * @property {string} max-color - this is example
 * @property {boolean} disabled-color - this is example
 * @property {boolean} showInput - this is example
 * @property {string} size - this is example
 * 
 * @example <custom-slider min="5" max="105" value="50"></custom-slider>
 * @example <custom-slider min="5" max="105" value="50" disabled></custom-slider>
 * @example <custom-slider min="5" max="105" value="50" size="L" showinput></custom-slider>
 *
 * @todo fix the property table
 */
class CustomSlider extends HTMLElement {
  
  constructor() {
    super();

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    CustomSlider.template = document.createElement('template');
    const templateContent = CustomSlider.template.content;

    // Import CSS
    const importStyle = `<style>
      .small-input {
        text-align: center;
        width: 20px;
        height: 20px;
      }
      .medium-input {
        text-align: center;
        width: 50px;
        height: 50px;
      }
      .large-input {
        font-size: 80px;
        text-align: center;
        width: 200px;
        height: 100px;
      }
      
      input[type=range] {
      -webkit-appearance: none; /* Hides default slider */
      width: 40%; /* Specific width is required for Firefox. */
      background: transparent; /* Otherwise white in Chrome */
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
    }

    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    input[type=range]:focus {
      outline: none; /* Removes the blue border.*/
    }

    input[type=range]::-ms-track {
      width: 100%;
      cursor: pointer;

      /* Hides the slider so custom styles can be added */
      background: transparent; 
      border-color: transparent;
      color: transparent;
    }input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: #3071a9;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }input[type=range][disabled]::-webkit-slider-runnable-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: GREY;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #367ebd;
    }

    input[type=range]::-moz-range-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: #3071a9;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }

    input[type=range]::-ms-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      border-width: 16px 0;
      color: transparent;
    }
    input[type=range]::-ms-fill-lower {
      background: #2a6495;
      border: 0.2px solid #010101;
      border-radius: 2.6px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]:focus::-ms-fill-lower {
      background: #3071a9;
    }
    input[type=range]::-ms-fill-upper {
      background: #3071a9;
      border: 0.2px solid #010101;
      border-radius: 2.6px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]:focus::-ms-fill-upper {
      background: #367ebd;
    }
      
      /* Special styling for WebKit/Blink */
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 1px solid #000000;
      height: 36px;
      width: 16px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
      margin-top: -14px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }

    /* All the same stuff for Firefox */
    input[type=range]::-moz-range-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: 36px;
      width: 16px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
    }

    /* All the same stuff for IE */
    input[type=range]::-ms-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: 36px;
      width: 16px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
    }
    
    
    </style>`;

    // Attributes
    let value = 0;
    let min = 0;
    let max = 100;
    let disabled = '';
    let showInput = '';
    let inputClass = 'small-input';

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
      const sizeStr = this.getAttribute('size');
      if (sizeStr == 'L') {
        inputClass = 'large-input';
      } else if (sizeStr == 'M') {
        inputClass = 'medium-input';
      }
    }

    // indicate whether need to show input box
    if (this.hasAttribute('showInput')) {
      showInput = `<br/><input type="number" name="amountInput" min=`
      + min + ` max=`
      + max +
      `  value=` + value + ` class=` + inputClass +
      ` oninput="this.form.amountRange.value=this.value" ` +
      disabled + `/>`;
    }

    const inputStr = importStyle +
      `<div class="slidecontainer">`+
          `<form>
              <input type="range" name="amountRange" min=` + min + ` max=`
              + max +
              `  value=` + value +
              ` oninput="this.form.amountInput.value=this.value" `
              + disabled + `/>` + showInput + `      
          </form>
      </div>`;

    console.log(inputStr);

    // Set HTML
    CustomSlider.template.innerHTML = inputStr;

    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /* Element attached on DOM */
  connectedCallback() {

  }
}

CustomSlider.template = document.createElement('CustomSlider_template');
customElements.define('custom-slider', CustomSlider);

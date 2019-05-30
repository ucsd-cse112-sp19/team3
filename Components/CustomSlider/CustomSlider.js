'use strict';

/**
 * Class for Custom Slider component
 */
class CustomSlider extends HTMLElement {
  /**
   * Constructor of the class
   */
  constructor() {
    super();

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    CustomSlider.template = document.createElement('template');
    const templateContent = CustomSlider.template.content;

    // <link rel="stylesheet" href="./CustomSlider.css"/>
    CustomSlider.template.innerHTML = `
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      <input type="range"/>
      <div id="valueDisplay"/>
    `;

    shadowRoot.appendChild(templateContent.cloneNode(true));
    this.onValueChange = this.onValueChange.bind(this);
    shadowRoot.querySelector('input').addEventListener('input',
        this.onValueChange);
  }

  /**
   * Default attributes values
   */
  static get defaultAttributes() {
    return {
      'value': 0,
      'min': 0,
      'max': 100,
      'input-class': 'small-input',
      'showinput': true,
    };
  }

  /**
   * Attributes passed directly to input (range)
   */
  static get inputAttributes() {
    return [
      'min',
      'max',
      'name',
      'step',
      'value',
    ];
  }

  /**
   * Attribte tags passed directly to input (range)
   */
  static get tagAttributes() {
    return [
      'disabled',
      'readonly',
      'required',
    ];
  }

  /**
   * Custom attributes for slider
   */
  static get customAttributes() {
    return [
      'slider-class',
      'input-class',
      'showinput',
      'height',
    ];
  }

  /**
   * List of attributes supported by the component.
   * Component listens for changes to these attributes
   * and handles it using attributeChangedCallback().
   */
  static get observedAttributes() {
    // All attributes
    return CustomSlider.inputAttributes
        .concat(CustomSlider.customAttributes)
        .concat(CustomSlider.tagAttributes);
  }

  /**
   * Update style from observed attributes
   */
  updateStyle() {
    const shadow = this.shadowRoot;
    const slider = shadow.querySelector('input');
    const valueDisplay = shadow.querySelector('#valueDisplay');
    // Update all attributes for input
    for (const attribute of CustomSlider.inputAttributes) {
      if (this.hasAttribute(attribute)) {
        slider[attribute] = this.getAttribute(attribute);
      } else {
        if (CustomSlider.defaultAttributes[attribute] !== undefined) {
          // Use default attribute if possible
          slider[attribute] = CustomSlider.defaultAttributes[attribute];
        }
      }
    }

    for (const attribute of CustomSlider.tagAttributes) {
      if (this.hasAttribute(attribute)) {
        slider.setAttribute(attribute, true);
      }
    }

    // showinput option tag
    if (this.hasAttribute('showinput')) {
      valueDisplay.style.display = '';
    } else {
      valueDisplay.style.display = 'none';
    }

    // Update value
    valueDisplay.innerHTML = slider.value;

    // Update CSS class
    const defaultInputClass = CustomSlider.defaultAttributes['input-class'];
    valueDisplay.classList = []; // Clear class list
    valueDisplay.classList.add(defaultInputClass); // Use default class

    // Pass class attribute into the component
    if (this.hasAttribute('slider-class')) {
      slider.setAttribute('class', this.getAttribute('slider-class'));
    }
    if (this.hasAttribute('input-class')) {
      valueDisplay.setAttribute('class', this.getAttribute('input-class'));
    }
  }

  /**
   * When value of the slider changed
   * @param {Integer} value
   */
  onValueChange(value) {
    const shadow = this.shadowRoot;
    const slider = shadow.querySelector('input');
    const valueDisplay = shadow.querySelector('#valueDisplay');
    // Update display value
    valueDisplay.innerHTML = slider.value;
    // Notify onchange
    if (this.hasAttribute('onchange')) {
      const callbackName = this.getAttribute('onchange');
      const cb = window[callbackName];
      if (typeof cb === 'function') {
        cb(slider.value);
      }
    }
  }

  /**
   * Component attached on DOM
   */
  connectedCallback() {
    this.updateStyle();
  }

  /**
   * Called on attribute change
   * @param {string} attr the attribute changed
   * @param {string} oldValue the old value of the attribute
   * @param {string} newValue the new value of the attribute
   */
  attributeChangedCallback(attr, oldValue, newValue) {
    this.updateStyle();
  }
}

CustomSlider.template = document.createElement('template');
customElements.define('custom-slider', CustomSlider);

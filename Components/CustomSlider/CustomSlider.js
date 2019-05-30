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

    CustomSlider.template.innerHTML = `
      <link rel="stylesheet" href="./CustomSlider.css"/>
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
      'size': '15px',
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
      'size',
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

    // Update size by CSS class
    const defaultInputClass = CustomSlider.defaultAttributes['input-class'];
    valueDisplay.classList = []; // Clear class list
    if (this.hasAttribute('size')) {
      switch (this.getAttribute('size')) {
        case 'small':
          valueDisplay.classList.add('small-input');
          break;
        case 'medium':
          valueDisplay.classList.add('medium-input');
          break;
        case 'large':
          valueDisplay.classList.add('large-input');
          break;
        default:
          valueDisplay.classList.add(defaultInputClass);
          break;
      }
    } else {
      valueDisplay.classList.add(defaultInputClass);
    }

    // Pass class attribute into the component
    if (this.hasAttribute('slider-class')) {
      slider.setAttribute('slider-class', this.getAttribute('slider-class'));
    }
    if (this.hasAttribute('input-class')) {
      valueDisplay.setAttribute('input-class',
          this.getAttribute('input-class'));
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

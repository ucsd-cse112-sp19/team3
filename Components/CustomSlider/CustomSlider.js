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
    `;

    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /**
   * Default attributes values
   */
  static get defaultAttributes() {
    return {
      'value': 0,
      'min': 0,
      'max': 100,
      'class': 'small',
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
      'class',
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

    // Pass class attribute into the component
    if (this.hasAttribute('class')) {
      slider.setAttribute('class', this.getAttribute('class'));
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

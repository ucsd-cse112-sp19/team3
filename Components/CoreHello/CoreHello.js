'use strict';


/**
 * @class CoreHello
 * @summary class of CoreHello component, a starter of customized web components
 * *See [CoreHello Demo]{@link https://ucsd-cse112.github.io/team3/demopages/CoreHello.html} for all listing examples.*
 * ### Usage
 * ```
 * <core-hello property="value">
 *     Display Text
 * </core-hello>
 * ```
 * @property {string} style - 
 * @property {string} class - 
 * @property {string} lang - language of display, default is English, other options: `jp, es, fr`
 * @property {boolean} rainbow - enable rainbow color effect
 * 
 * @example <core-hello lang="es" rainbow>
 *     Peter
 * </core-hello>
 */
class CoreHello extends HTMLElement {
  
  constructor() {
    super();

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    CoreHello.template = document.createElement('template');
    const templateContent = CoreHello.template.content;

    // component skeleton - fleshed out by callback functions
    // and updateStyle()
    CoreHello.template.innerHTML = `
      <style>
      </style>
      <div><greeting>Hello World </greeting><slot></slot></div>`;

    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /**
   * List of attributes supported by the component.
   * Component listens for changes to these attributes
   * and handles it using attributeChangedCallback().
   */
  static get observedAttributes() {
    return [
      'style',
      'class',
      'lang',
      'rainbow',
    ];
  }

  /** Called when element rendered in DOM */
  connectedCallback() {
    console.log('core-hello rendered in DOM');
  }

  /** Called when element destroyed */
  disconnectedCallback() {
    console.log('core-hello removed from DOM');
  }

  /**
    * Handles attribute changes on the fly.
    * @param {string} attr - The attribute changed
    * @param {string} oldValue - The value before change
    * @param {string} newValue - The value after change
    */
  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('core-hello attribute ' + attr + ' changed');
    if (attr === 'lang') {
      // Set greeting
      let greeting = '';
      switch (newValue) {
        case 'jp':
          greeting = 'Kon\'nichiwa seka';
          break;
        case 'es':
          greeting = 'Hola Mundo';
          break;
        case 'fr':
          greeting = 'Bonjour le monde';
          break;
        default:
          greeting = 'Hello World';
      }
      const shadow = this.shadowRoot;
      shadow.querySelector('greeting').textContent = greeting + ' ';
    } else {
      this.updateStyle();
    }
  }

  /** Updates style based on set attributes */
  updateStyle() {
    console.log('core-hello calling updateStyle()');
    const shadow = this.shadowRoot;

    const div = shadow.querySelector('div');
    if (this.hasAttribute('class')) {
      div.setAttribute('class', this.getAttribute('class'));
    }
    shadow.querySelector('style').textContent = `
      div { /* greeting styles, always included */
        font-size: 100px;
        font-family: 'Franklin Gothic Medium',
        'Arial Narrow', Arial, sans-serif;
      }
      .rainbow {
        animation: rainbow 2.5s linear;
        animation-iteration-count: infinite;
      }

      @keyframes rainbow {
        100%,
        0% {
      color: rgb(255, 0, 0);
        }

        8% {
      color: rgb(255, 127, 0);
        }

        16% {
      color: rgb(255, 255, 0);
        }

        25% {
      color: rgb(127, 255, 0);
        }

        33% {
      color: rgb(0, 255, 0);
        }

        41% {
      color: rgb(0, 255, 127);
        }

        50% {
      color: rgb(0, 255, 255);
        }

        58% {
      color: rgb(0, 127, 255);
        }

        66% {
      color: rgb(0, 0, 255);
        }

        75% {
      color: rgb(127, 0, 255);
        }

        83% {
      color: rgb(255, 0, 255);
        }

        91% {
      color: rgb(255, 0, 127);
        }
      }
    `;

    // Set rainbow style
    if (this.hasAttribute('rainbow')) {
      div.setAttribute('class', 'rainbow');
    } else {
      div.setAttribute('class', '');
    }
  }
}

CoreHello.template = document.createElement('template');
customElements.define('core-hello', CoreHello);

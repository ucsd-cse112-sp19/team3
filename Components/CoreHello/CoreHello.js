'use strict';

/** Class for Core Hello component */
class CoreHello extends HTMLElement {
  /** Constructor of the class */
  constructor() {
    super();

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    CoreHello.template = document.createElement('template');
    const templateContent = CoreHello.template.content;

    // Create greeting
    let greeting = 'Hello World';
    const lang = this.getAttribute('lang');
    if (lang === 'jp') {
      greeting = 'Kon\'nichiwa sekai';
    } else if (lang === 'es') {
      greeting = 'Hola Mundo';
    } else if (lang === 'fr') {
      greeting = 'Bonjour le monde';
    }
    CoreHello.template.innerHTML = greeting + ` <slot></slot>`;


    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /** Element attached on DOM */
  connectedCallback() {
    // code
  }
}

CoreHello.template = document.createElement('template');

customElements.define('core-hello', CoreHello);

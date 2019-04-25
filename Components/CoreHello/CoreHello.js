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

    // Set greeting
    let greeting = 'Hello World';
    const lang = this.getAttribute('lang');
    if (lang === 'jp') {
      greeting = 'Kon\'nichiwa sekai';
    } else if (lang === 'es') {
      greeting = 'Hola Mundo';
    } else if (lang === 'fr') {
      greeting = 'Bonjour le monde';
    }

    // Set CSS
    const isRainbow = this.getAttribute('rainbow') === '';
    let styling = `<div class="greeting">`;
    if (isRainbow) {
      styling = `<div class="rainbow greeting">`;
    }

    CoreHello.template.innerHTML = `<style>@import 'CoreHello.css'</style>` +
    styling + greeting + ` <slot></slot>`;


    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /** Element attached on DOM */
  connectedCallback() {
    // code
  }
}

CoreHello.template = document.createElement('template');

customElements.define('core-hello', CoreHello);

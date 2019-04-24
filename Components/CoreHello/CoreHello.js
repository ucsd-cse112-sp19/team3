'use strict';

/** Class for Core Hello component */
class CoreHello extends HTMLElement {
  /** Constructor of the class */
  constructor() {
    super();
    // Retrieve template content
    const templateContent = CoreHello.template.content;
    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /** Element attached on DOM */
  connectedCallback() {
    // code
  }
}

CoreHello.template = document.createElement('template');
CoreHello.template.innerHTML = `
<style>
</style>
Hello World <slot></slot>
`;

customElements.define('core-hello', CoreHello);

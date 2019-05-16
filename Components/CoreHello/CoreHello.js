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

    // Import CSS
    const importStyle = `<style>.greeting {
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
                }</style>`;

    // Set CSS
    const isRainbow = this.hasAttribute('rainbow');
    let styling = `<div class="greeting">`;
    if (isRainbow) {
      styling = `<div class="rainbow greeting">`;
    }

    CoreHello.template.innerHTML = importStyle +
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

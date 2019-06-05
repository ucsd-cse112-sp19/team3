'use strict';


/** 
 * @class CoreHello
 * 
 * @summary class of CoreHello component, a starter of customized web components
 * 
 * *See [CoreHello Demo]{@link https://ucsd-cse112.github.io/team3/demopages/CoreHello.html} for all listing examples.*
 * 
 * ### Usage
 * ```
 * <core-hello property="value"> YourName </core-hello>
 * ```
 * 
 * @property {string} lang - display language, options: `jp, es, fr`
 * @property {boolean} rainbow - enable rainbow
 * 
 * @example <core-hello lang="es" rainbow> Peter </core-hello>
 * 
 * @todo fix the property table
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

  static get observedAttributes() {
    return [
      'style',
      'class',
      'lang',
      'rainbow'
    ];
  }

  /* Element attached on DOM */
  connectedCallback() {
    console.log('core-hello rendered in DOM')
  }

  disconnectedCallback() {
    console.log('core-hello removed from DOM')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('core-hello attribute ' + attr + ' changed')
    if(attr === 'lang') {
      // Set greeting
      var greeting = ''
      switch (newValue) {
        case 'jp':
          greeting = 'Kon\'nichiwa seka'
          break
        case 'es':
          greeting = 'Hola Mundo'
          break
        case 'fr':
          greeting = 'Bonjour le monde'
          break
        default:
          greeting = 'Hello World'
      }
      const shadow = this.shadowRoot
      shadow.querySelector('greeting').textContent = greeting + ' '
    } else {
      this.updateStyle()
    }
  }

  updateStyle() {
    console.log('core-hello calling updateStyle()')
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
    `

    // Set rainbow style
    if (this.hasAttribute('rainbow')) {
      div.setAttribute('class', 'rainbow')
    } else {
      div.setAttribute('class', '')
    }
  }

  static get observedAttributes() {
    return [
      'style',
      'class',
      'lang',
      'rainbow'
    ];
  }

  /* Element attached on DOM */
  connectedCallback() {
    console.log('core-hello rendered in DOM')
  }

  disconnectedCallback() {
    console.log('core-hello removed from DOM')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('core-hello attribute ' + attr + ' changed')
    if (attr === 'lang') {
      var greeting = ''
      switch (newValue) {
        case 'jp':
          greeting = 'Kon\'nichiwa seka'
          break
        case 'es':
          greeting = 'Hola Mundo'
          break
        case 'fr':
          greeting = 'Bonjour le monde'
          break
        default:
          greeting = 'Hello World'
      }
      const shadow = this.shadowRoot
      shadow.querySelector('greeting').textContent = greeting + ' '
    } else {
      this.updateStyle()
    }
  }

  updateStyle() {
    console.log('core-hello calling updateStyle()')
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
    `

    // Set rainbow style
    if (this.hasAttribute('rainbow')) {
      div.setAttribute('class', 'rainbow')
    } else {
      div.setAttribute('class', '')
    }
  }
}

CoreHello.template = document.createElement('template');
customElements.define('core-hello', CoreHello);

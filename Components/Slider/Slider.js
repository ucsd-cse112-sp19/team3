'use strict';

/** Class for Core Hello component */
class Slider extends HTMLElement {
  /** Constructor of the class */
  constructor() {
    super();

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    Slider.template = document.createElement('slider_template');
    const templateContent = Slider.template.content;

    // Import CSS
    const importStyle = `<style>
        .slidecontainer {
        width: 100%;
        }
        
        .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 10px;
        border-radius: 5px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        }
        
        .slider:hover {
        opacity: 1;
        }
        
        .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 23px;
        height: 24px;
        border: 0;
        background: url('contrasticon.png');
        cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
        width: 23px;
        height: 24px;
        border: 0;
        background: url('contrasticon.png');
        cursor: pointer;
        }
        </style>`;

    // Set CSS

    Slider.template.innerHTML = importStyle +
    `<div class="slidecontainer">`+ ` <slot></slot>`;


    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /** Element attached on DOM */
  connectedCallback() {
    // code
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;
    slider.oninput = function() {
    output.innerHTML = this.value;
    }
  }
}

Slider.template = document.createElement('slider_template');
customElements.define('slider', Slider);
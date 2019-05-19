'use strict';

/** Class for Custom Button component */
class CustomButton extends HTMLElement {
  /** Constructor of the class */
  constructor() {
    super()

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'})
    CustomButton.template = document.createElement('template')
    const templateContent = CustomButton.template.content

    // default style; user styling performed by updateStyle() below
    CustomButton.template.innerHTML = `
        <style>
        </style>
        <button><slot></slot></button>
    `
    shadowRoot.appendChild(templateContent.cloneNode(true))

    // addEventListener("click", this._onClick) (google way to add event listener)
  }

  /** Called when element rendered in DOM */
  connectedCallback() {
    console.log('Rendered custom-button')
    updateStyle(this)
  }

}

// Updates the style by taking user attributes, including 'style' and our own
// API of special attributes, and passing them to the CSS for the button.
// If the user styles an attribute (e.g. font color) using both direct CSS
// and our custom attribute (text-color), it will prioritize the custom attribute.
function updateStyle(elem) {
    console.log('Updating custom-button styles')    

    const shadow = elem.shadowRoot

    shadow.querySelector('style').textContent += `
        button {
            ${elem.getAttribute('style')};
            color: ${elem.getAttribute('text-color')}
        }
    `
}
      
CustomButton.template = document.createElement('template')
customElements.define('custom-button', CustomButton)

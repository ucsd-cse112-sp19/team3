'use strict'

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
                /* custom CSS variables to distinguish certain values */
                :host {
                    --active-text-color: #000000;
                    --active-background-color: #cccccc;
                    --active-border-color: #000000;
                    --hover-text-color: #000000;
                    --hover-background-color: #bbbbbb;
                    --hover-border-color: #000000;
                }
                /* default button style */
                button {
                    color: #bbbbbb;
                    background-color: #000000;
                    border: solid #bbbbbb;
                    display: block;
                    width: 80px; /* 16:9 ratio */
                    height: 45px;
                    outline: none;
                }
                button:hover {
                    color: var(--hover-text-color);
                    background-color: var(--hover-background-color);
                    border-color: var(--hover-border-color);
                }
                button:active {
                    color: var(--active-text-color);
                    background-color: var(--active-background-color);
                    border-color: var(--active-border-color);
                }
            </style>
            <button><slot></slot></button>
        `
        shadowRoot.appendChild(templateContent.cloneNode(true))
    }

    /* List of attributes supported by the component.
     * Component listens for changes to these attributes\
     * and handles it using attributeChangedCallback(). */
    static get observedAttributes() {
        return [
            'text-color',
            'border-color',
            'font',
            'width',
            'height',
            'active-text-color',
            'active-background-color',
            'active-border-color',
            'hover-text-color',
            'hover-background-color',
            'hover-border-color',
            'rounded',
            'circle',
            'disabled'
        ]
    }

    /* Called when element rendered in DOM */
    connectedCallback() {
        console.log('Rendered custom-button')
        this.updateStyle()
    }

    /* Called when element destroyed */
    disconnectedCallback() {
        console.log('custom-button removed')
    }

    /* Handles attribute changes on the fly.
     * I suspect we don't need parameters, the way we're doing it? */
    attributeChangedCallback(attr, oldValue, newValue) {
        console.log('A custom-button attribute was changed')
        // if we start supporting non-style attributes, 
        // e.g. href, should have an if-else here.
        this.updateStyle()
    }

    /* Getters and setters for observed attributes because WHY NOT */
    get textColor()                { return this.getAttribute('text-color') }
    set textColor(val)             { this.setAttribute('text-color', val) }
    get borderColor()              { return this.getAttribute('border-color') }
    set borderColor(val)           { this.setAttribute('border-color', val) }
    get font()                     { return this.getAttribute('font') }
    set font(val)                  { this.setAttribute('font', val) }
    get width()                    { return this.getAttribute('width') }
    set width(val)                 { this.setAttribute('width', val) }
    get height()                   { return this.getAttribute('height') }
    set height(val)                { this.setAttribute('height', val) }
    get activeTextColor()          { return this.getAttribute('active-text-color') }
    set activeTextColor(val)       { this.setAttribute('active-text-color', val) }
    get activeBackgroundColor()    { return this.getAttribute('active-background-color') }
    set activeBackgroundColor(val) { this.setAttribute('active-background-color', val) }
    get activeBorderColor()        { return this.getAttribute('active-border-color') }
    set activeBorderColor(val)     { this.setAttribute('active-border-color', val) }
    get hoverTextColor()           { return this.getAttribute('hover-text-color') }
    set hoverTextColor(val)        { this.setAttribute('hover-text-color', val) }
    get hoverBackgroundColor()     { return this.getAttribute('hover-background-color') }
    set hoverBackgroundColor(val)  { this.setAttribute('hover-background-color', val) }
    get hoverBorderColor()         { return this.getAttribute('hover-border-color') }
    set hoverBorderColor(val)      { this.setAttribute('hover-border-color', val) }
    get rounded()                  { return this.getAttribute('rounded') }
    set rounded(val)               { this.setAttribute('rounded', val) }
    get circle()                   { return this.getAttribute('circle') }
    set circle(val)                { this.setAttribute('circle', val) }
    get disabled()                 { return this.getAttribute('disabled') }
    set disabled(val)              { this.setAttribute('disabled', val) }

    // Updates the style by taking user attributes, including 'style' and our own
    // API of special attributes, and passing them to the CSS for the button.
    // If the user styles an attribute (e.g. font color) using both direct CSS
    // and our custom attribute (text-color), it will prioritize the custom attribute.
    updateStyle() {
        console.log('Updating custom-button styles')    

        const shadow = this.shadowRoot

        shadow.querySelector('style').textContent += `
            button {
                ${this.getAttribute('style')};
                color: ${this.getAttribute('text-color')};
                border-color: ${this.getAttribute('border-color')};
                font-family: ${this.getAttribute('font')};
                width: ${this.getAttribute('width')};
                height: ${this.getAttribute('height')};
            }
            button:active {
                color: ${this.getAttribute('active-text-color')};
                background-color: ${this.getAttribute('active-background-color')};
                border-color: ${this.getAttribute('active-border-color')};
            }
            button:hover {
                color: ${this.getAttribute('hover-text-color')};
                background-color: ${this.getAttribute('hover-background-color')};
                border-color: ${this.getAttribute('hover-border-color')};
            }
            :host([rounded]) > button {
                border-radius: 100px;
            }
            :host([circle]) > button {
                width: 70px;
                height: 70px;
                border-radius: 100%;
            }
            :host([disabled]) > button {
                cursor: not-allowed;
            }
        `
    }
}
     
CustomButton.template = document.createElement('template')
customElements.define('custom-button', CustomButton)

'use strict'
import Popper from 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'

/** Class for Custom Popover component */
class CustomPopover extends HTMLElement {
    /** Constructor of the class */
    constructor() {
        super()

        // Create shadow DOM and attach template content
        const shadowRoot = this.attachShadow({mode: 'open'})
        CustomPopover.template = document.createElement('template')
        const templateContent = CustomPopover.template.content

        // all styling performed by updateStyle() below
        CustomPopover.template.innerHTML = `
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
            <style></style>
            <div><slot></slot></div>
        `
        shadowRoot.appendChild(templateContent.cloneNode(true))
    }

    /* List of attributes supported by the component.
     * Component listens for changes to these attributes
     * and handles it using attributeChangedCallback(). */
    static get observedAttributes() {
        return [
            'style',
            'color',
            'text-color',
            'anchor',
            'placement',
            'font',
            'header-text'
        ]
    }

    /* Called when element rendered in DOM */
    connectedCallback() {
        console.log('Rendered custom-popover')
        createPopper()
    }

    /* Called when element destroyed */
    disconnectedCallback() {
        console.log('custom-popover removed')
    }

    /* Handles attribute changes on the fly. */
    attributeChangedCallback(attr, oldValue, newValue) {
        console.log('custom-popover attribute ' + attr + ' was changed')
        this.updateStyle()
    }

    /* Getters and setters for observed attributes because WHY NOT */
    get style()         { return this.getAttribute('style') }
    set style(val)      { this.setAttribute('style', val) }
    get color()         { return this.getAttribute('color') }
    set color(val)      { this.setAttribute('color', val) }
    get textColor()     { return this.getAttribute('text-color') }
    set textColor(val)  { this.setAttribute('text-color', val) }
    get anchor()        { return this.getAttribute('anchor') }
    set anchor(val)     { this.setAttribute('anchor', val) }
    get placement()     { return this.getAttribute('placement') }
    set placement(val)  { this.setAttribute('placement', val) }
    get font()     { return this.getAttribute('font') }
    set font(val)  { this.setAttribute('font', val) }
    get headerText()    { return this.getAttribute('header-text') }
    set headerText(val) { this.setAttribute('header-text', val) }

    // takes the anchor attribute and finds the element with that id
    findAnchor() {
        let anchorID = this.getAttribute('anchor')
        if(!anchorID) {
            console.log('ERROR: component needs an anchor attribute')
            return null
        }
        const anchor = document.getElementById(anchorID)
        if(!anchor) {
            console.log('ERROR: cannot find element by ID: ' + anchorID)
            return null
        }
        return anchor
    }

    // uses Popper.js to create a Popper object and attaches it to the anchor
    createPopper() {
        let anchor = findAnchor()

        
    }

    // Updates the style by taking user attributes, including 'style' and our own
    // API of special attributes, and passing them to the CSS for the popover.
    // If the user styles an attribute (e.g. font color) using both direct CSS
    // and our custom attribute (text-color), it will prioritize the custom attribute.
    updateStyle() {
        console.log('Updating custom-popover styles')    

        const shadow = this.shadowRoot

        // pass class attribute into the component
        const btn = shadow.querySelector('button')
        btn.setAttribute('class', this.getAttribute('class'))

        // provides default styles in case the user doesn't provide one
        shadow.querySelector('style').textContent = `
            :host {
                --color-scheme: ${this.color ? this.color : '#000000'};
                --text-color: ${this.textColor ? this.textColor : '#000000'};
            }
            div {
                ${this.style};
                font-family: ${this.font ? this.font : 'Trebuchet MS'};
            }
        `
    }
}
     
CustomPopover.template = document.createElement('template')
customElements.define('custom-popover', CustomPopover)

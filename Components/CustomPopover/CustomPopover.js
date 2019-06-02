'use strict'

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
    get font()          { return this.getAttribute('font') }
    set font(val)       { this.setAttribute('font', val) }
    get headerText()    { return this.getAttribute('header-text') }
    set headerText(val) { this.setAttribute('header-text', val) }

    // takes the anchor attribute and finds the element with that id
    findAnchor() {
        console.log('running findAnchor()')
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

    // calls findAnchor() and attaches it to the popover as well as 
    // setting up properties the anchor should have such as mouseover properties
    attachAnchor() {
        console.log('running attachAnchor()')
        let anchor = this.findAnchor()

        // this gets injected in the style of the anchor element
        var anchorCSS = '; position: relative; display: inline-block;'
        anchor.setAttribute('style', anchor.getAttribute('style') + anchorCSS)

        // this is hacky as hell but it works
        let shadow = this.shadowRoot
        anchor.onmouseover = function() {
            shadow.querySelector('style').textContent += 'div {visibility: visible;}'
        }
        anchor.onmouseout = function() {
            shadow.querySelector('style').textContent += 'div {visibility: hidden;}'
        }

        this.updateStyle()
    }

    /* Called when element rendered in DOM */
    connectedCallback() {
        console.log('Rendering custom-popover')
        this.attachAnchor()
        this.updateStyle()
        console.log('Rendering custom-popover complete')
    }

    /* Called when element destroyed */
    disconnectedCallback() {
        console.log('custom-popover removed')
    }

    /* Handles attribute changes on the fly. */
    attributeChangedCallback(attr, oldValue, newValue) {
        console.log('custom-popover attribute ' + attr + ' was changed')
        if (attr === 'anchor')
            this.attachAnchor()
        else
            this.updateStyle()
    }

    // Updates the style by taking user attributes, including 'style' and our own
    // API of special attributes, and passing them to the CSS for the popover.
    // If the user styles an attribute (e.g. font color) using both direct CSS
    // and our custom attribute (text-color), it will prioritize the custom attribute.
    updateStyle() {
        console.log('Updating custom-popover styles')    

        const shadow = this.shadowRoot

        // pass class attribute into the component
        const div = shadow.querySelector('div')
        div.setAttribute('class', this.getAttribute('class'))

        // provides default styles in case the user doesn't provide one
        shadow.querySelector('style').textContent = `
            :host {
                --color-scheme: ${this.color ? this.color : '#45b9e8'};
                --text-color: ${this.textColor ? this.textColor : '#ffffff'};
            }
            div {
                background-color: var(--color-scheme);
                color: var(--text-color);
                font-family: ${this.font ? this.font : 'Lucida Console'};    
                position: relative;
                display: inline-block;

                visibility: hidden;
                width: 120px;

                text-align: center;
                border: solid 1px;
                border-radius: 6px;
                padding: 6px 6px;

                position: absolute;
                z-index: 1;
            }
        `
        switch (this.placement) {
            case 'top':
                break
            case 'bottom':
                break
            case 'left':
                break
            case 'right':
                break
            default:
        }
        shadow.querySelector('style').textContent += `
        `
    }
}
     
CustomPopover.template = document.createElement('template')
customElements.define('custom-popover', CustomPopover)

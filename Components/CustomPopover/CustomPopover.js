'use strict'

/** 
 * @description Popover Web Component
 * @example <custom-popover anchor='btn-exe' color='blue' font='arial' header-text='example' placement='top' style='' textcolor='black'></custom-popover>
 * @property {string} anchor Name of the button to which the popover is anchored.
 * @property {string} color -Set the background color. 
 * @property {string} font -Set the font type.
 * @property {string} header-text -Set the text content.
 * @property {string} placement -Place popover on the button's top, bottom, left, or right.
 * @property {string} style -Set a CSS style. 
 * @property {string} textcolor -Set the text color. 
 * 
 */
class CustomPopover extends HTMLElement {
    /**
     * @hideconstructor
     */
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
            <style>
            </style>
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
    get class()         { return this.getAttribute('class') }
    set class(val)      { this.setAttribute('class', val) }
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

        // account for bootstrap in the arrow colors
        var arrowColor = null
        switch(this.class) {
            case 'btn-primary':
                arrowColor = '#007bff'
                break
            case 'btn-secondary':
                arrowColor = '#868e96'
                break
            case 'btn-success':
                arrowColor = '#28a745'
                break
            case 'btn-info':
                arrowColor = '#17a2b8'
                break
            case 'btn-warning':
                arrowColor = '#ffc107'
                break
            case 'btn-danger':
                arrowColor = '#dc3545'
                break
            case 'btn-dark':
                arrowColor = '#343a40'
                break
        }

        // provides default styles in case the user doesn't provide one
        shadow.querySelector('style').textContent = `
            :host {
                --color-scheme: ${this.color ? this.color : '#45b9e8'};
                --text-color: ${this.textColor ? this.textColor : '#ffffff'};
                --arrow-color: ${arrowColor ? arrowColor : 'var(--color-scheme)'};
                outline: none;
            }
            div {
                background-color: var(--color-scheme);
                color: var(--text-color);
                font-family: ${this.font ? this.font : 'Lucida Console'};    
                display: inline-block;

                outline: none;
                visibility: hidden;
                width: 120px;

                text-align: center;
                border: solid 0px;
                border-radius: 6px;
                padding: 6px 6px;
                left: 110%;
                top: 0%;

                position: absolute;
                z-index: 1;
            }
            :host > div:focus {
                outline: none;
            }
            div:focus, button:focus, div:active, button:active {
                outline: none;
            }
        `

        var newCSS = ''
        switch (this.placement) {
            case 'top':
                newCSS = `
                    div {
                        top: -110%;
                        left: -15px; 
                        height: 45px;
                    }
                    div::after {
                        content: " ";
                        position: absolute;
                        top: 100%; /* At the bottom of the tooltip */
                        left: 50%;
                        margin-left: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: var(--arrow-color) transparent transparent transparent;
                    }
                `
                break
            case 'bottom':
                newCSS = `
                    div {
                        top: 115%;
                        left: -15px;
                    }
                    div::after {
                        content: " ";
                        position: absolute;
                        bottom: 100%;  /* At the top of the tooltip */
                        left: 50%;
                        margin-left: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent transparent var(--arrow-color) transparent;
                    }
                `
                break
            case 'left':
                newCSS = `
                    div {
                        left: -142%;
                        top: 0%;
                    }
                    div::after {
                        content: " ";
                        position: absolute;
                        top: 50%;
                        left: 100%; /* To the right of the tooltip */
                        margin-top: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent transparent transparent var(--arrow-color);
                    }
                `
                break
            default: // right by default
                newCSS = `
                    div {
                        left: 110%;
                        top: 0%;
                    }
                    div::after {
                        content: " ";
                        position: absolute;
                        top: 50%;
                        right: 100%; /* To the left of the tooltip */
                        margin-top: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent var(--arrow-color) transparent transparent;
                    }
                `
        }
        shadow.querySelector('style').textContent += newCSS
    }
}
     
CustomPopover.template = document.createElement('template')
customElements.define('custom-popover', CustomPopover)

'use strict';

/**
 * @file CustomPopover
 */
class CustomPopover extends HTMLElement {
  /**
   * @class CustomPopover
   * @classdesc Create a new CustomPopover component with designated styles.
   * @summary
   * ### Usage
   * *See [CustomPopover Demo]{@link https://ucsd-cse112.github.io/team3/demo_components/CustomPopover/CustomPopover.html} for all listing examples.*
   * ```
   * <custom-popover property="value">
   *     Popover Text
   * </custom-popover>
   * ```
   * @property {string} anchor - Id of button to which the popover is anchored.
   * @property {string} color - Set the background color.
   * @property {string} font - Set the font type.
   * @property {string} header-text - Set the text content.
   * @property {string} placement - Direction in which to place popover.
   * @property {string} style - Set a CSS style.
   * @property {string} textcolor - Set the text color.
   *
   * @example
   * <custom-button id='default-btn'>
   *      <custom-popover anchor='default-btn'>
   *          Popover Text
   *      </custom-popover>
   *      Click Me
   * </custom-button>
   *
   * @example
   * <custom-button rounded id="color-btn">
   *      <custom-popover anchor="color-btn" color="hotpink" placement='right'>
   *          Popover Text
   *      </custom-popover>
   *      Click Me
   * </custom-button>
   *
   * @example
   * <custom-button rounded id="font-btn">
   *      <custom-popover anchor="font-btn" color="hotpink"
   *                      placement='right' font="Courier New">
   *          Popover Text
   *      </custom-popover>
   *      Click Me
   * </custom-button>
   *
   * @example
   * <custom-button rounded id="textcolor-btn">
   *      <custom-popover anchor="textcolor-btn" color="hotpink"
   *                      placement='left' text-color="black">
   *          Popover Text
   *      </custom-popover>
   *      Click Me
   * </custom-button>
   *
   * @example
   * <custom-button class="btn-warning" id='btnWarning'>
   *      <custom-popover class='btn-warning' anchor='btnWarning'
   *                      placement='bottom'>
   *          Popover Text
   *      </custom-popover>
   *      Warning
   * </custom-button>
   *
   * @see [CustomPopover Demo]{@link https://ucsd-cse112.github.io/team3/demo_components/CustomPopover/CustomPopover.html} for all listing examples.
   */
  constructor() {
    super();

    // Create shadow DOM and attach template content
    const shadowRoot = this.attachShadow({mode: 'open'});
    CustomPopover.template = document.createElement('template');
    const templateContent = CustomPopover.template.content;

    // all styling performed by updateStyle() below
    CustomPopover.template.innerHTML = `
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
            <style></style>
            <div><slot></slot></div>
        `;
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  /**
   * List of attributes supported by the component.
   * Component listens for changes to these attributes
   * and handles it using attributeChangedCallback().
   */
  static get observedAttributes() {
    return [
      'class', 'style', 'color', 'text-color', 'anchor', 'placement', 'font',
    ];
  }

  /** Getter for style */
  get style() {
    return this.getAttribute('style');
  }
  /** Setter for style
    * @param {string} val - What to set new style to
    */
  set style(val) {
    this.setAttribute('style', val);
  }
  /** Getter for class */
  get class() {
    return this.getAttribute('class');
  }
  /** Setter for class
    * @param {string} val - What to set new class to
    */
  set class(val) {
    this.setAttribute('class', val);
  }
  /** Getter for color */
  get color() {
    return this.getAttribute('color');
  }
  /** Setter for color
    * @param {string} val - What to set new color to
    */
  set color(val) {
    this.setAttribute('color', val);
  }
  /** Getter for text color */
  get textColor() {
    return this.getAttribute('text-color');
  }
  /** Setter for text color
    * @param {string} val - What to set new text color to
    */
  set textColor(val) {
    this.setAttribute('text-color', val);
  }
  /** Getter for anchor */
  get anchor() {
    return this.getAttribute('anchor');
  }
  /** Setter for anchor
    * @param {string} val - What to set new anchor to
    */
  set anchor(val) {
    this.setAttribute('anchor', val);
  }
  /** Getter for placement */
  get placement() {
    return this.getAttribute('placement');
  }
  /** Setter for placement
    * @param {string} val - What to set new placement to
    */
  set placement(val) {
    this.setAttribute('placement', val);
  }
  /** Getter for font */
  get font() {
    return this.getAttribute('font');
  }
  /** Setter for font
    * @param {string} val - What to set new font to
    */
  set font(val) {
    this.setAttribute('font', val);
  }

  /**
    * Takes the anchor attribute and finds the element with that id
    * @return {string} anchor - The anchor id we find
    */
  findAnchor() {
    const anchorID = this.getAttribute('anchor');
    if (!anchorID) {
      console.log('ERROR: component needs an anchor attribute');
      return null;
    }
    const anchor = document.getElementById(anchorID);
    if (!anchor) {
      console.log('ERROR: cannot find element by ID: ' + anchorID);
      return null;
    }
    return anchor;
  }

  /**
    * calls findAnchor() and attaches it to the popover as well as
    * setting up properties the anchor should have such as mouseover properties
    */
  attachAnchor() {
    const anchor = this.findAnchor();

    // this gets injected in the style of the anchor element
    const anchorCSS = '; position: relative; display: inline-block;';
    anchor.setAttribute('style', anchor.getAttribute('style') + anchorCSS);

    const shadow = this.shadowRoot;
    anchor.onmouseover = function() {
      shadow.querySelector('style').textContent += 'div {visibility: visible;}';
    };
    anchor.onmouseout = function() {
      shadow.querySelector('style').textContent += 'div {visibility: hidden;}';
    };
  }

  /** Called when element rendered in DOM */
  connectedCallback() {
    this.updateStyle();
    this.updatePlacement();
  }

  /**
    * Handles attribute changes on the fly.
    * @param {string} attr - The attribute changed
    * @param {string} oldValue - The value before change
    * @param {string} newValue - The value after change
    */
  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('custom-popover attribute ' + attr + ' was changed');
    if (attr === 'anchor') {
      this.attachAnchor();
    } else {
      this.updateStyle();
      this.updatePlacement();
    }
  }

  /**
    * Updates the style by taking user attributes, including 'style' and our own
    * API of special attributes, and passing them to the CSS for the popover.
    * If the user styles an attribute (e.g. font color) using both direct CSS
    * and our custom attribute (text-color), it will prioritize the custom.
    */
  updateStyle() {
    const shadow = this.shadowRoot;

    // pass class attribute into the component
    const div = shadow.querySelector('div');
    div.setAttribute('class', this.getAttribute('class'));

    // provides default styles in case the user doesn't provide one
    shadow.querySelector('style').textContent = `
            :host {
                --color-scheme: ${this.pickColor()};
                --text-color: ${this.textColor ? this.textColor : '#ffffff'};
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
        `;
  }
  /**
   * Select the color scheme for both arrow and background.
   * @return {string} color - The color scheme chosen
   */
  pickColor() {
    // account for bootstrap classes
    let color = null;
    switch (this.class) {
      case 'btn-primary':
        color = '#007bff'; break;
      case 'btn-secondary':
        color = '#868e96'; break;
      case 'btn-success':
        color = '#28a745'; break;
      case 'btn-info':
        color = '#17a2b8'; break;
      case 'btn-warning':
        color = '#ffc107'; break;
      case 'btn-danger':
        color = '#dc3545'; break;
      case 'btn-dark':
        color = '#343a40'; break;
      default:
        color = this.color ? this.color : '#45b9e8';
    }
    return color;
  }
  /**
   * Selects where to place the popover
   */
  updatePlacement() {
    const shadow = this.shadowRoot;
    let newCSS = '';
    switch (this.placement) {
      case 'top':
        newCSS = `
                    div {
                        top: -117%;
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
                        border-color: var(--color-scheme) transparent
                                    transparent transparent;
                    }
                `;
        break;
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
                        border-color: transparent
                                    transparent var(--color-scheme) transparent;
                    }
                `;
        break;
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
                        border-color: transparent transparent
                                transparent var(--color-scheme);
                    }
                `;
        break;
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
                        border-color: transparent var(--color-scheme)
                                transparent transparent;
                    }
                `;
    }
    shadow.querySelector('style').textContent += newCSS;
  }
}

CustomPopover.template = document.createElement('template');
customElements.define('custom-popover', CustomPopover);

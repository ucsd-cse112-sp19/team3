/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable require-jsdoc */
(function() {
  'use strict';

  let selected_ = null;

  /** Class for Core Hello component */
  class SpecsTab extends HTMLElement {
  /** Constructor of the class */
    constructor() {
      super();

      // Create shadow DOM for the component.
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
          <style>
            :host {
              display: inline-block;
              width: 650px;
              font: 16px/1.5em "Overpass", "Open Sans", Helvetica, sans-serif;
              color: #333;
              font-weight: 300;
              contain: content;
            }
            :host([background]) {
              overflow: hidden;
              border: 1px solid #ccc;
              background-color: #f1f1f1;
            }
            #panels {
              box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
              background: white;
              border-radius: 3px;
              padding: 16px;
              height: 150px;
              overflow: auto;
            }
            #tabs {
              display: inline-flex;
              -webkit-user-select: none;
              user-select: none;
              font-family: "Comic Sans MS", cursive, sans-serif;
            }
            #tabs slot {
              display: inline-flex;
            }
            #tabs ::slotted(*) {
              background-color: inherit;
              float: left;
              outline: none;
              cursor: pointer;
              padding: 14px 16px;
              transition: 0.3s;
              border: 0;
            }
            #tabs ::slotted([aria-selected="true"]) {
              font-weight: 700;
              background: white;
              box-shadow: none;
            }
            #tabs ::slotted(:hover) {
              color: #00BFFF;
            }
            #tabs ::slotted(:focus) {
              color: #00BFFF;
              background: white;
              border-style: solid;
            }
            #panels ::slotted([aria-hidden="true"]) {
              display: none;
            }
          </style>
          <div id="tabs">
            <slot id="tabsSlot" name="title"></slot>
          </div>
          <div id="panels">
            <slot id="panelsSlot"></slot>
          </div>
        `;
    }

    get selected() {
      return selected_;
    }
    set selected(idx) {
      selected_ = idx;
      this._selectTab(idx);
      // Updated the element's selected attribute value when
      // backing property changes.
      this.setAttribute('selected', idx);
    }

    connectedCallback() {
      this.setAttribute('role', 'tablist');
      const tabsSlot = this.shadowRoot.querySelector('#tabsSlot');
      const panelsSlot = this.shadowRoot.querySelector('#panelsSlot');
      this.tabs = tabsSlot.assignedNodes({flatten: true});
      this.panels = panelsSlot.assignedNodes({flatten: true}).filter((el) => {
        return el.nodeType === Node.ELEMENT_NODE;
      });

      // Add aria role="tabpanel" to each content panel.
      for (const [, panel] of this.panels.entries()) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', 0);
      }

      // Save refer to we can remove listeners later.
      this._boundOnTitleClick = this._onTitleClick.bind(this);
      this._boundOnKeyDown = this._onKeyDown.bind(this);
      tabsSlot.addEventListener('click', this._boundOnTitleClick);
      tabsSlot.addEventListener('keydown', this._boundOnKeyDown);

      this.selected = this._findFirstSelectedTab() || 0;
    }

    disconnectedCallback() {
      const tabsSlot = this.shadowRoot.querySelector('#tabsSlot');
      tabsSlot.removeEventListener('click', this._boundOnTitleClick);
      tabsSlot.removeEventListener('keydown', this._boundOnKeyDown);
    }

    _onTitleClick(e) {
      if (e.target.slot === 'title') {
        this.selected = this.tabs.indexOf(e.target);
        e.target.focus();
      }
    }

    _onKeyDown(e) {
      switch (e.code) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          var idx = this.selected - 1;
          idx = idx < 0 ? this.tabs.length - 1 : idx;
          this.tabs[idx].click();
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          var idx = this.selected + 1;
          this.tabs[idx % this.tabs.length].click();
          break;
        default:
          break;
      }
    }
    _findFirstSelectedTab() {
      console.log('HERE findfirstselectedtab!');
      let selectedIdx;
      for (const [i, tab] of this.tabs.entries()) {
        tab.setAttribute('role', 'tab');
        // Allow users to declaratively select a tab
        // Highlight last tab which has the selected attribute.
        if (tab.hasAttribute('selected')) {
          selectedIdx = i;
        }
      }
      return selectedIdx;
    }

    _selectTab(idx = null) {
      for (let i = 0, tab; tab = this.tabs[i]; ++i) {
        const select = i === idx;
        tab.setAttribute('tabindex', select ? 0 : -1);
        tab.setAttribute('aria-selected', select);
        this.panels[i].setAttribute('aria-hidden', !select);
      }
    }
  }

  customElements.define('specs-tab', SpecsTab);
})();

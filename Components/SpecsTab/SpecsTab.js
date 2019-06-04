(function() {
  'use strict';

  /* a global value to keep track of which tab is currently selected*/
  let selected_ = null;

  /** 
   * @class SpecsTab
   * 
   * @summary create a new SpecsTab component with designated styles
   */
  class SpecsTab extends HTMLElement {

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
              height: 100px;
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
              color: #00BFFF;
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

    /*
     * A getter of which index of tab we select.
     * @return {int} The selected index of tabs.
     */
    get selected() {
      return selected_;
    }

    /*
     * A setter of what we select
     * @param{int} index of tabs we select
     */
    set selected(index) {
      selected_ = index;
      this._selectTab(index);
      this.setAttribute('selected', index);
    }

    //Callback after we successfully connect the component
    connectedCallback() {
      // Automatically differentiate tab and panel
      this.setAttribute('role', 'tablist');

      console.log(this);

      const tabsSlot = this.shadowRoot.querySelector('#tabsSlot');
      const panelsSlot = this.shadowRoot.querySelector('#panelsSlot');
      this.tabs = tabsSlot.assignedNodes({flatten: true});
      this.panels = panelsSlot.assignedNodes({flatten: true}).filter((el) => {
        return el.nodeType === Node.ELEMENT_NODE;
      });

      console.log(this);

      // Add aria role="tabpanel" to each content panel.
      for (const [, panel] of this.panels.entries()) {
        console.log(panel);
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', 0);
      }

      // Save refer to we can remove listeners later.
      this._boundOnTitleClick = this._onTitleClick.bind(this);
      tabsSlot.addEventListener('click', this._boundOnTitleClick);

      // If user doesn't select any tab, default to index 0 one as selected
      this.selected = this._findFirstSelectedTab() || 0;
    }

    /*
     * A listener that gets invoked when we click title
     * @param{e} e is passed in in case of an exception
     */
    _onTitleClick(e) {
      console.log('on title click');
      if (e.target.slot === 'title') {
        this.selected = this.tabs.indexOf(e.target);
        e.target.focus();
      }
    }

    /*
     * A getter of what we select.
     * @return{int} selectedIdx
     */
    _findFirstSelectedTab() {
      console.log('find first selected tab!');
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

    /*
     * A listener that keeps track of which tab is currently selected
     * @param{int} idx of tabs we select
     */
    _selectTab(idx = null) {
      console.log('select tab');
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

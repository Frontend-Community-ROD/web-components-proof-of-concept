class MyCustomComponentElement extends HTMLElement {
    static get observedAttributes() {
        return ["text"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.setStyleTag("./my-custom-component.css");
    }

    // #region Life cycle callbacks
    connectedCallback() {
        console.log("on mount callback");
    }

    disconnectedCallback() {
        console.log("on unmount callback");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}`);
        this.handleTextChange();
        // this.handleTextChangeWithTemplate();
    }
    // #endregion

    // #region Helpers
    /**
     * Handles the text attribute change
     */
    handleTextChange() {
        const text = this.getAttribute("text");
        const h1 = document.createElement("h1");

        h1.textContent = text;
        this.innerHTML = "";

        (this.shadowRoot ?? this).append(h1);
    }

    /**
     * Handles the text attribute change using a template
     */
    handleTextChangeWithTemplate() {
        const template = document.querySelector("#title-template");
        const h1 = template.content.children[0];
        const text = this.getAttribute("text");

        h1.textContent = text;
        this.innerHTML = "";

        (this.shadowRoot ?? this).append(h1);
    }

    /**
     * Sets the style tag containing the slider styles
     * @param {string} url The stylesheet URL
     */
    setStyleTag(url) {
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", url);

        (this.shadowRoot ?? this).append(linkElem);
    }
    // #endregion
}

customElements.define("my-custom-component", MyCustomComponentElement);

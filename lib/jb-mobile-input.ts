import HTML from './jb-mobile-input.html';
import CSS from './jb-mobile-input.scss';
import 'jb-input';
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent } from 'jb-input';
import { JBMobileInputElements, JBMobileInputValidationResult, StandardedValueResponse } from './Types';
import { ChangeEvent } from 'react';

/**
 * @readonly
 * @enum {string} 
 */
export enum InputTypes {
    CardNumber = 'CARD_NUMBER',
    ShabaNumber = 'SHABA_NUMBER',
}
//check validation for mobile number itself
const regex = /^09[0-9]{2} [0-9]{7}$/g;
const mobileValidation = {
    validator: regex,
    message: "شماره موبایل معتبر نیست",
};

export class JBMobileInputWebComponent extends HTMLElement {
    internals_: ElementInternals | null = null;
    #disabled = false;
    static get formAssociated() { return true; }
    #value = '';
    #intentWaitingValue: string | null = null;
    elements!: JBMobileInputElements;
    inputType?: InputTypes;
    validation: JBMobileInputValidationResult = {
        isValid: null,
        message: null
    }
    get value() {
        return this.#value;
    }
    set value(value) {
        const { unformattedValue, formattedValue } = this.standardValue(value);
        if (this.inputType === null) {
            this.#intentWaitingValue = value;
        }
        if (this.#value !== unformattedValue) {

            this.#value = unformattedValue;
            this.elements.input.value = formattedValue;


        }
    }
    #validationList = [];
    get validationList() {
        return this.#validationList;
    }
    set validationList(value) {
        if (Array.isArray(value)) {
            this.elements.input.validationList = [...value,mobileValidation];
            this.#validationList = value;
        }
    }
    constructor() {
        super();
        if (typeof this.attachInternals == "function") {
            //some browser dont support attachInternals
            this.internals_ = this.attachInternals();
        }
        this.initWebComponent();
    }
    connectedCallback() {
        // standard web component event that called when all of dom is binded
        this.callOnLoadEvent();
        this.initProp();
        this.callOnInitEvent();

    }
    callOnLoadEvent() {
        const event = new CustomEvent('load', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    callOnInitEvent() {
        const event = new CustomEvent('init', { bubbles: true, composed: true });
        this.dispatchEvent(event);
    }
    initWebComponent() {
        const shadowRoot = this.attachShadow({
            mode: 'open',
            delegatesFocus: true,
        });
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            input: shadowRoot.querySelector('jb-input')! as JBInputWebComponent,
        };
        this.validationList = [];
        this.registerEventListener();
    }
    /**
     * 
     * @param {string} rawText 
     * @return {string} standarded text
     */
    getUnformattedValue(rawText: string): string {
        //convert perian number to en number and replace space
        const sText = rawText.replace(/\s/g, '')
            .replace(/\u06F0/g, '0').replace(/\u06F1/g, '1').replace(/\u06F2/g, '2').replace(/\u06F3/g, '3').replace(/\u06F4/g, '4').replace(/\u06F5/g, '5').replace(/\u06F6/g, '6').replace(/\u06F7/g, '7').replace(/\u06F8/g, '8').replace(/\u06F9/g, '9')
            .replace(/[^0-9]/g, '');
        //opCode = operator code
        const seprator = /(?<opCode>(09|0|9)?)(?<number>.{0,})/g.exec(sText);
        if (seprator && seprator.groups) {
            let numberPart = seprator.groups.number;
            numberPart = numberPart.substring(0, 9);
            //manage opCode part
            let opCodePart: string;
            if (seprator.groups.opCode) {
                if (seprator.groups.opCode === "9") {
                    opCodePart = "09";
                } else {
                    opCodePart = seprator.groups.opCode;
                }
            } else {
                // if user input some number without ir part we add it ourselves
                if (numberPart.length > 0) {
                    opCodePart = '09';
                } else {
                    //if user input no ir part and no valid number part we return empty string
                    return '';
                }
            }
            if (opCodePart.length == 1) {
                return opCodePart;
            }

            return opCodePart + numberPart;
        } else {
            return '';
        }
        return sText;
    }
    /**
     * this function will get user inputed or pasted text and convert it to standard one base on developer config
     * @param {String} valueString 
     * @return {{formattedValue: String, unformattedValue: String}} standard value
     */
    standardValue(valueString: string): StandardedValueResponse {
        let formattedValue = '';
        let unformattedValue = '';

        unformattedValue = this.getUnformattedValue(valueString);
        const matches = /(09[0-9]{0,2})([0-9]{0,7})/g.exec(unformattedValue);
        if (matches && matches.length > 0) {
            formattedValue = matches.slice(1).filter(x => x !== '').join(' ');
        } else {
            formattedValue = unformattedValue;
        }
        return { unformattedValue, formattedValue };
    }
    registerEventListener() {
        this.elements.input.addEventListener('change', (e) => this.onInputChange(e as unknown as ChangeEvent));
        this.elements.input.addEventListener('keypress', (e) => this.onInputKeyPress(e));
        this.elements.input.addEventListener('keyup', (e) => this.onInputKeyup(e));
        this.elements.input.addEventListener('keydown', (e) => this.onInputKeyDown(e));
        this.elements.input.addEventListener('input', (e) => this.onInputInput(e as unknown as InputEvent));
        this.elements.input.addEventListener('beforeinput', (e) => this.onInputBeforeInput(e));
    }
    initProp() {
        this.#disabled = false;
        this.inputType = this.getAttribute('input-type') as InputTypes;
        this.value = this.getAttribute('value') || '';
    }
    static get observedAttributes() {
        return ['label', 'input-type', 'message', 'value', 'name', 'autocomplete', 'placeholder', 'disabled', 'inputmode'];
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name: string, value: string) {
        switch (name) {
            case 'label':
                this.elements.input.setAttribute('label', value);
                break;
            case 'input-type':
                if (Object.values(InputTypes).includes(value as InputTypes)) {
                    this.inputType = value as InputTypes;
                    if (this.#intentWaitingValue !== null) {
                        this.value = this.#intentWaitingValue;
                        this.#intentWaitingValue = null;
                    }
                }
                //shaba or card number
                break;
            case 'message':
                this.elements.input.setAttribute('message', value);
                break;
            case 'value':
                this.value = value;
                break;
            case 'name':
                this.elements.input.setAttribute('name', value);
                break;
            case 'autocomplete':
                this.elements.input.setAttribute('autocomplete', value);
                break;
            case 'placeholder':
                this.elements.input.setAttribute('placeholder', value);
                break;
            case 'disabled':

                if (value === '' || value === "true") {
                    this.#disabled = true;
                    this.elements.input.setAttribute('disabled', 'true');
                } else if (value == "false" || value === 'undefined' || value === 'null') {
                    this.#disabled = false;
                    this.elements.input.removeAttribute('disabled');
                }
                break;
            case 'inputmode':
                this.elements.input.setAttribute("inputmode", value);

        }

    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onInputKeyDown(e: KeyboardEvent) {
        //trigger componnet event
        const keyDownnInitObj = {
            key: e.key,
            keyCode: e.keyCode,
            code: e.code,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            charCode: e.charCode,
            which: e.which
        };
        const event = new KeyboardEvent("keydown", keyDownnInitObj);
        this.dispatchEvent(event);
    }
    /**
     * 
     * @param {InputEvent} e 
     */
    onInputInput(e: InputEvent) {
        const inputedText = (e.target as JBInputWebComponent).value;
        const sVal = this.standardValue(inputedText);
        this.#value = sVal.unformattedValue;
        this.elements.input.value = sVal.formattedValue;
        this.dispatchInputEvent(e);
    }
    dispatchInputEvent(e) {
        const eventInitDict = {
            bubbles: e.bubbles,
            cancelable: e.cancelable,
            composed: e.composed,
            data: e.data,
            isComposing: e.isComposing,
            inputType: e.inputType,
            dataTransfer: e.dataTransfer,
            view: e.view,
            detail: e.detail,
            key: e.key,
        };
        const event = new InputEvent('input', eventInitDict);
        this.dispatchEvent(event);
    }
    /**
    * 
    * @param {InputEvent} e
    */
    onInputBeforeInput(e: InputEvent) {
        const inputedText = e.data;
        this.dispatchBeforeInputEvent(e);
    }
    dispatchBeforeInputEvent(e) {
        const eventInitDict = {
            bubbles: e.bubbles,
            cancelable: e.cancelable,
            composed: e.composed,
            data: e.data,
            isComposing: e.isComposing,
            inputType: e.inputType,
            dataTransfer: e.dataTransfer,
            view: e.view,
            detail: e.detail,
            key: e.key,
        };
        const event = new InputEvent('beforeinput', eventInitDict);
        this.dispatchEvent(event);
    }
    onInputKeyPress(e: KeyboardEvent) {
        //TODO: raise keypress event
        const event = new CustomEvent('keypress');
        this.dispatchEvent(event);
    }
    onInputKeyup(e) {
        this.triggerInputValidation(false);
        const keyUpInitObj = {
            key: e.key,
            keyCode: e.keyCode,
            code: e.code,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            charCode: e.charCode,
            which: e.which,
        };
        const event = new KeyboardEvent('keyup', keyUpInitObj);
        this.dispatchEvent(event);
        if (e.keyCode == 13) {
            this.onInputEnter();
        }
    }
    onInputEnter() {
        const event = new CustomEvent('enter');
        this.dispatchEvent(event);
    }
    onInputChange(e: ChangeEvent) {
        this.triggerInputValidation(true);
        //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
        this.dispatchOnChangeEvent(e);
    }
    dispatchOnChangeEvent(e: ChangeEvent) {
        const validationObject = this.elements.input.checkInputValidation(this.value);
        const event = new CustomEvent('change', {
            detail: {
                isValid: validationObject.isAllValid,
                validationObject: validationObject,
            },
        });
        this.dispatchEvent(event);
    }
    triggerInputValidation(showError = true) {
        //do user custom validation
        return this.elements.input.triggerInputValidation(showError);
    }
    /**
     * @public
     */
    focus() {
        //public method
        this.elements.input.focus();
    }
}
const myElementNotExists = !customElements.get('jb-mobile-input');
if (myElementNotExists) {
    window.customElements.define('jb-mobile-input', JBMobileInputWebComponent);
}

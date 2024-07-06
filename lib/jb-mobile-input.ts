import CSS from "./jb-mobile-input.scss";
import "jb-input";
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent} from "jb-input";
import { JBInputValue, ValidationValue} from "jb-input/lib/types";
//TODO: update it when you move validation to core package
import { WithValidation, ValidationItem } from "jb-input/dist/common/scripts/validation/validation-helper-types";

export class JBMobileInputWebComponent extends JBInputWebComponent implements WithValidation<ValidationValue> {
  constructor() {
    super();
    //to prevent initWebComponent  method override
    this.initMobileInputWebComponent();
  }
  initMobileInputWebComponent() {
    const html = `<style>${CSS}</style>`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot.appendChild(element.content.cloneNode(true));
    this.validation.addValidationListGetter(this.#getMobileInputValidations.bind(this));
    this.addStandardValueCallback(this.#standardMobileValue.bind(this));
  }
  #getMobileInputValidations(){
    const list:ValidationItem<ValidationValue>[] = [];
    //check validation for mobile number itself
    const regex = /^09[0-9]{2} [0-9]{7}$/g;
    const mobileValidation = {
      validator: regex,
      message: "شماره موبایل معتبر نیست",
    };
    list.push(mobileValidation);
    return list;
  }
  /**
   * @description convert persian num to en num and add 0 or 09 code if user didn't type them
   */
  #getUnformattedValue(rawText: string): string {
    //convert persian number to en number and replace space
    const sText = rawText
      .replace(/\s/g, "")
      .replace(/\u06F0/g, "0")
      .replace(/\u06F1/g, "1")
      .replace(/\u06F2/g, "2")
      .replace(/\u06F3/g, "3")
      .replace(/\u06F4/g, "4")
      .replace(/\u06F5/g, "5")
      .replace(/\u06F6/g, "6")
      .replace(/\u06F7/g, "7")
      .replace(/\u06F8/g, "8")
      .replace(/\u06F9/g, "9")
      .replace(/[^0-9]/g, "");
    //opCode = operator code
    const separator = /(?<opCode>(09|0|9)?)(?<number>.{0,})/g.exec(sText);
    if (separator && separator.groups) {
      let numberPart = separator.groups.number;
      numberPart = numberPart.substring(0, 9);
      //manage opCode part
      let opCodePart: string;
      if (separator.groups.opCode) {
        if (separator.groups.opCode === "9") {
          opCodePart = "09";
        } else {
          opCodePart = separator.groups.opCode;
        }
      } else {
        // if user input some number without ir part we add it ourselves
        if (numberPart.length > 0) {
          opCodePart = "09";
        } else {
          //if user input no ir part and no valid number part we return empty string
          return "";
        }
      }
      if (opCodePart.length == 1) {
        return opCodePart;
      }

      return opCodePart + numberPart;
    } else {
      return "";
    }
    return sText;
  }
  /**
   * @description this function will get user inputted or pasted text and convert it to standard one base on developer config
   */
  #standardMobileValue(valueString: string): JBInputValue {
    let formattedValue = "";
    let unformattedValue = "";

    unformattedValue = this.#getUnformattedValue(valueString);
    const matches = /(09[0-9]{0,2})([0-9]{0,7})/g.exec(unformattedValue);
    if (matches && matches.length > 0) {
      formattedValue = matches
        .slice(1)
        .filter((x) => x !== "")
        .join(" ");
    } else {
      formattedValue = unformattedValue;
    }
    return { value:unformattedValue, displayValue:formattedValue };
  }
}
const myElementNotExists = !customElements.get("jb-mobile-input");
if (myElementNotExists) {
  window.customElements.define("jb-mobile-input", JBMobileInputWebComponent);
}

// declare global {
//     interface ElementInternals{
//         setFormValue(value:string):void;
//     }

import { JBInputWebComponent } from "jb-input";

// }
export type JBMobileInputElements = {
    input:JBInputWebComponent
}
export type JBMobileInputValidationResult = {
    isValid: null | boolean,
    message: null | string
}
export type StandardedValueResponse = {
    unformattedValue:string,
    formattedValue:string 
}
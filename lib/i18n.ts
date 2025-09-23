import {JBDictionary} from 'jb-core/i18n';
export type JBMobileInputDictionary = {
  validNumberMessage:string
}

/**
 * dictionary of jb mobile input. it's already loaded with persian and english lang but you can also extend it with you apps other language or replace already exist language 
 * @example 
 * ```js
 * import {dictionary} from 'jb-mobile-input'
 * dictionary.setLanguage("fr", {
 *  validNumberMessage: "message in french",
 * // other dictionary keys
 * });
 * ```
 */
export const dictionary = new JBDictionary({
  "fa":{
    validNumberMessage:"شماره موبایل معتبر نیست"
  },
  "en":{
    validNumberMessage:"mobile number is not valid"
  }
});
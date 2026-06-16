# jb-mobile-input web component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-mobile-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-mobile-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-mobile-input)](https://www.npmjs.com/package/jb-mobile-input)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-mobile-input)

Mobile number input web component built on [`jb-input`](https://github.com/javadbat/jb-input).

- Removes non-numeric characters.
- Accepts Persian digits and converts them to English digits.
- Normalizes Iranian mobile numbers to `09xxxxxxxxx`.
- Formats the visible value as `09xx xxxxxxx`.
- Adds ready-to-use mobile-number validation through [`jb-validation`](https://github.com/javadbat/jb-validation).

## When to use

Use `jb-mobile-input` when the field must collect an Iranian mobile number.

Use [`jb-input`](https://github.com/javadbat/jb-input) for generic single-line text and [`jb-number-input`](https://github.com/javadbat/jb-number-input) for numeric values that are not mobile numbers.

## Demo

- [CodePen](https://codepen.io/javadbat/pen/eYwZQjV)

## Using With JS Frameworks

- [<img src="https://img.shields.io/badge/React.js-jb--mobile--input%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" />](https://github.com/javadbat/jb-mobile-input/tree/main/react)

## Installation

```sh
npm install jb-mobile-input
```

```js
import 'jb-mobile-input';
```

Using CDN:

```html
<script src="https://unpkg.com/jb-mobile-input/dist/jb-mobile-input.umd.js"></script>
```

```html
<jb-mobile-input label="Mobile"></jb-mobile-input>
```

## API reference

`jb-mobile-input` extends `JBInputWebComponent`, so it inherits the [`jb-input`](https://github.com/javadbat/jb-input) label, message, validation, form association, slots, events, methods, and CSS parts.

### Attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `value` | `string` | `""` | Initial mobile value. Prefer the `value` property for controlled updates. |
| `label` | `string` | `""` | Visible label text and accessible aria label inherited from `jb-input`. |
| `message` | `string` | `""` | Helper text shown below the input when no validation error is visible. |
| `name` | `string` | `""` | Form field name inherited from `jb-input`. |
| `placeholder` | `string` | `""` | Placeholder text forwarded to the inner native input. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `required` | `boolean \| string` | `false` | Enables required validation. A string value is used as the required error message. |
| `error` | `string` | `""` | External validation error message inherited from `jb-input`. |
| `disable-auto-validation` | `boolean` | `false` | Stops automatic validation inherited from `jb-input`. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` style defaults | Visual size variant inherited from `jb-input`. |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `value` | `string` | no | Canonical normalized value without spaces, for example `09123456789`. |
| `displayValue` | `string` | yes | Formatted value rendered in the input, for example `0912 3456789`. |
| `validation` | `ValidationHelper<ValidationValue>` | yes | `jb-validation` helper inherited from `jb-input` with an added mobile-number validation. |
| `isDirty` | `boolean` | yes | `true` when current `value` differs from `initialValue`. |
| `validationMessage` | `string` | yes | Current native validation message from `ElementInternals`. |

### Methods

| name | returns | description |
| --- | --- | --- |
| `checkValidity()` | `boolean` | Runs validation without showing the error message. |
| `reportValidity()` | `boolean` | Runs validation and shows the first error message. |
| `focus()` | `void` | Focuses the inner native input. |
| `setSelectionRange(start, end, direction?)` | `void` | Forwards `setSelectionRange` to the inner input. |

### Events

| event | detail | description |
| --- | --- | --- |
| `input` | none | Dispatched on each user input after value standardization. |
| `change` | none | Dispatched when the value is committed. |
| `beforeinput` | none | Cancelable event dispatched before the native input changes. |
| `enter` | none | Dispatched when Enter is pressed. |
| `invalid` | none | Dispatched when validation finds an invalid value. |

## Value format

`jb-mobile-input` keeps two values:

- `value`: normalized mobile number without spaces, such as `09123456789`.
- `displayValue`: formatted text shown to the user, such as `0912 3456789`.

The component accepts input like `9123456789`, `09123456789`, Persian digits, or pasted text with spaces. It removes non-numeric characters and adds the `09` prefix when possible.

```js
const mobileInput = document.querySelector('jb-mobile-input');

mobileInput.value = '9123456789';
console.log(mobileInput.value); // 09123456789
console.log(mobileInput.displayValue); // 0912 3456789
```

## Validation

The component adds mobile-number validation to the inherited `jb-input` validation list. An empty value is valid unless `required` is set.

```html
<jb-mobile-input required="Mobile number is required"></jb-mobile-input>
```

```js
const isValid = document.querySelector('jb-mobile-input').reportValidity();
```

## Slots

Inherited from `jb-input`.

| slot | description |
| --- | --- |
| `start-section` | Content rendered before the native input. |
| `end-section` | Content rendered after the native input. |

## CSS parts and custom style

Inherited CSS parts from `jb-input`:

| part | description |
| --- | --- |
| `label` | The label element. |
| `input-box` | The wrapper around slots and inner input. |
| `input` | The inner native input. |
| `message` | The helper or validation message element. |

`jb-mobile-input` adds one CSS variable:

| CSS variable name | description |
| --- | --- |
| `--jb-mobile-input-input-direction` | Direction of the inner input text. Default is `ltr`. |

All other styling is inherited from [`jb-input`](https://github.com/javadbat/jb-input).

## Related Docs

- See [`jb-mobile-input/react`](https://github.com/javadbat/jb-mobile-input/tree/main/react) if you want to use this component as a React component.
- See [`jb-input`](https://github.com/javadbat/jb-input) for inherited input behavior, events, validation, slots, and styling.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `jb-mobile-input` once before using `<jb-mobile-input>`.
- Use this component for Iranian mobile numbers; use `jb-input` for generic text.
- Read `value` for normalized `09xxxxxxxxx` data and `displayValue` for formatted display text.
- Do not add custom formatting logic for Persian digits, spaces, or missing `09`; the component already standardizes these.
- Use `required`, `error`, and `validation.list` through the inherited `jb-input` validation API.
- Style with inherited `jb-input` CSS variables/parts plus `--jb-mobile-input-input-direction`.
- This package includes [`custom-elements.json`](./custom-elements.json) and points to it with the package.json `customElements` field. The field is documented by the Custom Elements Manifest project in [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages).
- In `custom-elements.json`, `exports.kind: "js"` describes JavaScript/TypeScript exports and `exports.kind: "custom-element-definition"` maps the `jb-mobile-input` tag name to `JBMobileInputWebComponent`.

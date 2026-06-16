# jb-mobile-input-react

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-mobile-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-mobile-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-mobile-input-react)](https://www.npmjs.com/package/jb-mobile-input-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-mobile-input)

React wrapper for `jb-mobile-input`, an Iranian mobile-number input built on `jb-input`.

## Demo

- [CodeSandbox preview](https://3f63dj.csb.app/samples/jb-mobile-input)
- [CodeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBMobileInput.tsx)

## Installation

```sh
npm install jb-mobile-input
```

```jsx
import { JBMobileInput } from 'jb-mobile-input/react';

<JBMobileInput label="Mobile" />;
```

## When to use

Use `JBMobileInput` when a React form needs an Iranian mobile number field with JB Design System input UI, built-in normalization, and mobile-number validation.

Use `JBInput` from `jb-input/react` for generic text.

## Props

`JBMobileInput` uses the base props from `jb-input/react`, including:

| prop | type | description |
| --- | --- | --- |
| `value` | `string` | Controlled normalized mobile value. |
| `label` | `string` | Visible label text. |
| `message` | `string` | Helper text. |
| `name` | `string` | Form field name. |
| `placeholder` | `string` | Placeholder text. |
| `disabled` | `boolean` | Disables the input. |
| `required` | `boolean \| string` | Enables required validation. A string value is used as the required error message. |
| `validationList` | `ValidationItem[]` | Additional custom validation rules. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Visual size variant. |

## Events

Inherited from `jb-input/react`.

| prop | description |
| --- | --- |
| `onInput` | Fired on each user edit after value standardization. |
| `onChange` | Fired when the value is committed. |
| `onBeforeinput` | Fired before the native input changes. |
| `onFocus` | Fired when the input receives focus. |
| `onBlur` | Fired when the input loses focus. |
| `onEnter` | Fired when Enter is pressed. |
| `onKeydown` | Fired on keydown. |
| `onKeyup` | Fired on keyup. |

## Value format

Read `event.target.value` for the normalized value without spaces.

```jsx
const [mobile, setMobile] = useState('');

<JBMobileInput
  value={mobile}
  label="Mobile"
  onInput={(event) => setMobile(event.target.value)}
/>;
```

Examples:

| user input | `value` | display |
| --- | --- | --- |
| `9123456789` | `09123456789` | `0912 3456789` |
| `۰۹۱۲۳۴۵۶۷۸۹` | `09123456789` | `0912 3456789` |

## Validation

The underlying web component adds mobile-number validation to inherited `jb-input` validation.

```jsx
<JBMobileInput required="Mobile number is required" />
```

Use a ref for imperative validation:

```jsx
const mobileRef = useRef(null);

<JBMobileInput ref={mobileRef} required />;

const isValid = mobileRef.current?.reportValidity();
```

## Custom style

The React component uses inherited `jb-input` CSS variables/parts plus:

| CSS variable name | description |
| --- | --- |
| `--jb-mobile-input-input-direction` | Direction of the inner input text. Default is `ltr`. |

```css
.mobile-input {
  --jb-mobile-input-input-direction: ltr;
}
```

```jsx
<JBMobileInput className="mobile-input" />
```

## Shared Documentation

For web-component behavior, value normalization, validation, slots, CSS parts, and the full API, see [`jb-mobile-input`](https://github.com/javadbat/jb-mobile-input).

For inherited input behavior, see [`jb-input`](https://github.com/javadbat/jb-input) and [`jb-input/react`](https://github.com/javadbat/jb-input/tree/main/react).

## Related Docs

- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `JBMobileInput` from `jb-mobile-input/react`; the wrapper imports and registers the underlying `jb-mobile-input` web component.
- Use this component for Iranian mobile numbers; use `JBInput` for generic text.
- Read `event.target.value` for normalized `09xxxxxxxxx` data.
- Do not add custom formatting logic for Persian digits, spaces, or missing `09`; the component already standardizes these.
- Use inherited `jb-input/react` props and events.
- Use `ref.current.checkValidity()` or `ref.current.reportValidity()` for imperative validation.

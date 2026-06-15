# jb-mobile-input web component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-mobile-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-mobile-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-mobile-input)](https://www.npmjs.com/package/jb-mobile-input)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-mobile-input)

superset component on [jb-input](https://github.com/javadbat/jb-input) , just for mobile number input with extra filter and ready to use validator.
- dont accept non-number char
- accept persian number char
- type heading `09` in case of user missing it and always give you the number in the same format.
- have ready to use inside validator with [jb-validation](https://github.com/javadbat/jb-validation)

Demo in codepen: [jb-mobile-input](https://codepen.io/javadbat/pen/eYwZQjV)

## using with JS frameworks

- [<img src="https://img.shields.io/badge/React.js-jb--mobile--input%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" />](https://github.com/javadbat/jb-mobile-input/tree/main/react)

## Installation

```sh
npm install jb-mobile-input
```

## Usage

```js
import 'jb-mobile-input';
```
or by using cdn

```html
<script src="https://unpkg.com/jb-mobile-input/dist/jb-mobile-input.umd.js"></script>
```

```html
<jb-mobile-input></jb-mobile-input>
```

to learn more information about this component and how to customize it like events, validation, styling,... just read [jb-input](https://github.com/javadbat/jb-input).

## styling
all styles come from [jb-input](https://github.com/javadbat/jb-input) except `--jb-mobile-input-input-direction` this may be set if you want your input to be rtl (not recommended).

## Other Related Docs:

- see [`jb-mobile-input/react`](https://github.com/javadbat/jb-mobile-input/tree/main/react) if you want to use this component as a ReactJS component.

- see [All JB Design system Component List](https://javadbat.github.io/design-system/) for more components

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.

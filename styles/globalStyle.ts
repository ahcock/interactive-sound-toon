import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle` 
  :root {
    --primary-mixer: rgb(30,29,32);
    --primary-channel-strip: rgb(38,37,41);
  }
  
  :root {
    --greyOpacity50: rgba(0,23,51,0.02);
    --greyOpacity100: rgba(2,32,71,0.05);
    --greyOpacity200: rgba(0,27,55,0.1);
    --greyOpacity300: rgba(0,29,58,0.18);
    --greyOpacity400: rgba(0,29,54,0.31);
    --greyOpacity500: rgba(3,24,50,0.46);
    --greyOpacity600: rgba(0,19,43,0.58);
    --greyOpacity700: rgba(3,18,40,0.7);
    --greyOpacity800: rgba(0,12,30,0.8);
    --greyOpacity900: rgba(2,9,19,0.91);
    --white: #fff;
    --black: #000;
    --blue50: #e8f3ff;
    --blue200: #90c2ff;
    --blue100: #c9e2ff;
    --blue300: #64a8ff;
    --blue400: #4593fc;
    --blue500: #3182f6;
    --blue600: #2272eb;
    --blue700: #1b64da;
    --blue800: #1957c2;
    --blue900: #194aa6;
    --red50: #ffebee;
    --red100: #ffcdd2;
    --red200: #ef9a9a;
    --red300: #e57373;
    --red400: #ef5350;
    --red500: #f44336;
    --red600: #e53935;
    --red700: #d32f2f;
    --red800: #c62828;
    --red900: #b71c1c;
    --orange50: #fff3e0;
    --orange100: #ffe0b2;
    --orange200: #ffcc80;
    --orange300: #ffb74d;
    --orange400: #ffa726;
    --orange500: #ff9800;
    --orange600: #fb8c00;
    --orange700: #f57c00;
    --orange800: #ef6c00;
    --orange900: #e65100;
    --yellow50: #fff9e7;
    --yellow100: #ffefbf;
    --yellow200: #ffe69b;
    --yellow300: #ffdd78;
    --yellow400: #ffd158;
    --yellow500: #ffc342;
    --yellow600: #ffb331;
    --yellow700: #faa131;
    --yellow800: #ee8f11;
    --yellow900: #dd7d02;
    --purple50: #f3e5f5;
    --purple100: #e1bee7;
    --purple200: #ce93d8;
    --purple300: #ba68c8;
    --purple400: #ab47bc;
    --purple500: #9c27b0;
    --purple600: #8e24aa;
    --purple700: #7b1fa2;
    --purple800: #6a1b9a;
    --purple900: #4a148c;
    --teal50: #e1f0f2;
    --teal100: #b1dade;
    --teal200: #81c7cc;
    --teal300: #4caeb5;
    --teal400: #269da6;
    --teal500: #008c96;
    --teal600: #00818a;
    --teal700: #007278;
    --teal800: #006369;
    --teal900: #004d4d;
    --green50: #e5fff4;
    --green100: #abf2d4;
    --green200: #5ae9ad;
    --green300: #1cd98a;
    --green400: #05c072;
    --green500: #00a661;
    --green600: #009959;
    --green700: #008a50;
    --green800: #007544;
    --green900: #005c36;
    --whiteOpacity50: rgba(209,209,253,0.05);
    --whiteOpacity100: rgba(217,217,255,0.11);
    --whiteOpacity200: rgba(222,222,255,0.19);
    --whiteOpacity300: rgba(224,224,255,0.27);
    --whiteOpacity400: rgba(232,232,253,0.36);
    --whiteOpacity500: rgba(242,242,255,0.47);
    --whiteOpacity600: rgba(248,248,255,0.6);
    --whiteOpacity700: rgba(253,253,255,0.75);
    --whiteOpacity800: rgba(253,253,254,0.89);
    --whiteOpacity900: #fff;
    --inverseGrey50: #202027;
    --inverseGrey100: #2c2c35;
    --inverseGrey200: #3c3c47;
    --inverseGrey300: #4d4d59;
    --inverseGrey400: #62626d;
    --inverseGrey500: #7e7e87;
    --inverseGrey600: #9e9ea4;
    --inverseGrey700: #c3c3c6;
    --inverseGrey800: #e4e4e5;
    --inverseGrey900: #fff;
    --background: #fff;
    --darkBackground: #17171c;
    --greyBackground: #f2f4f6;
    --darkGreyBackground: #101013;
    --layeredBackground: #fff;
    --darkLayeredBackground: #202027;
    --floatBackground: #fff;
    --darkFloatBackground: #2c2c35;
  }
  
  :root {
    --grey50: #f9fafb;
    --grey100: #f2f4f6;
    --grey200: #e5e8eb;
    --grey300: #d1d6db;
    --grey400: #b0b8c1;
    --grey500: #8b95a1;
    --grey600: #6b7684;
    --grey700: #4e5968;
    --grey800: #333d4b;
    --grey900: #191f28;
  }
  
  :root {
    --font-size-h1: 56px;
    --font-size-h2: 48px;
    --font-size-h3: 36px;
    --font-size-h4: 32px;
    --font-size-h5: 24px;
    --font-size-h6: 20px;
    --font-size-h7: 17px;
  }
  
  html {
    -webkit-text-size-adjust: 100%;
  }
  *, *::before, *::after {
    margin: 0;
    padding: 0;
  }
  i {
    font-style: normal;
  }
  li {
    list-style: none;
    font-style: normal;
  }
  main {
    display: block;
  }
  h1 {
    font-size: 2em;
  }
  hr {
    margin: 0;
    height: 0;
    overflow: visible;
  }
  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  a {
    background-color: transparent;
    color: inherit;
    text-decoration: none;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline dotted;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  img {
    border-style: none;
    vertical-align: bottom;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
  }
  button,
  input {
    overflow: visible;
  }
  input, textarea {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    user-select: none;
  }
  input:focus,
  button:focus,
  summary:focus,
  textarea,
  input:active,
  button:active,
  textarea:active {
    outline: none;
  }
  button,
  select {
    text-transform: none;
  }
  [type='button'],
  [type='reset'],
  [type='submit'],
  button {
    -webkit-appearance: button;
  }
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  legend {
    color: inherit;
    display: table;
    max-width: 100%;
    white-space: normal;
  }
  progress {
    vertical-align: baseline;
  }
  textarea {
    overflow: auto;
    resize: none;
  }
  textarea::placeholder {
    font-size: inherit;
  }
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    outline-offset: -2px;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  details {
    display: block;
  }
  summary {
    cursor: pointer;
    display: block;
    list-style-type: none;
    &::-webkit-details-marker {
      display: none;
    }
  }
  [hidden],
  template {
    display: none;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  dt,
  dd {
    font-style: normal;
  }
  /* CSS RESET */
  html {
    font-size: 100%;
    line-height: 1.5;
    min-height: 100%;
    display: flex;
  }
  body {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    flex: 1;
  }
  #__next {
    display: flex;
    flex: 1;
    min-height: 100%;
  }
`;

export { GlobalStyle };

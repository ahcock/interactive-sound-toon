import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle` 
  :root {
    --primary-mixer: rgb(30,29,32);
    --primary-channel-strip: rgb(38,37,41);
    --essential-primary: #9b7ae7;
    --background-base: #1e1d20;
    --essential-subdued: #7f7b87;
    
    
    
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

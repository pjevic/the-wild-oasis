/** @format */

// THE WARNING: hook.js:608 styled-components: it looks like an unknown prop "variation" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)

export function suppressReactWarnings() {
  if (import.meta.env.MODE === "development") {
    const originalWarn = console.warn;
    console.warn = (message, ...args) => {
      if (message.includes("it looks like an unknown prop")) {
        return;
      }
      originalWarn(message, ...args);
    };
  }
}

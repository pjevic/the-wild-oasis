/** @format */

export function suppressReactWarnings() {
  suppressReactUnknownPropsWarnings();
  suppressReactFutureWarnings();
}

// THE WARNING: hook.js:608 styled-components: it looks like an unknown prop "variation" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)
function suppressReactUnknownPropsWarnings() {
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

// THE WARNING: React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition.
function suppressReactFutureWarnings() {
  if (import.meta.env.MODE === "development") {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      // Check for specific warnings related to React Router v7
      if (args[0]?.includes("React Router Future Flag Warning")) {
        return; // Suppress the v7 warning
      }
      originalWarn(...args); // Keep other warnings intact
    };
  }
}

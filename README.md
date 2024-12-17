<!-- @format -->

To test the app, one might use the following credentials:

Email: sipoma1680@owube.com

Password: 123456789

New users can only sign up from within the app, which aligns with its core purpose. If a new user is signed up, the email must be confirmed to log in.

---

# The Wild Oasis

## Technologies Used

This project utilizes the following technologies:

<div align="left">

<a href="https://vitejs.dev/"><img src="./img/Vite.png" alt="Vite" height="60px"></a>
<a href="https://eslint.org/"><img src="./img/ESLint.png" alt="ESLint" height="60px"></a>
<a href="https://react.dev/"><img src="./img/React.png" alt="React" height="60px"></a>
<a href="https://styled-components.com/"><img src="./img/Styled-Component.png" alt="Styled Components" height="60px"></a>
<a href="https://reactrouter.com/"><img src="./img/React-Router.png" alt="React Router" height="60px"></a>
<a href="https://supabase.com/"><img src="./img/Supabase.png" alt="Supabase" height="60px"></a>
<a href="https://tanstack.com/query/v4"><img src="./img/React-Query.png" alt="React Query" height="60px"></a>
<a href="https://tanstack.com/query/v4"><img src="./img/TanStack-Query.png" alt="TanStack Query" height="60px"></a>
<a href="https://react-icons.github.io/react-icons/"><img src="./img/React-Icons.png" alt="React Icons" height="60px"></a>
<a href="https://www.midjourney.com/"><img src="./img/Midjourney.png" alt="Midjourney" height="60px"></a>
<a href="https://react-hook-form.com/"><img src="./img/React-Hook-Form.png" alt="React Hook Form" height="60px"></a>

</div>

---

### Why Supabase?

- **Supabase** is an open-source alternative to Firebase, providing a robust backend as a service (BaaS). It simplifies backend development and offers features such as:

  - **Instant APIs**: Automatically generates RESTful APIs based on your database schema.
  - **Authentication**: Includes user authentication with multiple providers (e.g., email, Google, GitHub).
  - **Real-time updates**: Enables real-time synchronization between the client and the database.
  - **Scalable database**: Built on PostgreSQL, ensuring performance and scalability.
  - **File storage**: Provides secure file storage integrated with your backend.
  - **Ease of use**: Offers a straightforward setup and intuitive dashboard.

- Supabase is ideal for projects requiring a powerful and flexible backend with minimal configuration, making it a perfect fit for modern web applications.

---

### Why React Query?

- **React Query** is a powerful library for managing remote (server) state, offering many features that simplify development and enhance user experience (UX):
  - **Data caching**: Automatically stores fetched data in a cache for quick access.
  - **Built-in loading and error states**: Reduces boilerplate code by managing these states for you.
  - **Automatic re-fetching**: Keeps your data synchronized with the server.
  - **Pre-fetching**: Optimizes pagination and anticipates data needs.
  - **Simplified remote state mutations**: Makes updating server data easy and intuitive.
  - **Offline support**: Enables functionality when the user is offline.
- React Query is essential because **remote state** (data fetched from a server) is fundamentally different from **UI state** (local component data). Managing these two types of state separately and efficiently improves app performance and maintainability.

---

## Modal Window Using a React Portal

The **React Portal** allows rendering a component outside of its parent DOM hierarchy while keeping it part of the React component tree. This is especially useful for components like modals, tooltips, or dropdowns that need to visually escape their parent DOM structure.

Here’s an example of a `Modal` component implemented using React Portals:

```jsx
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi";

function Modal({ children, onClose }) {
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body // The modal is rendered directly into the <body>
  );
}
```

---

### Key Points to Remember

- **Prevents Overflow Issues**:  
  By rendering the modal into `document.body`, it avoids being affected by parent containers with CSS properties like `overflow: hidden` or `z-index`.

- **Improved Accessibility**:  
  Using portals ensures that modals are accessible and don’t interfere with the rest of the page’s structure.

- **Reusable Design**:  
  The `Modal` component can be reused across the app, ensuring a consistent and flexible design system.

---

# Modal Component - A Compound Component

The `Modal` component is designed as a **compound component** to provide a flexible and declarative API. This approach encapsulates the functionality of opening and closing modal windows, enabling a clear separation of concerns while maintaining ease of use.

---

## Key Features

### Compound Component Design

The `Modal` component consists of the following sub-components:

- **`<Modal.Open>`**: Manages the logic for opening specific modal windows.
- **`<Modal.Window>`**: Represents the modal window, rendering its content when opened.

### Context API

- Leverages React's `createContext` and `useContext` to share state (`openName`) and functions (`open` and `close`) among the sub-components.
- This ensures seamless communication and state management between the `Modal` components.

### Portals

- Modal content is rendered using `createPortal`, allowing it to appear outside the main DOM tree.
- This enhances accessibility, styling flexibility, and ensures the modal is not affected by parent DOM elements.

---

## Using `cloneElement`

The `cloneElement` function in React enables extending or modifying existing React elements by injecting props or altering their children dynamically.

```jsx
const clonedElement = cloneElement(element, props, ...children);
```

### How It Works

In the `Modal` component, `cloneElement` is used to:

- **Clone child components** (e.g., a button) inside `<Modal.Open>`.
- Inject an `onClick` prop dynamically to trigger the `open` function, updating the state to display the modal window corresponding to the specified `name`.

#### Example

```jsx
<Modal.Open opens="cabin-form">
  <Button>Add new cabin</Button>
</Modal.Open>
```

Here, the `Button` is cloned, and an `onClick` handler is added to it. When clicked, it invokes `open('cabin-form')`, which updates the state and opens the corresponding modal window.

---

## Implementation Overview

Here’s a breakdown of the `Modal` component:

### 1. Modal Context

The context holds the current state (`openName`) and exposes the `open` and `close` functions:

```jsx
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = (openName) => setOpenName(openName);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}
```

### 2. Open Sub-Component

Clones its child and attaches an onClick handler:

```jsx
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}
```

### 3. Window Sub-Component

Uses the context to determine whether to render the modal window. When active, it renders the modal with a close button and its children:

```jsx
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
```

---

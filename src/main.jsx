import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "modern-normalize";
import App from "./components/App.jsx";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
//import { persistor, store } from "./redux/store"; // 2. Імпортуємо створений стор; persistor
//import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      {/* </PersistGate> */}
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);

import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
    <ToastContainer position="top-right" autoClose={2000} />
  </>
);

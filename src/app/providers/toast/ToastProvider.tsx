import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { ToastContext, createToastContext } from "./context";

export default function AppToastProvider({ children }: PropsWithChildren) {
  const value = createToastContext();

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer {...value[0]} />
    </ToastContext.Provider>
  );
}

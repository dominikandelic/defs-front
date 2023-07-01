import { ReactNode } from "react";
import Navigation from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <ToastContainer />
      <main>{children}</main>
    </>
  );
}

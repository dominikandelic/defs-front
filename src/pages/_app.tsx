import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { StompSessionProvider } from "react-stomp-hooks";
import { ToastContainer } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  library.add(fas);

  return (
    <StompSessionProvider url={"http://localhost:8081/ws"}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </StompSessionProvider>
  );
}

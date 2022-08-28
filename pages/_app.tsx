import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Toaster />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;

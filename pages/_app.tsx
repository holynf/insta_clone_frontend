import type { AppProps } from "next/app";
import Header from "@/layout/header";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";

//styles
import "@/styles/main.scss";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <Header />
                <div className={"main"}>
                    <Component {...pageProps} />
                </div>
            </Provider>
            <ToastContainer position='bottom-right' autoClose={5000} />
        </>
    );
}

App.getInitialProps = async () => {
    return {
        pageProps: {},
    };
};

export default App;

import 'bootstrap/dist/css/bootstrap.css'; //add bootstrap to use bootstrap styles
import '../styles/globals.css'

import { useEffect } from "react";
import Layout from '../comps/Layout'; //add layout comp to show navbar in all pages
// import { ApolloProvider } from "@apollo/client"; //add Apollo provider to parsing all apollo function to all components
// import client from "../apollo-client";
import { AppProvider } from '../comps/context/AppContext';

function MyApp({ Component, pageProps }) {
  
  // to handle event (window and document) on bootstrap only render in client side 
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default MyApp

import 'bootstrap/dist/css/bootstrap.css'; //add bootstrap to use bootstrap styles
import '../styles/globals.css'

import { useEffect } from "react";
import Layout from '../comps/Layout'; //add layout comp to show navbar in all pages

function MyApp({ Component, pageProps }) {
  
  // to handle event (window and document) on bootstrap only render in client side 
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

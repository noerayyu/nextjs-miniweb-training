import { useEffect } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from '../comps/Layout'; //add layout comp to show navbar in all pages
import { AppProvider } from '../comps/context/AppContext';
import theme from '../src/theme';


function MyApp({ Component, pageProps }) {
  
  // to handle event (window and document) on bootstrap only render in client side 
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ThemeProvider>
    </AppProvider>
  )
}

export default MyApp

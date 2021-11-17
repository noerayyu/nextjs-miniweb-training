import { createTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#557571',
    },
    secondary: {
      main: '#D49A89',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F4F4F4',
    },
  },
});

export default theme;
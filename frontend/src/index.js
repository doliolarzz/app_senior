import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';

const theme = createMuiTheme({
  palette: {
      primary: {
          light: '#ffc947',
          main: '#ff9800',
          dark: '#c66900',
          contrastText: '#fff',
      },
      secondary: {
          light: '#6d6d6d',
          main: '#424242',
          dark: '#1b1b1b',
          contrastText: '#fff',
      },
  },
  typography: {
      fontFamily: '"Kanit", sans-serif',
      fontWeightLight: 200,
      fontWeightRegular: 300,
      fontWeightMedium: 400,
      useNextVariants: true,
      textPrimary: '#000000',
      textSecondary: '#FFFFFF',
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
          {/* <Provider store={store}> */}
              <App />
          {/* </Provider> */}
      </MuiPickersUtilsProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

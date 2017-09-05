import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';


  if (process.env === "production") { 

  ReactDOM.render(<App />, document.querySelector('#container'));
  
  } else {

  const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
      document.querySelector('#container')
    );
  }

  render(App);

  if (module.hot) {
    module.hot.accept('./components/App', () => { render(App) });
  }
}

// libs
import React from 'react';
import ReactDOM from 'react-dom/client';
// components
import App from './App';
import Alert from './components/UI/Alert/Alert';
// redux
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Alert/>
            <App />
        </Provider>
    </BrowserRouter>
);


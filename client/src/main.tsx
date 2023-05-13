// libs
import ReactDOM from 'react-dom/client';
// components
import App from './App';
import Alert from './components/UI/Alert/Alert.jsx';
// redux
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <Alert />
            <App />
        </Provider>
    </BrowserRouter>
);

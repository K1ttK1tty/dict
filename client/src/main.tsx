// libs
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// components
import App from './App';
import Alert from './components/UI/Alert/Alert';
// redux
import { setupStore } from './store/store';
const store = setupStore();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <Alert />
            <App />
        </Provider>
    </BrowserRouter>
);

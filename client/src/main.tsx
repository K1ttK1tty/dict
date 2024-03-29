import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Alert from './components/UI/Alert/Alert';

import { setupStore } from './store/store';

const store = setupStore();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <Alert />
            <App />
        </Provider>
    </BrowserRouter>,
);

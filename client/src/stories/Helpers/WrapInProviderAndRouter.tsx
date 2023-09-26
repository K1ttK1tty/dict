import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { setupStore } from '../../store/store';

type IWrapWithReduxAndRoute<T> = (component: React.ReactNode, initialValue?: T) => JSX.Element;

export const WrapInProviderAndRouter: IWrapWithReduxAndRoute<any> = (component, initialValue = {}) => {
    const store = setupStore(initialValue);
    return (
        <Provider store={store}>
            <MemoryRouter>{component}</MemoryRouter>
        </Provider>
    );
};

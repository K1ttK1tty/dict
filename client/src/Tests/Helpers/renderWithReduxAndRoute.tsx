import { Queries, RenderResult, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { setupStore } from '../../store/store';

type IRenderWithReduxAndRoute<T> = (component: React.ReactNode, initialValue?: T) => void;

export const renderWithReduxAndRoute: IRenderWithReduxAndRoute<any> = (component, initialValue) => {
    const store = setupStore(initialValue);
    return render(
        <Provider store={store}>
            <MemoryRouter>{component}</MemoryRouter>
        </Provider>
    );
};

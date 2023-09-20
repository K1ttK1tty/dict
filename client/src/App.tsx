import { FC, Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import AppRouter from './components/AppRouter';
import Authorization from './components/UI/Authorization/Authorization';
import ChangePassword from './components/UI/Authorization/ResetPassword/ChangePassword';
import SetNewPassword from './components/UI/Authorization/SetNewPassword/SetNewPassword';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';

import { setTheme } from './functions/setTheme';
import { useAppDispatch, useAppSelector } from './hooks/redux';

import './styles/App.css';

import { CheckAuth, GetAvatar, GetUserData } from './store/reducers/authorization/Authorization/ActionCreator';

let onlyInFirstRender = true;
const MenuDesk = lazy(() => import('./components/UI/MenuDesk/MenuDesk'));
const MenuVoc = lazy(() => import('./components/UI/MenuVoc/MenuVoc'));
const App: FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(state => state.AuthSlice);
    const email = useAppSelector(state => state.AuthSlice?.user?.email);

    if (onlyInFirstRender) {
        onlyInFirstRender = false;
        if (localStorage.getItem('token')) dispatch(CheckAuth());
        setTheme();
    }

    useEffect(() => {
        if (isAuth) {
            dispatch(GetUserData(email));
            dispatch(GetAvatar(email));
        }
    }, [isAuth, email, dispatch]);
    if (isAuth) {
        return (
            <>
                <Suspense>
                    <MenuVoc setMenuOpen={setMenuOpen} />
                </Suspense>
                <Suspense>
                    <MenuDesk menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                </Suspense>
                <AppRouter />
                <ScrollToTop />
            </>
        );
    }
    return (
        <Routes>
            <Route path="/forgotPassword" element={<ChangePassword />} />
            <Route path="/setNewPassword" element={<SetNewPassword />} />
            <Route path="*" element={<Authorization />} />
        </Routes>
    );
};
export default App;

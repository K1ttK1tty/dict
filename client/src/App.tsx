// libs
import { FC, useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// components
import AppRouter from './components/AppRouter';
import Authorization from './components/UI/Authorization/Authorization';
import ChangePassword from './components/UI/Authorization/ResetPassword/ChangePassword';
import SetNewPassword from './components/UI/Authorization/SetNewPassword/SetNewPassword';
// functions
import { setTheme } from './functions/setTheme';
// styles
import './styles/App.css';
// redux
import { useAppSelector, useAppDispatch } from './hooks/redux';
// authorization
import { CheckAuth, GetData, GetAvatar } from './store/reducers/authorization/Authorization/ActionCreator';
const App: FC = () => {
    const MenuDesk = useMemo(() => lazy(() => import('./components/UI/MenuDesk/MenuDesk')), []);
    const MenuVoc = useMemo(() => lazy(() => import('./components/UI/MenuVoc/MenuVoc')), []);
    // const AppRouter = lazy(() => import('./components/AppRouter'));
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(state => state.AuthSlice);
    const email = useAppSelector(state => state.AuthSlice?.user?.email);

    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(CheckAuth());
        setTheme();
    }, [dispatch]);
    useEffect(() => {
        if (isAuth) {
            dispatch(GetData(email));
            dispatch(GetAvatar(email));
        }
    }, [isAuth, email, dispatch]);

    if (isAuth) {
        return (
            <>

                <Suspense>
                    <MenuDesk menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                </Suspense>
                <Suspense>
                    <MenuVoc menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                </Suspense>
                    <AppRouter />
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
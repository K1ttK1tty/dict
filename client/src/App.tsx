// libs
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// components
import MenuDesk from './components/UI/MenuDesk/MenuDesk';
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
const App = () => {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(state => state.AuthSlice);
    const email = useAppSelector(state => state.AuthSlice?.user?.email);

    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(CheckAuth());
        setTheme();
    }, []);
    useEffect(() => {
        if (isAuth) {
            dispatch(GetData(email));
            dispatch(GetAvatar(email));
        }
    }, [isAuth]);
    
    if (!isAuth) {
        return (
            <Routes>
                <Route path="/forgotPassword" element={<ChangePassword />} />
                <Route path="/setNewPassword" element={<SetNewPassword />} />
                <Route path="*" element={<Authorization />} />
            </Routes>
        );
    }
    return (
        <>
            <MenuDesk />
            <AppRouter />
        </>
    );
};
export default App;
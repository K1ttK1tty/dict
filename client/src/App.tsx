// libs
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// components
import MenuDesk from './components/UI/MenuDesk/MenuDesk.jsx';
import AppRouter from './components/AppRouter.jsx';
import Authorization from './components/UI/Authorization/Authorization.jsx';
import ChangePassword from './components/UI/Authorization/ResetPassword/ChangePassword.jsx';
import SetNewPassword from './components/UI/Authorization/SetNewPassword/SetNewPassword.jsx';
// functions
import { setTheme } from './functions/setTheme.js';
// styles
import './styles/App.css';
// redux
import { useSelector, useDispatch } from 'react-redux';
// authorization
import { CheckAuth, GetData, GetAvatar } from './store/reducers/authorization/Authorization/ActionCreator.js';
const App = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state: any) => state.AuthSlice);
    const email = useSelector((state: any) => state.AuthSlice?.user?.email);

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
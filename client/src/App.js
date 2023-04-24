// libs
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// components
import MenuDesk from './components/UI/MenuDesk/MenuDesk.jsx'
import AppRouter from './components/AppRouter';
import Authorization from './components/UI/Authorization/Authorization';
import ChangePassword from './components/UI/Authorization/ResetPassword/ChangePassword';
import SetNewPassword from './components/UI/Authorization/SetNewPassword/SetNewPassword.jsx';
// functions
import { setTheme } from './functions/setTheme';
// styles
import './styles/App.css';
// redux
import { useSelector, useDispatch } from 'react-redux';
// authorization
import { CheckAuth, GetData, GetAvatar } from './store/reducers/authorization/Authorization/ActionCreator.js'
function App() {
    const dispatch = useDispatch()
    const pageTheme = useSelector(state => state.ColorPicker.pageTheme)
    const isAuth = useSelector(state => state.AuthSlice.isAuth)
    const email = useSelector(state => state.AuthSlice.user.email)

    setTheme(pageTheme)

    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(CheckAuth())
    }, []);

    useEffect(() => {
        if (isAuth) {
            dispatch(GetData(email))
            dispatch(GetAvatar(email))
        }
    }, [isAuth]);

    if (!isAuth) {

        return (
            <Routes>
                <Route path='/forgotPassword' element={<ChangePassword />} />
                <Route path='/setNewPassword' element={<SetNewPassword />} />
                <Route path='*' element={<Authorization />} />
            </Routes>
        )
    }

    return (
        <>
            <MenuDesk />
            <AppRouter />
        </>
    );
}
export default App;
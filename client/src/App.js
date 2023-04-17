import { useEffect } from 'react';
import './styles/App.css';
import MenuDesk from './components/UI/MenuDesk/MenuDesk.jsx'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { setTheme } from './functions/setTheme';
import { useSelector, useDispatch } from 'react-redux';
// authorization
import Authorization from './components/UI/Authorization/Authorization';
import { CheckAuth, GetData } from '../src/store/reducers/asyncActions/ActionCreator'
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
        }
    }, [isAuth]);

    if (!isAuth) {
        return <Authorization />
    }

    return (
        <BrowserRouter>
            <MenuDesk />
            <AppRouter />
        </BrowserRouter>
    );
}
export default App;
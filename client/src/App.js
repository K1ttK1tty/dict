import { useEffect } from 'react';
import './styles/App.css';
import MenuDesk from './components/UI/MenuDesk/MenuDesk.jsx'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { setTheme } from './functions/setTheme';
import { useSelector, useDispatch } from 'react-redux';
import { setPageTheme } from './store/reducers/ColorPicker';

import Authorization from './components/UI/Authorization/Authorization';
import { setCards } from "../src/store/reducers/Cards"
import { CheckAuth, GetData } from '../src/store/reducers/asyncActions/ActionCreator'
function App() {
    const dispatch = useDispatch()
    const pageTheme = useSelector(state => state.ColorPicker.pageTheme)
    const isAuth = useSelector(state => state.AuthSlice.isAuth)
    const fetchingCards = useSelector(state => state.AuthSlice.cards)
    const email = useSelector(state => state.AuthSlice.user.email)
    const activation = useSelector(state => state.AuthSlice.user)

    setTheme(pageTheme)
    function changeTheme(elem) {
        elem.target.checked ? dispatch(setPageTheme('dark')) : dispatch(setPageTheme('light'))
    }

    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(CheckAuth())
    }, []);

    useEffect(() => {
        if (isAuth) {
            dispatch(GetData(email))
        }
    }, [isAuth]);

    useEffect(() => {
        if (fetchingCards?.length) {
            dispatch(setCards(fetchingCards))
        }

    }, [fetchingCards]);

    if (!isAuth) {
        return <Authorization />
    }




    return (
        <BrowserRouter>
            <MenuDesk changeTheme={changeTheme} />
            <AppRouter />
        </BrowserRouter>
    );
}
export default App;
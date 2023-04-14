import './styles/App.css';
import MenuDesk from './components/UI/MenuDesk/MenuDesk.jsx'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { setTheme } from './functions/setTheme';
import { useSelector,useDispatch } from 'react-redux';
import { setPageTheme } from './store/ColorPicker';
function App() {
    const dispatch = useDispatch()
    const pageTheme = useSelector(state=> state.ColorPicker.pageTheme)

    setTheme(pageTheme)
    function changeTheme(elem) {
        elem.target.checked ? dispatch(setPageTheme('dark')) : dispatch(setPageTheme('light'))
    }


    return (
        <BrowserRouter>
            <MenuDesk changeTheme={changeTheme} />
            <AppRouter />
        </BrowserRouter>
    );
}
export default App;
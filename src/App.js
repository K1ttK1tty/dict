import './styles/App.css';
import MenuDesk from './components/UI/MenuDesk/MenuDesk.jsx'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useState } from 'react';
import { setTheme } from './functions/setTheme';
function App() {

    const [pageTheme, setPageTheme] = useState('light')
    setTheme(pageTheme)
    function changeTheme(elem) {
        elem.target.checked ? setPageTheme('dark') : setPageTheme('light')
    }
    return (
        <BrowserRouter>
            <MenuDesk changeTheme={changeTheme} />
            <AppRouter />
        </BrowserRouter>
    );
}
export default App;
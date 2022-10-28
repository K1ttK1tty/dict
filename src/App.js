import './styles/App.css';
import MenuDesk from './components/UI/MenuDesk/MenuDesk.jsx'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useTheme } from './hooks/useTheme'
import { useState } from 'react';

function App() {
    
    const [pageTheme, setPageTheme] = useState('light')
    useTheme(pageTheme);
    function changeTheme(elem) {
        if (elem.target.checked) {
            setPageTheme('dark')
        } else setPageTheme('light')
    }
    return (
            <BrowserRouter>
                <MenuDesk changeTheme={changeTheme} />


                <AppRouter />


            </BrowserRouter>
    );
}
export default App;

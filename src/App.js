import './styles/App.css';
import MenuDesk from './components/UI/MenuDesk/MenuDesk.jsx'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';


function App() {
    return (
            <BrowserRouter>
                <MenuDesk />


                <AppRouter />


            </BrowserRouter>
    );
}
export default App;

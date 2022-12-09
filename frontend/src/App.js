import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from "./components/header"
import "./assets/style/header.css"
import Home from './pages/home';

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
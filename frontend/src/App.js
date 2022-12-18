import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/header"
import "./assets/style/header.css"
import Home from './pages/home';
import SignIn from './pages/signIn'
import PostDetail from './pages/postDetail';
import NewPost from './pages/newPost';

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/posts/detail" element={<PostDetail />} />
                <Route path="/new-post" element={<NewPost />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
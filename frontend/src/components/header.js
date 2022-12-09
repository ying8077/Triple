import { useState } from "react";
import { useNavigate } from "react-router";

const Header = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    function keywordChange(e) {
        setKeyword(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && keyword !== "") {
            window.location.replace(`/?keyword=${keyword}`);
        }
    }

    function navigateMember() {
        if (localStorage.getItem('user') !== null) {
            navigate('/profile');
        } else {
            navigate('/signIn');
        }
    }

    return <header>
        <a href="/" className="logo img"> </a>
        <div className="search">
            <input type="search" onChange={keywordChange} onKeyDown={(e) => handleKeyDown(e)} placeholder="搜尋貼文..."/>
            <div className="search-btn"><button className="icon-search img"></button></div>
        </div>
        <div className="header-link">
            <button className="header-link-edit img"></button>
            <button className="header-link-location img" onClick={navigateMember}></button>
            <button className="header-link-profile img"></button>
        </div>
    </header>
}

export default Header
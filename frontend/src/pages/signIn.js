import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "../assets/style/signIn.css";
import { apiUser } from "../util/api"

const SignIn = () => {
    const element = useRef();
    const navigate = useNavigate();
    const [data, setData] = useState({
        user_name: "",
        email: "",
        password: ""
    });

    function onChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    function turnTosignIn() {
        element.current.classList.add("right-panel-active");
    }
    function turnTosignUp() {
        element.current.classList.remove("right-panel-active");
    }

    function signInSubmit(e) {
        e.preventDefault();

        const userData = JSON.stringify({
            "email": data.email,
            "password": data.password
        })

        apiUser.post("/signIn", userData)
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    toast.success("登入成功", { position: "top-center" });
                    localStorage.setItem('user', JSON.stringify({
                        token: data.token,
                        user_id: data.user_id
                    }));
                    navigate('/');
                } else {
                    toast.warning(data.message, { position: "top-center" });
                }
            })
    }

    function signUpSubmit(e) {
        e.preventDefault();

        const userData = JSON.stringify({
            "user_name": data.user_name,
            "email": data.email,
            "password": data.password
        })

        apiUser.post("/signUp", userData)
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    toast.success("註冊成功", { position: "top-center" });
                } else {
                    toast.warning(data.message, { position: "top-center" });
                }
            })
    }

    return (
        <div className="signIn">
            <div className="container" id="container" ref={element}>
                <div className="form-container sign-up-container">
                    <form>
                        <h1>註冊</h1>
                        <input type="text" placeholder="姓名" name="user_name" onChange={onChange} />
                        <input type="email" placeholder="信箱" name="email" onChange={onChange} />
                        <input type="password" placeholder="密碼" name="password" onChange={onChange} />
                        <button onClick={signUpSubmit}>註冊</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>登入</h1>
                        <input type="email" placeholder="信箱" name="email" onChange={onChange} />
                        <input type="password" placeholder="密碼" name="password" onChange={onChange} />
                        <button onClick={signInSubmit}>登入</button>
                        <div className="signIn-splitter">
                            <label>第三方登入</label>
                        </div>
                        <div className="social-container">
                            <a href="/" className="social"> </a>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <p>已經有帳號?</p>
                            <button className="ghost" id="signIn" onClick={turnTosignUp}>點我登入</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <p>尚未註冊帳號?</p>
                            <button className="ghost" id="signUp" onClick={turnTosignIn}>點我註冊</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn

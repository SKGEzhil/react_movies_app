// import {useState} from "react";

import {useContext, useState} from "react";
import UserContext from "../user_context.tsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function LoginPage() {

    const [username_, setUsername_] = useState('');
    const [password_, setPassword_] = useState('');

    const navigate = useNavigate();

    const {setUsername} = useContext(UserContext);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setUsername_(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setPassword_(event.target.value);
    }


    return (
        <div>
            <div className="login-page-container">
                <div className="login-page-title">
                    <p>Register</p>
                </div>
                <div className="login-page-form">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={handleUsernameChange}></input>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}></input>
                    <button onClick={() => {
                        console.log('login');
                        fetch('http://localhost:8080/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username: username_,
                                password: password_
                            })
                        })
                            .then(r => r.json())
                            .then(r => {
                                if (r.status === "ok") {
                                    setUsername(username_);
                                } else {
                                    alert(r.error)
                                }
                            })
                            .catch(err => console.error(err));
                    }}>
                        Register
                    </button>
                </div>
            </div>
            <div className="login-page-container">
                <div className="login-page-title">
                    <p>Login</p>
                </div>
                <div className="login-page-form">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={handleUsernameChange}></input>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}></input>
                    <button onClick={() => {
                        console.log('login');
                        fetch('http://localhost:8080/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username: username_,
                                password: password_
                            })
                        })
                            .then(r => r.json())
                            .then(r => {
                                if (r.status === "ok") {
                                    setUsername(username_);
                                    navigate('/react_movies_app/');
                                    Cookies.set('token', r.data.token);
                                } else {
                                    alert(r.error)
                                }
                            })
                            .catch(err => console.error(err));
                    }}>
                        Login
                    </button>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;